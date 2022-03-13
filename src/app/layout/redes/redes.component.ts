import { Component, Input, OnInit } from '@angular/core';
import { Red, Redjson } from 'src/app/interfaz/Redes';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss']
})
export class RedesComponent implements OnInit {

  @Input() accion:string='ninguno';
  @Input() redes:any;
  aux:Array<any>=[];

  constructor() { }

  ngOnInit(): void { 
    //alert('hola mira ya entre');
    //creo un vector auxiliar para poner los usernames
    if(this.accion=='editar'){
      this.aux=this.json.map((red,index)=>{
        let aux2=this.redes.filter((red: {red_id:number})=>red.red_id==index);
        if(aux2[0]){
          return aux2[0].username;
        }else{
          return '';
        }
        
      });
    }
    console.log(this.aux);
  }

  /*Redes:Array<Icon>=[
    {
      red: "Facebook",
      user: "maxidvp"
    },
    {
      red: "Instagram",
      user: "maxidvp"
    },
    {
      red: "LinkedIn",
      user: "cristian-maximiliano-r-3475971b8"
    },
    {
      red: "Email",
      user: "maxidvp@gmail.com"
    },
    {
      red: "GitHub",
      user: "maxidvp"
    },
    {
      red: "Twitter",
      user: "maxidvp"
    },
    {
      red: "YouTube",
      user: "UC3M2Vi6QHSST63WstnWulEA"
    },
    /*{
      red: "Skype",
      user: "maxidvp"
    },*
    {
      red: "Telegram",
      user: "maxidvp"
    },
    {
      red: "Reddit",
      user: "cristiandvp"
    },
    {
      red: "Whatssap",
      user: "+5493874818579"
    },
    {
      red: "Website",
      user: "localhost/"
    }
  ]*/

