import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { ApeSwapTheme } from '@apeswapfinance/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ApeSwapTheme {}
}

const GlobalStyle = createGlobalStyle`

.desktop_header .header_first {
    padding-right: 20px;
}
.css-1w19642 {
    margin-left: 0!important;
}
@media only screen and (max-width:1650px){
    .css-1w19642 .sc-inbFrc .sc-bqiRlB.gOJhhd.sc-lnDJoL.iKZeUd {
    padding-left: 16px;
}
}
@media only screen and (max-width:1080px){
    .desktop_header{
        display: none !important;
    }
    .mobile_header {
    display: flex!important;
}
    .mobile_header .testttt{
    display: block!important;
    }
    .css-1thibvh button.css-125zlt8{
        display: none!important;
    }
    
.mobile_header {
    position: sticky! important;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
}
.mobile_header .moble_div2 {
    position: absolute;
    top: 60px;
    z-index: 3;
    width: 100%;
    left: 0;
    display: block;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
}

.mobile_header .css-1c5ggo3-MenuSubItemMobile {
    visibility: inherit;
}
.mobile_header .moble_div2 a span {
    padding-left: 0;
}
.mobile_header .moble_div2 .css-vysuop .css-6ly5aw {
    padding-left: 0;
    padding-right: 0;
}

.mobile_header .moble_div2 .css-2zrim3-MenuSubItem .css-xrz6s1-MenuSubItem {
    margin-left: 0;
}
.mobile_header .moble_div2 a {
    background-color: transparent;
    padding: 16px;
    font-size: 16px;
    display: inline-block;
    width: 100%;
}
.mobile_header .moble_div2 .css-vysuop .css-6ly5aw .css-2txz2j, .mobile_header .moble_div2 .css-2zrim3-MenuSubItem .css-1tfg3ph-MenuSubItem {
    width: 100%;
    min-width: inherit;
    display: flex;
}
.mobile_header .moble_div2 .css-vysuop .css-6ly5aw .css-2txz2j .css-zkfaav {
    display: block;
    width: 100%;
}
.mobile_header .moble_div2 .css-2zrim3-MenuSubItem .css-12gh6qa-MenuSubItem {
    display: none;
}

.css-2zrim3-MenuSubItem svg {
    display: block;
}
.mobile_header .moble_div2 .css-1ndi8j8-MenuSubItem {
    display: block;
}
.mobile_header .moble_div2 .css-2zrim3-MenuSubItem .css-12gh6qa-MenuSubItem {
    display: block;
    width: 100%;
    min-width: inherit;
    position: static;
    border-radius: inherit;
    padding-bottom: 0;
}

.mobile_header .moble_div2 .css-vysuop .css-2zrim3-MenuSubItem .css-1frydlt-MenuSubItem {
    display: none;
}

.mobile_header  .css-1c5ggo3-MenuSubItemMobile {
    transition: max-height 0.3s ease-out 0s;
    overflow: hidden;
    border-style: solid;
    position: relative;
    border-width: 1px;
    width: 100vw;
    top: auto;
    left: auto;
    border-radius: 0;
    margin-top: 24px;
    height: auto;
}
.mobile_header .css-kq58s2-MenuSubItemMobile {
    height: auto;
    padding: 0;
}
.mobile_header  .css-4k4akb-MenuSubItemMobile {
    min-height: 48px;
}
.mobile_header .moble_div2 a {
    padding: 0;
}
.css-1xcxgfs {

    padding-left: 0;

}

.css-vysuop svg {
    margin-right: 15px;
    width: 10px;
    height: 10px;
}

.mobile_header .css-1982br3-MenuSubItemMobile {
    margin-left: 3px!important;
}
.css-vysuop a, .css-vysuop .css-bjqydi-MenuSubItemMobile {
    padding: 0 15px !important;
}
.mobile_header .css-1c5ggo3-MenuSubItemMobile {
    padding: 0;
    margin: 0;
    padding-left: 0px;
    border: none;
}
.mobile_header .css-1c5ggo3-MenuSubItemMobile  .css-nvhnyf-MenuSubItemMobile {
    padding: 0;
}
.css-1xcxgfs {

    padding-left: 0;
  
}
.mobile_header .moble_div2 a {
    padding-left: 18px !important;
}
.css-gzlwbz-MenuSubItemMobile {
    display: block !important;
}
.mobile_header .css-kq58s2-MenuSubItemMobile {
    overflow: hidden;
}
.mobile_header .moble_div2 .css-1c5ggo3-MenuSubItemMobile a {
    padding-left: 43px !important;
}
.css-1c5ggo3-MenuSubItemMobile {
    flex-direction: column;
    justify-content: center;
}
.mobile_header .moble_div2 .css-qgknhm-Menu {
    position: static;
    display: flex;
    justify-content: center;
    padding-bottom: 25px;
    padding: 20px 0px;
}

.mobile_header .testttt svg.css-18rc60n-Hamburger {
    width: 37px;
    height: 67px;
}

.mobile_header .testttt svg.css-rmffv1-Close {
    width: 27px;
    height: 64px;
}

.mobile_header .moble_div2 .css-vysuop .css-kq58s2-MenuSubItemMobile .css-nvhnyf-MenuSubItemMobile {
    background-color: #383838;
    border: none;
}
.mobile_header .moble_div2 .css-1c5ggo3-MenuSubItemMobile a span {
    font-size: 14px;
}
}


`
export default GlobalStyle
