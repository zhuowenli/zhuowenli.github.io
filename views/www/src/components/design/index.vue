<template>
    <div class="design">
        <div class="scroll">
            <div class="mCustomScrollbar" data-mcs-theme="dark">
                <section>
                    <div class="scrollinside">

                        <div class="insidetitle table">
                            <div class="cell number">
                                <div>03</div>
                            </div>
                            <div class="cell">
                                <h1 class="pagetitle">DESIGN</h1>
                                <h2>Web Design.</h2>
                            </div>
                        </div>

                        <span class="s60"></span>

                        <div class="entry">
                            <div class="header">
                                <h2>SERVER ENGINEER</h2>
                            </div>

                            <div class="scroll">
                                <div class="mCustomScrollbar" data-mcs-theme="dark">
                                    <div class="table entrydetail">
                                        <div class="row">
                                            <div class="cell">募集背景</div>
                                            <div class="cell"><p class="p1">新規プロジェクトの立ち上げ、既存サービスの国内拡大や海外展開に伴う事業拡大のため、コアとなるメンバーを募集します。</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="cell">業務内容</div>
                                            <div class="cell">
                                                <p class="p1">新規及び国内外の既存サービスのサーバーインフラ開発と運用をお任せします。</p>
                                                <p class="p1">サーバーサイド設計・開発・運用担当として、まずは国外、海外含め既存プロジェクトに関わって頂きます。</p>
                                                <p class="p1">国内180万人以上、同カテゴリ内ではトップクラスの売上を誇るサービスとなります。</p>
                                                <p class="p1">その後、スキルやご希望に合わせてプロジェクト内容や規模を相談しながら決めていきます。</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="cell">応募資格</div>
                                            <div class="cell"><p class="p1">【必須要件】</p>
                                                <p class="p1">■PHPなどを用いたWebアプリケーションの設計・開発経験</p>
                                                <p class="p1">■Linux/RDBMSの基礎知識</p>
                                                <p class="p1">■データベースの構築・運用経験</p>
                                                <p class="p1">■サーバー構築経験</p>
                                                <p class="p1">&nbsp;</p>
                                                <p class="p1">【歓迎要件】</p>
                                                <p class="p1">■ソーシャルゲーム等のサーバー構築/運用経験</p>
                                                <p class="p1">■大規模ユーザーサービスのサーバー構築/運用経験</p>
                                                <p class="p1">■海外サーバー構築、運用経験</p>
                                                <p class="p1">■その他言語の知識・経験</p>
                                                <p class="p1">■ネットワーク構築・運用経験</p>
                                                <p class="p1">■WEBサイトのコーディング</p>
                                                <p class="p1">（今後サーバサイドだけでなく、フロントサイドもいずれやりたいという方も歓迎します）</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="cell">雇用区分</div>
                                            <div class="cell"><p>正社員</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="cell">想定年収</div>
                                            <div class="cell"><p class="p1">300万円～800万円</p>
                                            <p class="p1">※ご経験・スキルを考慮して決定いたします。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="footer">
                                <a class="entrybtn">ENTRY</a>
                            </div>

                            <div class="bg table">
                                <div class="bgL cell"></div>
                                <div class="bgM cell"></div>
                                <div class="bgR cell"></div>
                            </div>

                        </div>
                        <span class="s90"></span>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    const $html = $('html');

    export default {
        components: {
        },
        data () {
            return {
            }
        },
        ready() {
            $(".scroll").mCustomScrollbar({
                axis:"y",
                scrollInertia:100,
                callbacks:{
                    whileScrolling:function(){
                    }
                }
            });
        },
        route: {
            activate: function (transition) {
                $html.addClass('fetch');

                setTimeout(function() {
                    $html.removeClass('fetch');
                }, 1000);

                transition.next()
            }
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>