  json:Array<Redjson>=[
    {//0
      sitio:"Email",
      url:"mailto:",
      path:"M13.1115479,18.9319176 C13.389863,19.1136566 14.228726,19.6535732 15.6282877,20.5512492 C17.0278493,21.4489252 18.0999726,22.1401747 18.8448082,22.6248583 C18.9266301,22.6779992 19.1005205,22.7934864 19.3664795,22.9714595 C19.6324384,23.149572 19.8534932,23.293652 20.0293425,23.4034207 C20.2053425,23.5131893 20.4181096,23.6363478 20.6677945,23.7726171 C20.9174795,23.9088864 21.1528493,24.0112628 21.3737534,24.0791882 C21.5948082,24.1475321 21.7994384,24.1814251 21.9876438,24.1814251 L22,24.1814251 L22.0123562,24.1814251 C22.2005616,24.1814251 22.4051918,24.1475321 22.6262466,24.0791882 C22.8471507,24.0112628 23.0826712,23.908747 23.3322055,23.7726171 C23.5817397,23.6362083 23.7945068,23.5131893 23.9705068,23.4034207 C24.1465068,23.293652 24.367411,23.149572 24.6333699,22.9714595 C24.8993288,22.7933469 25.0733699,22.6779992 25.1551918,22.6248583 C25.9080137,22.1400352 27.8233699,20.9090085 30.9006575,18.9316387 C31.4981233,18.545426 31.9971918,18.0794323 32.3983151,17.5339366 C32.799589,16.9887198 33,16.4167233 33,15.8182262 C33,15.3182 32.8054658,14.8901442 32.4166986,14.5340586 C32.0279315,14.177973 31.5674384,14 31.0356712,14 L12.9641781,14 C12.3340137,14 11.8491096,14.196942 11.5094658,14.5908259 C11.1698219,14.9848493 11,15.4773437 11,16.0681695 C11,16.5454609 11.2251233,17.0626427 11.6752192,17.6194362 C12.1253151,18.1762296 12.6041918,18.6137699 13.1115479,18.9319176 Z M31.7722192,20.1477413 C29.0879178,21.8294193 27.0497534,23.1363216 25.6586301,24.0681695 C25.1921096,24.3863173 24.813589,24.6345869 24.5229178,24.8124205 C24.2323973,24.990533 23.8457397,25.1722719 23.3627945,25.3579162 C22.88,25.5435605 22.4299041,25.6363129 22.0125068,25.6363129 L22,25.6363129 L21.9876438,25.6363129 C21.5702466,25.6363129 21.12,25.5435605 20.6372055,25.3579162 C20.154411,25.1722719 19.7676027,24.990533 19.4770822,24.8124205 C19.1865616,24.6345869 18.8080411,24.3863173 18.3415205,24.0681695 C17.2365479,23.3182 15.2027534,22.0112977 12.2399863,20.1477413 C11.7734658,19.8599997 11.360137,19.5302753 11,19.1591262 L11,28.1816343 C11,28.6818 11.192274,29.1097163 11.5769726,29.4658019 C11.9616712,29.822027 12.4241233,30 12.9643288,30 L31.0358219,30 C31.5758767,30 32.0383288,29.822027 32.4230274,29.4658019 C32.8078767,29.1095769 33,28.6818 33,28.1816343 L33,19.1591262 C32.648,19.522604 32.2388904,19.8523284 31.7722192,20.1477413 Z"
    },
    {//1
      sitio:"Facebook",
      url:"https://www.facebook.com/",
      path:"M23.8,33.5h-4.9V22h-2.4v-4h2.4v-2.4c0-3.2,1.4-5.2,5.3-5.2h3.3v4h-2c-1.5,0-1.6,0.6-1.6,1.6l0,2 h3.7l-0.4,4h-3.3L23.8,33.5L23.8,33.5z"
    },
    {//2
      sitio:"GitHub",
      url:"https://github.com/",
      path:"M10,22.3044338 C10,27.7398363 13.4380429,32.3519218 18.2065134,33.9789169 C18.8069002,34.0922174 19.0256914,33.7122831 19.0256914,33.3859777 C19.0256914,33.0936624 19.015378,32.3201977 19.0094846,31.2936952 C15.671629,32.0369464 14.9673716,29.6440399 14.9673716,29.6440399 C14.4214985,28.2224964 13.634734,27.8440727 13.634734,27.8440727 C12.5451978,27.0804274 13.7172412,27.0962895 13.7172412,27.0962895 C14.921698,27.1831532 15.555235,28.3644997 15.555235,28.3644997 C16.6263544,30.2445326 18.364161,29.7014455 19.0477915,29.3864702 C19.1568188,28.5911007 19.4669572,28.0495243 19.8095092,27.741347 C17.1449707,27.4309036 14.3434114,26.3756983 14.3434114,21.660887 C14.3434114,20.3171431 14.8111974,19.2188837 15.5788084,18.3585552 C15.4557844,18.0473565 15.0439854,16.7965191 15.6966758,15.1030543 C15.6966758,15.1030543 16.7044415,14.7714615 18.9962246,16.3637112 C19.9538967,16.0910346 20.9800792,15.9543187 22.0003683,15.9497867 C23.0199208,15.9543187 24.0461033,16.0910346 25.0052488,16.3637112 C27.2955585,14.7714615 28.3018509,15.1030543 28.3018509,15.1030543 C28.9560146,16.7965191 28.5442156,18.0473565 28.4211916,18.3585552 C29.1902759,19.2188837 29.6543786,20.3171431 29.6543786,21.660887 C29.6543786,26.3870284 26.8491359,27.4271269 24.1757574,27.7322829 C24.6067098,28.1122172 24.9897787,28.8630219 24.9897787,30.0103782 C24.9897787,31.6555014 24.9757819,32.9826279 24.9757819,33.3859777 C24.9757819,33.7153044 25.1916265,34.0975048 25.8008533,33.9774062 C30.5649038,32.3473898 34,27.7390809 34,22.3044338 C34,15.5086701 28.6267227,10 21.998895,10 C15.3732773,10 10,15.5086701 10,22.3044338 Z"
    },
    {//3
      sitio:"Instagram",
      url:"https://www.instagram.com/",
      path:"M21.9999782,12.9820221 C24.9371191,12.9820221 25.2849947,12.9932002 26.4449003,13.0461217 C27.5173894,13.0950697 28.0998311,13.2742691 28.4874851,13.4248682 C29.0008931,13.6244152 29.3673699,13.8628238 29.752273,14.247727 C30.1371762,14.6326301 30.3755848,14.9991069 30.5750882,15.5125149 C30.7257309,15.9001689 30.9049303,16.4826106 30.9538783,17.5550561 C31.0067998,18.7150053 31.0179779,19.0628809 31.0179779,22.0000218 C31.0179779,24.9371627 31.0067998,25.2850383 30.9538783,26.4449439 C30.9049303,27.5174331 30.7257309,28.0998748 30.5750882,28.4875288 C30.3755848,29.0009368 30.1371762,29.3674135 29.752273,29.7523167 C29.3673699,30.1372199 29.0008931,30.3756284 28.4874851,30.5751318 C28.0998311,30.7257746 27.5173894,30.904974 26.4449003,30.953922 C25.2851693,31.0068434 24.9372937,31.0180216 21.9999782,31.0180216 C19.0626626,31.0180216 18.714787,31.0068434 17.5550561,30.953922 C16.4825669,30.904974 15.9001252,30.7257746 15.5125149,30.5751318 C14.9990632,30.3756284 14.6325865,30.1372199 14.2476833,29.7523167 C13.8627801,29.3674135 13.6243716,29.0009368 13.4248682,28.4875288 C13.2742254,28.0998748 13.095026,27.5174331 13.046078,26.4449876 C12.9931566,25.2850383 12.9819784,24.9371627 12.9819784,22.0000218 C12.9819784,19.0628809 12.9931566,18.7150053 13.046078,17.5550997 C13.095026,16.4826106 13.2742254,15.9001689 13.4248682,15.5125149 C13.6243716,14.9991069 13.8627801,14.6326301 14.2476833,14.247727 C14.6325865,13.8628238 14.9990632,13.6244152 15.5125149,13.4248682 C15.9001252,13.2742691 16.4825669,13.0950697 17.5550124,13.0461217 C18.7149617,12.9932002 19.0628373,12.9820221 21.9999782,12.9820221 M21.9999782,11 C19.0125357,11 18.637981,11.0126627 17.4647141,11.0661955 C16.2938487,11.1196409 15.4942631,11.3055647 14.7945384,11.5775076 C14.0711911,11.8586201 13.4577476,12.2347467 12.8462253,12.846269 C12.234703,13.4577912 11.8585764,14.0712348 11.5774639,14.794582 C11.305521,15.4943067 11.1195973,16.2938923 11.0661518,17.4647577 C11.0126191,18.637981 11,19.0125794 11,22.0000218 C11,24.9874643 11.0126191,25.3620626 11.0661518,26.5352859 C11.1195973,27.7061513 11.305521,28.5057369 11.5774639,29.2054616 C11.8585764,29.9287652 12.234703,30.5422524 12.8462253,31.1537747 C13.4577476,31.765297 14.0711911,32.1414236 14.7945384,32.4225361 C15.4942631,32.694479 16.2938487,32.8804027 17.4647141,32.9338482 C18.637981,32.9873809 19.0125357,33 21.9999782,33 C24.9874206,33 25.362019,32.9873809 26.5352423,32.9338482 C27.7061077,32.8804027 28.5056933,32.694479 29.205418,32.4225361 C29.9287652,32.1414236 30.5422088,31.765297 31.153731,31.1537747 C31.7652533,30.5422524 32.1413799,29.9288089 32.4224924,29.2054616 C32.6944353,28.5057369 32.8803591,27.7061513 32.9338045,26.5352859 C32.9873373,25.3620626 33,24.9874643 33,22.0000218 C33,19.0125794 32.9873373,18.637981 32.9338045,17.4647577 C32.8803591,16.2938923 32.6944353,15.4943067 32.4224924,14.794582 C32.1413799,14.0712348 31.7652533,13.4577912 31.153731,12.846269 C30.5422088,12.2347467 29.9287652,11.8586201 29.205418,11.5775076 C28.5056933,11.3055647 27.7061077,11.1196409 26.5352423,11.0661955 C25.362019,11.0126627 24.9874206,11 21.9999782,11 Z M22.0218254,16.3690476 C18.8998963,16.3690476 16.3690476,18.8998963 16.3690476,22.0218254 C16.3690476,25.1437545 18.8998963,27.6746032 22.0218254,27.6746032 C25.1437545,27.6746032 27.6746032,25.1437545 27.6746032,22.0218254 C27.6746032,18.8998963 25.1437545,16.3690476 22.0218254,16.3690476 Z M22.0218254,25.6911823 C19.99532,25.6911823 18.3524685,24.0483308 18.3524685,22.0218254 C18.3524685,19.99532 19.99532,18.3524685 22.0218254,18.3524685 C24.0483308,18.3524685 25.6911823,19.99532 25.6911823,22.0218254 C25.6911823,24.0483308 24.0483308,25.6911823 22.0218254,25.6911823 Z M29.1587302,16.1071212 C29.1587302,16.830358 28.5724648,17.4166667 27.849228,17.4166667 C27.1259912,17.4166667 26.5396825,16.830358 26.5396825,16.1071212 C26.5396825,15.3838844 27.1259912,14.797619 27.849228,14.797619 C28.5724648,14.797619 29.1587302,15.3838844 29.1587302,16.1071212 Z"
    },
    {//4
      sitio:"LinkedIn",
      url:"https://www.linkedin.com/in/",
      path:"M12.5044685,18.4131131 L16.4026341,18.4131131 L16.4026341,31.9987194 L12.5044685,31.9987194 L12.5044685,18.4131131 Z M14.3541863,16.7137918 L14.3259643,16.7137918 C12.9148636,16.7137918 12,15.6752465 12,14.3600973 C12,13.0180561 12.9419097,12 14.3812324,12 C15.8193791,12 16.7036689,13.0154949 16.7318909,14.3562556 C16.7318909,15.6714048 15.8193791,16.7137918 14.3541863,16.7137918 L14.3541863,16.7137918 Z M32,32 L27.5797272,32 L27.5797272,24.9683698 C27.5797272,23.1281854 26.8882879,21.8732232 25.3678269,21.8732232 C24.2048448,21.8732232 23.5580903,22.7196824 23.2570555,23.537969 C23.1441675,23.8299398 23.1618062,24.2384428 23.1618062,24.6482264 L23.1618062,32 L18.7826905,32 C18.7826905,32 18.8391345,19.5451402 18.7826905,18.4131131 L23.1618062,18.4131131 L23.1618062,20.5452683 C23.420508,19.6130106 24.8198495,18.2824946 27.0529163,18.2824946 C29.8233772,18.2824946 32,20.2379306 32,24.4446152 L32,32 L32,32 Z"
    },
    {//5
      sitio:"Reddit",
      url:"https://www.reddit.com/user/",
      path:"M25.868095,25.4270036 C24.8961955,25.4270036 24.0795074,24.6459431 24.0795074,23.6829035 C24.0795074,22.719864 24.8961955,21.9130366 25.868095,21.9130366 C26.8399945,21.9130366 27.6282408,22.719864 27.6282408,23.6829035 C27.6282408,24.6459431 26.8399945,25.4270036 25.868095,25.4270036 M26.2809085,28.8121359 C25.3756443,29.7083424 23.9795545,30.1439648 22.013002,30.1439648 C22.0089389,30.1439648 22.0040631,30.1431596 21.9991874,30.1431596 C21.9951242,30.1431596 21.9902485,30.1439648 21.9853727,30.1439648 C20.0188202,30.1439648 18.6235431,29.7083424 17.7190915,28.8121359 C17.4411737,28.5367517 17.4411737,28.0914667 17.7190915,27.8168877 C17.9961966,27.5423087 18.4455782,27.5423087 18.723496,27.8168877 C19.347592,28.4352943 20.4145686,28.7364455 21.9853727,28.7364455 C21.9902485,28.7364455 21.9951242,28.7372507 21.9991874,28.7372507 C22.0040631,28.7372507 22.0089389,28.7364455 22.013002,28.7364455 C23.5838061,28.7364455 24.6515954,28.4352943 25.276504,27.8168877 C25.5544218,27.5415034 26.0038034,27.5423087 26.2809085,27.8168877 C26.5580136,28.0922719 26.5580136,28.5375569 26.2809085,28.8121359 M16.3717592,23.6829035 C16.3717592,22.7206692 17.1868221,21.9130366 18.157909,21.9130366 C19.1298085,21.9130366 19.9180547,22.7206692 19.9180547,23.6829035 C19.9180547,24.6459431 19.1298085,25.4270036 18.157909,25.4270036 C17.1868221,25.4270036 16.3717592,24.6459431 16.3717592,23.6829035 M30.665833,12.5725193 C31.3240593,12.5725193 31.8595792,13.1031573 31.8595792,13.7545779 C31.8595792,14.4068036 31.3240593,14.9374416 30.665833,14.9374416 C30.0076068,14.9374416 29.4720869,14.4068036 29.4720869,13.7545779 C29.4720869,13.1031573 30.0076068,12.5725193 30.665833,12.5725193 M35.002,21.7672923 C35.002,20.059427 33.6002219,18.6704277 31.8766443,18.6704277 C31.1306545,18.6704277 30.4456117,18.931318 29.9076539,19.36533 C28.0020483,18.1784401 25.5836763,17.4634074 22.9914025,17.3120266 L24.3436105,13.0757799 L28.0597446,13.9429986 C28.1572596,15.2836849 29.2884337,16.344961 30.665833,16.344961 C32.1066172,16.344961 33.279235,15.1830328 33.279235,13.7545779 C33.279235,12.3269281 32.1066172,11.165 30.665833,11.165 C29.658178,11.165 28.7821683,11.7334832 28.3457886,12.5636619 L24.0274994,11.5563354 C23.6658813,11.4717876 23.3002,11.6779232 23.1880578,12.0289978 L21.5091745,17.2870649 C18.7161824,17.3547031 16.090591,18.0721514 14.0452138,19.32829 C13.5145697,18.9168241 12.8474046,18.6704277 12.1233557,18.6704277 C10.3997781,18.6704277 8.99799995,20.059427 8.99799995,21.7672923 C8.99799995,22.8229318 9.53433246,23.7561783 10.3510206,24.3149989 C10.3168903,24.5605901 10.2990126,24.8077917 10.2990126,25.0582142 C10.2990126,27.1928445 11.5512677,29.1785096 13.8249925,30.6488359 C16.0044527,32.0587708 18.8892715,32.835 21.9471794,32.835 C25.0050873,32.835 27.889906,32.0587708 30.0693663,30.6488359 C32.343091,29.1785096 33.5953462,27.1928445 33.5953462,25.0582142 C33.5953462,24.8303378 33.5799063,24.6040718 33.5514644,24.3794163 C34.4225984,23.829453 35.002,22.8639978 35.002,21.7672923"
    },
    /*7:{
      sitio:"Skype",
      url:"skype:",
      path:"M33.3099718,24.5474783 C33.4835372,23.7655652 33.5738476,22.9572174 33.5738476,22.1252174 C33.5738476,15.8935652 28.4501411,10.8403478 22.1284102,10.8403478 C21.4609595,10.8403478 20.8076199,10.8973913 20.1698024,11.0045217 C19.1481656,10.370087 17.9374412,10 16.6392286,10 C12.971778,10 10,12.930087 10,16.546087 C10,17.7537391 10.3344309,18.8848696 10.9129821,19.856 C10.7605833,20.5892174 10.6815616,21.3488696 10.6815616,22.1252174 C10.6815616,28.3596522 15.8052681,33.4114783 22.1284102,33.4114783 C22.8438382,33.4114783 23.5451552,33.3474783 24.2238946,33.2236522 C25.1594544,33.7189565 26.2276576,34 27.3621825,34 C31.028222,34 34,31.069913 34,27.453913 C34,26.4104348 33.7516463,25.424 33.3099718,24.5474783 L33.3099718,24.5474783 Z M27.9082785,27.4873043 C27.3805268,28.226087 26.5973659,28.8118261 25.5827846,29.2278261 C24.579492,29.6382609 23.3758231,29.8469565 22.0070555,29.8469565 C20.3617121,29.8469565 18.9844779,29.5617391 17.9078081,28.9996522 C17.1387582,28.5906087 16.505174,28.0368696 16.0225776,27.3495652 C15.537159,26.6594783 15.2902164,25.9735652 15.2902164,25.3113043 C15.2902164,24.898087 15.4510818,24.5405217 15.7671684,24.2469565 C16.0818438,23.9547826 16.4825964,23.8086957 16.9623706,23.8086957 C17.3560677,23.8086957 17.696143,23.9241739 17.9713076,24.1523478 C18.2337723,24.3735652 18.4595484,24.7005217 18.6429915,25.1206957 C18.8447789,25.5798261 19.0663217,25.9652174 19.2991533,26.2685217 C19.5235183,26.5634783 19.8480715,26.8097391 20.2587018,27.0017391 C20.6735654,27.1951304 21.2337723,27.293913 21.9223895,27.293913 C22.8678269,27.293913 23.6439323,27.0949565 24.2281279,26.7012174 C24.7982126,26.3186087 25.0747883,25.8566957 25.0747883,25.2932174 C25.0747883,24.848 24.9308561,24.4987826 24.6331138,24.221913 C24.3212606,23.9353043 23.9106303,23.7126957 23.4111007,23.5582609 C22.8918156,23.3996522 22.1848542,23.2257391 21.3113829,23.0448696 C20.1232361,22.7944348 19.1142992,22.4966957 18.3113829,22.1613913 C17.4901223,21.8163478 16.8283161,21.3377391 16.3443086,20.7408696 C15.8532455,20.1342609 15.6048918,19.3746087 15.6048918,18.4786087 C15.6048918,17.6271304 15.8659454,16.8577391 16.3809972,16.1954783 C16.8932267,15.5373913 17.6411101,15.0253913 18.6034807,14.6761739 C19.5545626,14.3297391 20.6834431,14.1530435 21.9619003,14.1530435 C22.9849483,14.1530435 23.8824083,14.2713043 24.6331138,14.4994783 C25.3880527,14.7304348 26.023048,15.0434783 26.5239887,15.4288696 C27.0263405,15.8170435 27.4031044,16.2302609 27.6373471,16.6615652 C27.874412,17.0970435 27.9943556,17.5297391 27.9943556,17.949913 C27.9943556,18.3533913 27.8377234,18.7193043 27.5244591,19.0393043 C27.2111947,19.3606957 26.8160865,19.5234783 26.3490122,19.5234783 C25.925682,19.5234783 25.5940734,19.4205217 25.364064,19.2215652 C25.1495767,19.0323478 24.9280339,18.7415652 24.6810913,18.3227826 C24.3960489,17.7885217 24.0503293,17.3669565 23.65381,17.0706087 C23.2685795,16.7812174 22.6251176,16.6351304 21.7417686,16.6351304 C20.9219191,16.6351304 20.2544685,16.797913 19.7577611,17.117913 C19.280809,17.4267826 19.0493885,17.7801739 19.0493885,18.2003478 C19.0493885,18.4577391 19.1241769,18.672 19.2779868,18.8556522 C19.4402634,19.0546087 19.6702728,19.2243478 19.9595484,19.3676522 C20.2601129,19.517913 20.5719661,19.6361739 20.8809972,19.7196522 C21.1984948,19.8073043 21.733302,19.9353043 22.4642521,20.1022609 C23.3913452,20.2998261 24.24365,20.5182609 24.9957667,20.7561739 C25.7577611,20.9982609 26.4167451,21.2918261 26.9543744,21.6382609 C27.5018815,21.9902609 27.9365005,22.4410435 28.2441204,22.9808696 C28.5531515,23.5234783 28.7097836,24.1926957 28.7097836,24.9704348 C28.7097836,25.8984348 28.4402634,26.7471304 27.9082785,27.4873043 L27.9082785,27.4873043 Z"
    },*/
    {//6
      sitio:"Telegram",
      url:"https://t.me/",
      path:"M30.9886676,11.9209704 L27.8458705,30.7777533 C27.8049484,31.0151012 27.6739999,31.1992476 27.4530208,31.3301981 C27.3384391,31.3956734 27.2115827,31.4284106 27.0724477,31.4284106 C26.9824192,31.4284106 26.8842078,31.4079498 26.7778105,31.3670278 L21.2165327,29.0958658 L18.2456073,32.7174485 C18.0982879,32.9056899 17.8977729,32.9998091 17.6440563,32.9998091 C17.537659,32.9998091 17.4476318,32.9834406 17.3739721,32.9507029 C17.2184684,32.8934121 17.093658,32.7972467 16.9995373,32.662204 C16.9054166,32.5271612 16.858357,32.377798 16.858357,32.2141098 L16.858357,27.9295934 L27.4652974,14.9287255 L14.3416639,26.2845355 L9.49242614,24.2957342 C9.18960303,24.1811525 9.02591731,23.9560846 9.00136409,23.6205239 C8.98499527,23.2931475 9.11594384,23.0517111 9.39421373,22.8962073 L29.8223953,11.110718 C29.9451614,11.0370583 30.07611,11.000229 30.2152449,11.000229 C30.3789331,11.000229 30.5262502,11.0452426 30.6572007,11.1352711 C30.9272862,11.3316969 31.0377741,11.593594 30.9886676,11.9209704 Z"
    },
    {//7
      sitio:"Twitter",
      url:"https://twitter.com/",
      path:"M30.526149,16.8457316 C31.4160944,16.2841254 32.0989611,15.3936155 32.41944,14.3328037 C31.5861948,14.8541095 30.6654341,15.2311137 29.6830428,15.4352159 C28.899102,14.5512061 27.7786582,14 26.5386512,14 C24.1597112,14 22.231907,16.0345226 22.231907,18.5435505 C22.231907,18.8997544 22.2676528,19.2468583 22.3416094,19.578362 C18.762106,19.3885599 15.5881317,17.5815398 13.4618771,14.8307092 C13.0908611,15.5041167 12.8788519,16.2841254 12.8788519,17.1161346 C12.8788519,18.6917521 13.6393731,20.0827676 14.7955626,20.8991767 C14.0892763,20.8757764 13.4248987,20.6690741 12.8431062,20.3310703 L12.8431062,20.386971 C12.8431062,22.5891954 14.3271703,24.4261158 16.3005811,24.8421205 C15.9381933,24.9487217 15.558549,25.0020222 15.1641134,25.0020222 C14.8867758,25.0020222 14.6156013,24.9747219 14.3542877,24.9214213 C14.9015672,26.7258414 16.4928685,28.041456 18.3787639,28.0765564 C16.9033281,29.29597 15.0457827,30.021378 13.0279979,30.021378 C12.6804015,30.021378 12.3365029,30.0018778 12,29.9589773 C13.9068498,31.2472916 16.1711569,32 18.6043317,32 C26.5300229,32 30.8614193,25.0761231 30.8614193,19.0713563 C30.8614193,18.8737542 30.858954,18.677452 30.8503258,18.4837498 C31.6921993,17.8428427 32.4243705,17.0420338 33,16.1307237 C32.2271527,16.4921277 31.3963726,16.7365304 30.526149,16.8457316 Z"
    },
    {//8
      sitio:"Website",
      url:"http://",
      path:"M33,13.4H12.8v4C11.6,19,11,21,11,23c0,2.5,1,4.9,2.8,6.7c1.8,1.9,4.3,2.9,6.9,2.9s5-1,6.9-2.9 c1.8-1.8,2.8-4.2,2.8-6.7c0-0.8-0.1-1.5-0.3-2.3h3L33,13.4L33,13.4z M12.8,19.1v1.6h2.6c-0.1,0.6-0.1,1.2-0.1,1.8h-3.4 C12,21.3,12.3,20.2,12.8,19.1z M11.9,23.5h3.4c0,1.5,0.2,2.8,0.6,4c-0.6,0.4-1.2,0.8-1.8,1.3C12.8,27.3,12,25.4,11.9,23.5z M14.8,29.4c0.4-0.4,0.9-0.8,1.4-1.1c0.4,1.2,1,2.2,1.7,2.9C16.7,30.9,15.7,30.2,14.8,29.4z M20.2,31.7C18.9,31.4,17.8,30,17,28 c1-0.5,2.1-0.7,3.2-0.8V31.7z M20.2,26.2c-1.2,0.1-2.4,0.3-3.4,0.8c-0.3-1.1-0.5-2.3-0.5-3.6h4v2.8H20.2z M20.2,22.5h-4 c0-0.6,0.1-1.2,0.2-1.8h3.8V22.5z M21.1,31.7v-4.5c1.1,0.1,2.2,0.3,3.2,0.8C23.5,30,22.4,31.4,21.1,31.7z M25,23.5 c0,1.3-0.2,2.5-0.5,3.6c-1.1-0.5-2.2-0.8-3.4-0.8v-2.8C21.1,23.5,25,23.5,25,23.5z M21.1,22.5v-1.8h3.8c0.1,0.6,0.1,1.2,0.2,1.8 H21.1z M23.4,31.2c0.7-0.7,1.2-1.7,1.7-2.9c0.5,0.3,1,0.7,1.4,1.1C25.6,30.2,24.5,30.9,23.4,31.2z M27.1,28.8 c-0.5-0.5-1.1-0.9-1.8-1.3c0.3-1.2,0.5-2.6,0.6-4h3.4C29.2,25.4,28.4,27.3,27.1,28.8z M26,22.5c0-0.6-0.1-1.2-0.1-1.8H29 c0.2,0.6,0.3,1.2,0.3,1.8H26z M32.1,19.8H13.8v-5.5h18.3V19.8z M17.4,19l0.4-1.2l0.4,1.2H19l1.1-3.7l-0.9-0.2l-0.6,2.2l-0.4-1.1 h-0.9L17,17.3l-0.7-2.2l-0.8,0.2l1,3.7H17.4z M22.5,19l0.4-1.2l0.4,1.2h0.9l1-3.7l-0.8-0.2l-0.7,2.2l-0.3-1.1h-0.9l-0.4,1.1 l-0.6-2.2l-0.9,0.2l1.1,3.7 M27.7,19l0.4-1.2l0.3,1.2h0.9l1.1-3.7l-0.9-0.2l-0.7,2.2l-0.3-1.1h-0.9l-0.3,1.1l-0.7-2.2l-0.9,0.2 l1.1,3.7"
    },
    {//9
      sitio:"Whatssap",
      url:"https://wa.me/",
      path:"M29.8,14.2C27.7,12.1,25,11,22,11c-6,0-11,4.9-11,10.9c0,1.9,0.5,3.8,1.5,5.5L11,33l5.8-1.5 c1.6,0.9,3.4,1.3,5.2,1.3h0c6,0,11-4.9,11-10.9C33,19,31.9,16.3,29.8,14.2 M22,31L22,31c-1.6,0-3.2-0.4-4.6-1.3l-0.3-0.2l-3.4,0.9	l0.9-3.3l-0.2-0.3c-0.9-1.4-1.4-3.1-1.4-4.8c0-5,4.1-9.1,9.1-9.1c2.4,0,4.7,0.9,6.4,2.7c1.7,1.7,2.7,4,2.7,6.4	C31.1,26.9,27.1,31,22,31 M27,24.2c-0.3-0.1-1.6-0.8-1.9-0.9c-0.3-0.1-0.4-0.1-0.6,0.1c-0.2,0.3-0.7,0.9-0.9,1.1	c-0.2,0.2-0.3,0.2-0.6,0.1c-0.3-0.1-1.2-0.4-2.2-1.4c-0.8-0.7-1.4-1.6-1.5-1.9c-0.2-0.3,0-0.4,0.1-0.6c0.1-0.1,0.3-0.3,0.4-0.5	c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.2,0-0.3,0-0.5c-0.1-0.1-0.6-1.5-0.8-2c-0.2-0.5-0.4-0.5-0.6-0.5c-0.2,0-0.3,0-0.5,0	c-0.2,0-0.5,0.1-0.7,0.3c-0.3,0.3-1,0.9-1,2.3s1,2.6,1.1,2.8c0.1,0.2,1.9,2.9,4.7,4.1c0.7,0.3,1.2,0.4,1.6,0.6	c0.7,0.2,1.3,0.2,1.7,0.1c0.5-0.1,1.6-0.7,1.8-1.3c0.2-0.6,0.2-1.2,0.2-1.3C27.5,24.4,27.3,24.3,27,24.2"
    },
    {//10
      sitio:"YouTube",
      url:"https://www.youtube.com/channel/",
      path:"M32,25.5641799 L32,18.4358201 C32,18.4358201 32,15 28.5533866,15 L15.4454374,15 C15.4454374,15 12,15 12,18.4358201 L12,25.5641799 C12,25.5641799 12,29 15.4454374,29 L28.5533866,29 C28.5533866,29 32,29 32,25.5641799 M25.8828786,22.009964 L19.3353716,25.8431717 L19.3353716,18.175584 L25.8828786,22.009964"
    }
  ]
  
}

