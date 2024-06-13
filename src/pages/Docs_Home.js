import React, { useState, useEffect } from "react";
import style from "../styles/docs_home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";


let letter = `<p><strong style="font-weight:normal;" id="docs-internal-guid-486ffd39-7fff-433e-3b4d-8b13e05c7680"><p dir="ltr" style="line-height:1.44;margin-top:16pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your Name</span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;font-family:'Proxima Nova',sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">123 Your Street</span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;font-family:'Proxima Nova',sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your City, ST 12345</span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;font-family:'Proxima Nova',sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">(123) 456-7890</span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;font-family:'Proxima Nova',sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">no_reply@example.com</span></p><p dir="ltr" style="line-height:1.7999999999999998;margin-top:24pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">4th September 20XX</span></p><p dir="ltr" style="line-height:1.44;margin-top:16pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Ronny Reader</span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">CEO, Company Name</span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">123 Address St&nbsp;</span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Anytown, ST 12345</span></p><p dir="ltr" style="line-height:1.44;margin-top:40pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Dear Ms. Reader,</span></p><p dir="ltr" style="line-height:1.44;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span></p><p dir="ltr" style="line-height:1.44;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><p dir="ltr" style="line-height:1.44;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><p dir="ltr" style="line-height:1.44;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Proxima Nova',sans-serif;color:#353744;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sincerely,</span></p><br><br><br><p dir="ltr" style="line-height:1.44;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:13.999999999999998pt;font-family:'Proxima Nova',sans-serif;color:#00ab44;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your Name</span></p></strong></p><br class="Apple-interchange-newline">`;
let project = `<p><strong style="font-weight:normal;" id="docs-internal-guid-8922daea-7fff-7fdc-0b1e-0c2a8bbab46b"><h2 dir="ltr" style="line-height:1.44;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:12pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&nbsp;</span><br></h2><p dir="ltr" style="line-height:1.44;margin-top:6pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><span style="border:none;display:inline-block;overflow:hidden;width:621px;height:414px;"><img title="Placeholder image" src="https://lh6.googleusercontent.com/xRVcCHO5NvPPrezHnnE24TTTg1_WNVfyWts4HFFlSE_l2ROEHh5xY6F-K8wd-YQiTvQB3ni2r7B_coiuo4__iFMLzyN9YmOlZLKoQPdXg3OLPUDRAg2wkwUshnMvXAf1zwJCNhYyt-gc3kpxvykC9MY" width="621" height="414" style="margin-left:0px;margin-top:0px;"></span></span></p><p dir="ltr" style="line-height:1.2;margin-top:16pt;margin-bottom:0pt;"><span style="font-size:42pt;font-family:'PT Sans Narrow',sans-serif;color:#695d46;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Project Name</span></p><p dir="ltr" style="line-height:1.2;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:13.999999999999998pt;font-family:'PT Sans Narrow',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">09.04.20XX</span></p><p dir="ltr" style="line-height:1.44;margin-top:0pt;margin-bottom:72pt;"><span style="font-size:18pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">─</span></p><p dir="ltr" style="line-height:1.2;margin-top:6pt;margin-bottom:0pt;"><span style="font-size:16pt;font-family:'PT Sans Narrow',sans-serif;color:#008575;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your Name</span></p><p dir="ltr" style="line-height:1.44;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:13.999999999999998pt;font-family:'PT Sans Narrow',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your Company&nbsp;</span></p><p dir="ltr" style="line-height:1.44;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:13.999999999999998pt;font-family:'PT Sans Narrow',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">123 Your Street</span></p><p dir="ltr" style="line-height:1.44;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:13.999999999999998pt;font-family:'PT Sans Narrow',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your City, ST 12345</span></p><h1 dir="ltr" style="line-height:1.56;margin-top:24pt;margin-bottom:0pt;"><span style="font-size:18pt;font-family:'PT Sans Narrow',sans-serif;color:#ff5e0e;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Overview</span></h1><p dir="ltr" style="line-height:1.44;margin-top:6pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, </span><span style="font-size:12pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><span style="border:none;display:inline-block;overflow:hidden;width:621px;height:11px;"><img title="horizontal line" src="https://lh6.googleusercontent.com/g3YAJrcc6tyewtQIVz3K4_orlVeeBo4tnCj0Hnepda3zxJ9jcF7G6EDIvgwHPYLYH9I9X4R9IdC5XE-Wbt8aUehDyEjjOQO8gDPCn1Twy6NN5-Y44HnS9qAXWhSiG9TMRV44cJPcterkKsD5NtIyDFY" width="620.9999999999999" height="8.137055053642918" style="margin-left:1.1973588729683482e-13px;margin-top:0px;"></span></span><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">quis nostrud exerci tation ullamcorper.</span></p><h1 dir="ltr" style="line-height:1.56;margin-top:24pt;margin-bottom:0pt;"><span style="font-size:18pt;font-family:'PT Sans Narrow',sans-serif;color:#ff5e0e;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Goals</span></h1><ol style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.44;margin-top:6pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span></p></li><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.44;margin-top:6pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</span></p></li></ol><h1 dir="ltr" style="line-height:1.56;margin-top:24pt;margin-bottom:0pt;"><span style="font-size:18pt;font-family:'PT Sans Narrow',sans-serif;color:#ff5e0e;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Specifications</span></h1><p dir="ltr" style="line-height:1.44;margin-top:6pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><h2 dir="ltr" style="line-height:1.2;margin-top:16pt;margin-bottom:0pt;"><span style="font-size:16pt;font-family:'PT Sans Narrow',sans-serif;color:#008575;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem Ipsum</span></h2><p dir="ltr" style="line-height:1.44;margin-top:6pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><h1 dir="ltr" style="line-height:1.56;margin-top:24pt;margin-bottom:0pt;"><span style="font-size:18pt;font-family:'PT Sans Narrow',sans-serif;color:#ff5e0e;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Milestones</span></h1><ol style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:upper-roman;font-size:16pt;font-family:'PT Sans Narrow',sans-serif;color:#008575;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><h2 dir="ltr" style="line-height:1.2;margin-top:16pt;margin-bottom:0pt;" role="presentation"><span style="font-size:16pt;font-family:'PT Sans Narrow',sans-serif;color:#008575;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum</span></h2></li></ol><p dir="ltr" style="line-height:1.44;margin-left: 36pt;margin-top:6pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</span></p><ol style="margin-top:0;margin-bottom:0;padding-inline-start:48px;" start="2"><li dir="ltr" style="list-style-type:upper-roman;font-size:16pt;font-family:'PT Sans Narrow',sans-serif;color:#008575;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><h2 dir="ltr" style="line-height:1.2;margin-top:16pt;margin-bottom:0pt;" role="presentation"><span style="font-size:16pt;font-family:'PT Sans Narrow',sans-serif;color:#008575;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Dolor sit amet</span></h2></li></ol><p dir="ltr" style="line-height:1.44;margin-left: 36pt;margin-top:6pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:'Open Sans',sans-serif;color:#695d46;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</span></p></strong></p><br class="Apple-interchange-newline">`;
let Brochure = `<p><strong style="font-weight:normal;" id="docs-internal-guid-fd22f12f-7fff-401c-08ac-69856b3879ad"><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:20pt;font-family:Roboto,sans-serif;color:#6d64e8;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your Company</span></p><p dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">123 Your Street</span></p><p dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Your City, ST 12345</span></p><p dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">(123) 456 - 7890</span></p><p dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:20pt;margin-bottom:0pt;"><span style="font-size:34pt;font-family:Roboto,sans-serif;color:#283592;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Product Brochure</span></p><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#e01b84;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">September 04, 20XX</span></p><h1 dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:24pt;margin-bottom:0pt;"><span style="font-size:21pt;font-family:Roboto,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Product Overview</span></h1><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span><span style="border:none;display:inline-block;overflow:hidden;width:257px;height:293px;"><img title="Placeholder image" src="https://lh4.googleusercontent.com/zFNaoYpZnZUCDbFoMZpJMSVnDqfw1CpBK1vh-gHkoa_O1IO8WErjNy8Zfta5xznGBZby5GpQdGWUfls3-QpZF50fIN_ViUDTIRkN2wuV1S0MYel7yAqlY4TGFSjWkmtKwU9ooQKRBpPftB-tpIoOMWA" width="257" height="293" style="margin-left:0px;margin-top:0px;"></span></p><h2 dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:16pt;font-family:Roboto,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum</span></h2><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.&nbsp;</span></p><h3 dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:12pt;font-family:Roboto,sans-serif;color:#e01b84;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum</span></h3><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><h2 dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:16pt;font-family:Roboto,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Dolor sit</span></h2><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span></p><h1 dir="ltr" style="line-height:1.2;margin-left: -0.75pt;margin-top:24pt;margin-bottom:0pt;"><span style="font-size:21pt;font-family:Roboto,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Details</span></h1><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span></p><p dir="ltr" style="line-height:1.68;margin-left: -0.75pt;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p></strong></p><br class="Apple-interchange-newline">`;

