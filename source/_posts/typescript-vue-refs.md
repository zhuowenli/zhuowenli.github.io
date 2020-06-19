---
title: [TypeScript] 如何优雅的调用通过 $refs 获取的子组件实例的方法？
categories: frontend
tags: [typescript, vue]
date: 2020-05-18
---

最近在使用 Vue 结合 TypeScript 的过程中，遇到了个问题，以至于困扰了我一段时间：通过 `this.$refs.child` 获取到 Vue 的子组件的实例后，访问子组件的实例方法会提示该方法不存在。

```ts
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component
export default class ParentComponent extends Vue {
    @Ref() readonly dialog!: DialogComponent;

    public show() {
        this.dialog.show(); // <- Error: TS2339: Property 'show' does not exist on type 'Vue'.
    }
}
```

<!-- more -->

好吧，大家很容易发现这个问题是 `shims-vue.d.ts` 这个声明文件的锅，他会使所有 `*.vue` 文件导出为 `Vue` 类型。

该文件的内容为：

```ts
declare module '*.vue' {
    import Vue from 'vue';

    export default Vue;
}
```

所以，我想了几个办法可以来绕过这个问题：

1. 使用 `// @ts-ignore`，在 VSCode 中，可以保留正常的定义跳转功能

    ```ts
    @Component
    export default class ParentComponent extends Vue {
        @Ref() readonly dialog!: DialogComponent;

        public show() {
            // @ts-ignore
            this.dialog.show(); // no error
        }
    }
    ```

2. 将其设置为 `any` 类型，不过会破坏定义跳转

    ```ts
    @Component
    export default class ParentComponent extends Vue {
        @Ref() readonly dialog!: any;

        public show() {
            this.dialog.show(); // no error
        }
    }
    ```

3. 为组件类创建一个接口类型，并将 `Ref` 设置为该接口类型，这样也可以保留正常的定义跳转功能

    ```ts
    // components/types/index.ts
    export interface DialogComponentInterface {
        show: () => number;
    }
    ```

    ```ts
    // Child component
    @Component
    export default class DialogComponent extends Vue implements DialogComponentInterface {
        public show() {
            return 1;
        }
    }
    ```

    ```ts
    import DialogComponent from '@/components/comment-form.vue';
    import { DialogComponentInterface } from '@/components/types';

    @Component({
        components: { DialogComponent },
    })
    export default class ParentComponent extends Vue {
        @Ref() readonly dialog!: DialogComponent & DialogComponentInterface; // 可以保留跳转定义功能

        public show() {
            this.dialog.show(); // no error
        }
    }
    ```

4. 合并类型。与方案 3 相比，它的代码更少，但是它还是会破坏定义跳转

    ```ts
    @Component
    export default class ParentComponent extends Vue {
        @Ref() readonly dialog!: DialogComponent & { show: () => number };

        public show() {
            this.dialog.show(); // no error
        }
    }
    ```

最终我选择了方案 3 并用来解决该问题。因为这是由于 `shims-vue.d.ts` 的声明引起的问题，目前也没有想到其他比较好的解决方法。过段时间准备把项目升级到 Vue3.0，看看能不能从根本上解决这个问题。