function Docs_Home() {
  const [file, setfile] = useState([]);
  const navigate = useNavigate();

  const getAllDocs = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/doc/All_Doc/${userId}`
      );
      console.log("Documents retrieved successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error retrieving documents:", error);
      throw error;
    }
  };

  useEffect(() => {
    const User_ID = sessionStorage.getItem("User_ID");
    if (!User_ID) {
      const error_ = {
        error_: "Please Login",
      };
      navigate("/", { state: error_ });
    }
    console.log("User_ID:", User_ID);
    getAllDocs(User_ID)
      .then((docs) => {
        setfile(docs);
        console.log(docs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const create_doc = async () => {
    try {
      const response = await axios.post("http://localhost:5001/doc/Add_doc", {
        USER_ID: sessionStorage.getItem("User_ID"),
        DOC_CONTENT: "",
        DOC_NAME: "Untitled",
      });
      console.log("Document added successfully:", response.data);

      const Doc_data = {
        Socket_id: response.data.Socket_ID,
        DOC_NAME: "Untitled",
        DOC_CONTENT: "",
      };
      navigate("edit", { state: Doc_data });
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  const edit_doc = async (Doc_Id) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/doc/Get_Doc/${Doc_Id}`
      );
      console.log("Document added successfully:", response.data);

      const Doc_data = {
        Socket_id: response.data.Socket_ID,
        DOC_NAME: response.data.DOC_name,
        DOC_CONTENT: response.data.DOC_Content,
      };
      console.log("Logging Document data");
      console.log(Doc_data);
      navigate("edit", { state: Doc_data });
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  const handel_different_template = async (text) => {
    try {
      const response = await axios.post("http://localhost:5001/doc/Add_doc", {
        USER_ID: sessionStorage.getItem("User_ID"),
        DOC_CONTENT: text,
        DOC_NAME: "Untitled",
      });
      console.log("Document added successfully:", response.data);

      const Doc_data = {
        Socket_id: response.data.Socket_ID,
        DOC_NAME: "Untitled",
        DOC_CONTENT: text,
      };
      navigate("edit", { state: Doc_data });
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  console.log(file);

  const time_conv = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return formattedDate;
  };


  return (
    <>
      <Navbar yes="yes" />

      <div className={style.starter_box}>
        <h1 className={style.st_head}>Start a new document</h1>
        <hr />
        <div className={style.box_st}>
          <div className={style.link_extra}>
            <div onClick={() => handel_different_template("")}>
              <img src="pl.png" alt="" className={style.st_box} />
            </div>
            <h3>Blank</h3>
          </div>
          <div className={style.link_extra}>
            <div
              onClick={() => {
                handel_different_template(project);
              }}
            >
              <img src="project_pro.png" alt="" className={style.st_box} />
            </div>
            <h3>Project Proposal</h3>
          </div>
          <div className={style.link_extra}>
            <div
              onClick={() => {
                handel_different_template(letter);
              }}
            >
              <img src="resume.png" alt="" className={style.st_box} />
            </div>
            <h3>Resume</h3>
          </div>
          <div className={style.link_extra}>
            <div
              onClick={() => {
                handel_different_template(Brochure);
              }}
            >
              <img src="brochure.png" alt="" className={style.st_box} />
            </div>
            <h3>Brochure</h3>
          </div>
          <div className={style.link_extra}>
            <div
              onClick={() => {
                handel_different_template(letter);
              }}
            >
              <img src="res.png" alt="" className={style.st_box} />
            </div>
            <h3>Letter</h3>
          </div>
        </div>
      </div>
      <div className={style.float}>
        <div className={style.outer_float}>
          <div
            onClick={() => {
              create_doc();
            }}
          >
            <img src="plus.png" alt="" className={style.float_box} />
          </div>
        </div>
      </div>
      <div className={style.ext_box}>
        <h1 className={style.docus_head}>Recent Documents</h1>
      </div>

      <div className={style.documents}>
        {file.map((user) => {
          return (
            <div
              className={style.box_docs}
              onClick={() => {
                edit_doc(user.Doc_Id);
              }}
            >
              <h3 className={style.titel_time}>
                {time_conv(user.DOC_Time_Update)}
              </h3>
              <img src="gd.png" alt="" className={style.docs_img} />
              <div className={style.titel_docs}>
                <h3 className={style.titel_name}>
                  {user.DOC_name.length > 15
                    ? user.DOC_name.slice(0, 10) + "..."
                    : user.DOC_name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Docs_Home;
