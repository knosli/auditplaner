// ═══ CONSTANTS ═══
const SK='anliker_v4';
const DEPT_MAP={'TB':'Tiefbau Luzern','EB_LU':'Erneuerungsbau Luzern','HB_LU':'Hochbau Luzern','EB_ZH':'Erneuerungsbau Zürich','HB_ZH':'Hochbau Zürich','HB_ML':'Hochbau Mittelland','ABD':'Abdichtungen','BS':'Niederlassung Basel','LAN':'Niederlassung Langenthal','OLT':'Niederlassung Olten','WH':'Niederlassung Winterthur','LW':'Läderrach Weibel AG','IB':'Interbohr AG','ASP':'Anliker Spezialitäten AG','TT':'Terratech AG','GU':'Generalunternehmung'};
// Werkhof-Reiter: nur '12 WH' wird als Werkhof erkannt
const WH_SHEET_NAMES=['12 WH','12WH','12WH ','WH'];
// Diese Reiter werden IMMER nur gezählt (keine Baustellen, nur Auditor-Gutschrift)
const GHOST_SHEETS=['14 IB','14IB','15 ASP','15ASP','IB','ASP'];
const ALL_DEPTS=['Tiefbau Luzern','Erneuerungsbau Luzern','Hochbau Luzern','Erneuerungsbau Zürich','Hochbau Zürich','Hochbau Mittelland','Abdichtungen','Niederlassung Basel','Niederlassung Langenthal','Niederlassung Olten','Niederlassung Winterthur','Läderrach Weibel AG','Interbohr AG','Anliker Spezialitäten AG','Terratech AG','Generalunternehmung','Werkhöfe'];
const AC=['#EF4444','#D97706','#7C3AED','#EC4899','#059669','#DC2626','#9333EA','#B45309'];
let persons=JSON.parse(localStorage.getItem('anliker_persons')||'[]');
let beratPlan=JSON.parse(localStorage.getItem('anliker_berat_plan')||'[]');
// beratPlan: [{id, bsId, date, auditor, note}]
let auditorMeta=JSON.parse(localStorage.getItem('anliker_aud_meta')||'{}');
// auditorMeta[name] = {title, sollAudits, qms, ums, ams}
function saveAudMeta(){localStorage.setItem('anliker_aud_meta',JSON.stringify(auditorMeta));saveNow();}
let auditorColors=JSON.parse(localStorage.getItem('auditorColors')||'{}');
function aC(a){return auditorColors[a]||AC[auditors.indexOf(a)%AC.length]||'#6366F1';}
function saveAudColor(name,col){
  auditorColors[name]=col;
  localStorage.setItem('auditorColors',JSON.stringify(auditorColors));
  renderAudTags();renderAuditors();
  // Sync to Supabase so all users see same colors
  save();
}
const DC={'Tiefbau Luzern':'#1D4ED8','Erneuerungsbau Luzern':'#0369A1','Hochbau Luzern':'#0F766E','Erneuerungsbau Zürich':'#15803D','Hochbau Zürich':'#16A34A','Hochbau Mittelland':'#4D7C0F','Abdichtungen':'#7E22CE','Niederlassung Basel':'#BE185D','Niederlassung Langenthal':'#B91C1C','Niederlassung Olten':'#C2410C','Niederlassung Winterthur':'#D97706','Läderrach Weibel AG':'#5B21B6','Interbohr AG':'#0F766E','Anliker Spezialitäten AG':'#854D0E','Terratech AG':'#374151','Generalunternehmung':'#44403C'};
const AUDITOR_CODES={'ag':'Alain Groelly','mk':'Matthias Knotz','rr':'René Rottenberger','nm':'Niklaus Meier'};
const PLZ={3000:{lat:46.948,lng:7.447},3005:{lat:46.951,lng:7.457},3006:{lat:46.944,lng:7.463},3007:{lat:46.943,lng:7.437},3008:{lat:46.938,lng:7.428},3010:{lat:46.951,lng:7.442},3012:{lat:46.955,lng:7.425},3013:{lat:46.958,lng:7.452},3014:{lat:46.933,lng:7.422},3018:{lat:46.934,lng:7.394},3027:{lat:46.928,lng:7.371},3052:{lat:46.969,lng:7.479},3053:{lat:46.972,lng:7.494},3065:{lat:46.987,lng:7.537},3072:{lat:46.930,lng:7.491},3073:{lat:46.922,lng:7.499},3074:{lat:46.913,lng:7.496},3076:{lat:46.903,lng:7.474},3084:{lat:46.912,lng:7.524},3098:{lat:46.876,lng:7.479},3110:{lat:46.878,lng:7.559},3122:{lat:46.891,lng:7.553},3123:{lat:46.882,lng:7.534},3124:{lat:46.894,lng:7.534},3125:{lat:46.896,lng:7.511},3127:{lat:46.866,lng:7.524},3132:{lat:46.862,lng:7.553},3172:{lat:46.873,lng:7.433},3174:{lat:46.866,lng:7.413},3175:{lat:46.861,lng:7.452},3176:{lat:46.843,lng:7.424},3177:{lat:46.831,lng:7.439},3178:{lat:46.826,lng:7.455},3179:{lat:46.820,lng:7.422},3182:{lat:46.856,lng:7.482},3184:{lat:46.838,lng:7.487},3185:{lat:46.840,lng:7.500},3186:{lat:46.849,lng:7.511},3202:{lat:46.990,lng:7.400},3203:{lat:46.994,lng:7.383},3204:{lat:47.007,lng:7.381},3205:{lat:47.013,lng:7.391},3206:{lat:47.018,lng:7.401},3207:{lat:47.024,lng:7.412},3208:{lat:47.009,lng:7.408},3210:{lat:46.998,lng:7.431},3212:{lat:46.975,lng:7.414},3213:{lat:46.970,lng:7.398},3214:{lat:46.964,lng:7.380},3215:{lat:46.968,lng:7.367},3216:{lat:46.957,lng:7.349},3250:{lat:47.138,lng:7.243},3251:{lat:47.131,lng:7.266},3252:{lat:47.128,lng:7.238},3253:{lat:47.121,lng:7.243},3254:{lat:47.132,lng:7.228},3255:{lat:47.144,lng:7.215},3256:{lat:47.150,lng:7.232},3257:{lat:47.141,lng:7.204},3270:{lat:47.055,lng:7.173},3271:{lat:47.047,lng:7.162},3272:{lat:47.060,lng:7.148},3273:{lat:47.038,lng:7.157},3274:{lat:47.044,lng:7.144},3280:{lat:46.995,lng:7.158},3282:{lat:46.998,lng:7.131},3283:{lat:47.006,lng:7.140},3284:{lat:47.009,lng:7.156},3285:{lat:47.018,lng:7.169},3286:{lat:47.019,lng:7.150},3292:{lat:47.067,lng:7.195},3293:{lat:47.060,lng:7.185},3294:{lat:47.047,lng:7.179},3295:{lat:47.041,lng:7.187},
4000:{lat:47.557,lng:7.593},4001:{lat:47.557,lng:7.593},4002:{lat:47.557,lng:7.593},4003:{lat:47.551,lng:7.587},4004:{lat:47.551,lng:7.587},4005:{lat:47.561,lng:7.600},4006:{lat:47.565,lng:7.601},4009:{lat:47.543,lng:7.587},4010:{lat:47.557,lng:7.593},4012:{lat:47.561,lng:7.582},4013:{lat:47.563,lng:7.578},4020:{lat:47.556,lng:7.617},4021:{lat:47.556,lng:7.617},4023:{lat:47.549,lng:7.618},4024:{lat:47.546,lng:7.619},4025:{lat:47.542,lng:7.618},4026:{lat:47.537,lng:7.618},4027:{lat:47.532,lng:7.614},4028:{lat:47.527,lng:7.614},4029:{lat:47.522,lng:7.612},4031:{lat:47.568,lng:7.602},4032:{lat:47.568,lng:7.610},4033:{lat:47.574,lng:7.614},4034:{lat:47.576,lng:7.623},4035:{lat:47.575,lng:7.632},4036:{lat:47.572,lng:7.638},4037:{lat:47.566,lng:7.638},4038:{lat:47.560,lng:7.638},4040:{lat:47.555,lng:7.569},4041:{lat:47.547,lng:7.570},4042:{lat:47.543,lng:7.560},4051:{lat:47.552,lng:7.598},4052:{lat:47.557,lng:7.596},4053:{lat:47.549,lng:7.602},4054:{lat:47.545,lng:7.600},4055:{lat:47.541,lng:7.598},4056:{lat:47.568,lng:7.578},4057:{lat:47.571,lng:7.591},4058:{lat:47.580,lng:7.596},4059:{lat:47.544,lng:7.578},4060:{lat:47.569,lng:7.567},4061:{lat:47.573,lng:7.574},4062:{lat:47.578,lng:7.567},4063:{lat:47.580,lng:7.574},4070:{lat:47.563,lng:7.649},4075:{lat:47.552,lng:7.649},4076:{lat:47.546,lng:7.656},4101:{lat:47.522,lng:7.598},4102:{lat:47.518,lng:7.608},4103:{lat:47.513,lng:7.598},4104:{lat:47.505,lng:7.597},4105:{lat:47.497,lng:7.597},4106:{lat:47.491,lng:7.601},4107:{lat:47.487,lng:7.608},4108:{lat:47.482,lng:7.618},4109:{lat:47.478,lng:7.628},4112:{lat:47.462,lng:7.657},4114:{lat:47.449,lng:7.648},4115:{lat:47.439,lng:7.642},4116:{lat:47.430,lng:7.638},4117:{lat:47.420,lng:7.635},4118:{lat:47.416,lng:7.618},4119:{lat:47.412,lng:7.607},4123:{lat:47.530,lng:7.570},4124:{lat:47.530,lng:7.560},4125:{lat:47.521,lng:7.560},4126:{lat:47.514,lng:7.562},4127:{lat:47.505,lng:7.563},4128:{lat:47.497,lng:7.572},4129:{lat:47.490,lng:7.570},4132:{lat:47.515,lng:7.543},4133:{lat:47.508,lng:7.535},4142:{lat:47.508,lng:7.618},4143:{lat:47.500,lng:7.625},4144:{lat:47.493,lng:7.635},4145:{lat:47.488,lng:7.648},4146:{lat:47.480,lng:7.651},4147:{lat:47.476,lng:7.664},4148:{lat:47.469,lng:7.669},4153:{lat:47.549,lng:7.611},4500:{lat:47.208,lng:7.533},4501:{lat:47.208,lng:7.533},4502:{lat:47.202,lng:7.542},4503:{lat:47.194,lng:7.548},4512:{lat:47.185,lng:7.561},4513:{lat:47.177,lng:7.569},4514:{lat:47.170,lng:7.578},4515:{lat:47.160,lng:7.582},4522:{lat:47.206,lng:7.518},4523:{lat:47.196,lng:7.511},4524:{lat:47.188,lng:7.503},4525:{lat:47.179,lng:7.494},4526:{lat:47.171,lng:7.484},4528:{lat:47.196,lng:7.575},4532:{lat:47.214,lng:7.562},4533:{lat:47.220,lng:7.553},4534:{lat:47.226,lng:7.543},4535:{lat:47.230,lng:7.533},4536:{lat:47.235,lng:7.523},4537:{lat:47.238,lng:7.511},4538:{lat:47.242,lng:7.500},4539:{lat:47.246,lng:7.488},4542:{lat:47.254,lng:7.476},4543:{lat:47.261,lng:7.466},4552:{lat:47.188,lng:7.510},4553:{lat:47.180,lng:7.513},4554:{lat:47.172,lng:7.515},4556:{lat:47.165,lng:7.514},4557:{lat:47.158,lng:7.519},4558:{lat:47.150,lng:7.521},4562:{lat:47.143,lng:7.516},4563:{lat:47.136,lng:7.511},4564:{lat:47.129,lng:7.507},4565:{lat:47.123,lng:7.502},4566:{lat:47.116,lng:7.498},4571:{lat:47.109,lng:7.491},4572:{lat:47.102,lng:7.487},4573:{lat:47.096,lng:7.480},4574:{lat:47.090,lng:7.474},4575:{lat:47.083,lng:7.468},4576:{lat:47.077,lng:7.461},4577:{lat:47.070,lng:7.455},4578:{lat:47.064,lng:7.449},4579:{lat:47.058,lng:7.442},4580:{lat:47.051,lng:7.436},4581:{lat:47.045,lng:7.429},4582:{lat:47.039,lng:7.422},4583:{lat:47.032,lng:7.416},4584:{lat:47.026,lng:7.409},4585:{lat:47.019,lng:7.402},4586:{lat:47.013,lng:7.395},4587:{lat:47.006,lng:7.388},4588:{lat:47.000,lng:7.381},4600:{lat:47.368,lng:7.904},4601:{lat:47.368,lng:7.904},4603:{lat:47.361,lng:7.896},4604:{lat:47.353,lng:7.892},4605:{lat:47.345,lng:7.895},4612:{lat:47.338,lng:7.896},4613:{lat:47.330,lng:7.896},4614:{lat:47.322,lng:7.895},4615:{lat:47.315,lng:7.894},4616:{lat:47.307,lng:7.893},4617:{lat:47.300,lng:7.891},4618:{lat:47.292,lng:7.890},4621:{lat:47.374,lng:7.913},4622:{lat:47.381,lng:7.920},4623:{lat:47.389,lng:7.925},4624:{lat:47.396,lng:7.931},4625:{lat:47.402,lng:7.939},4626:{lat:47.409,lng:7.945},4627:{lat:47.415,lng:7.952},4628:{lat:47.421,lng:7.958},4629:{lat:47.427,lng:7.964},4632:{lat:47.433,lng:7.971},4633:{lat:47.439,lng:7.977},4634:{lat:47.444,lng:7.983},4702:{lat:47.313,lng:7.862},4703:{lat:47.305,lng:7.853},4704:{lat:47.296,lng:7.851},4710:{lat:47.285,lng:7.862},4800:{lat:47.323,lng:7.992},4802:{lat:47.319,lng:7.978},4803:{lat:47.313,lng:7.965},4805:{lat:47.308,lng:7.953},4806:{lat:47.302,lng:7.940},4812:{lat:47.296,lng:7.927},4813:{lat:47.291,lng:7.916},4814:{lat:47.285,lng:7.905},4852:{lat:47.318,lng:8.014},4853:{lat:47.327,lng:8.021},4856:{lat:47.332,lng:8.030},4900:{lat:47.139,lng:7.946},4901:{lat:47.139,lng:7.946},4902:{lat:47.132,lng:7.952},4911:{lat:47.126,lng:7.957},4912:{lat:47.119,lng:7.962},4913:{lat:47.113,lng:7.967},4914:{lat:47.106,lng:7.972},4915:{lat:47.099,lng:7.977},4916:{lat:47.093,lng:7.982},4917:{lat:47.086,lng:7.987},4919:{lat:47.079,lng:7.992},4922:{lat:47.073,lng:7.997},4923:{lat:47.066,lng:8.001},4924:{lat:47.060,lng:8.006},4932:{lat:47.146,lng:7.934},4933:{lat:47.153,lng:7.923},4934:{lat:47.160,lng:7.912},4935:{lat:47.167,lng:7.901},4936:{lat:47.173,lng:7.890},4937:{lat:47.180,lng:7.879},4938:{lat:47.186,lng:7.869},4942:{lat:47.192,lng:7.858},4943:{lat:47.198,lng:7.847},4944:{lat:47.204,lng:7.836},4950:{lat:47.210,lng:7.826},4952:{lat:47.216,lng:7.815},4953:{lat:47.222,lng:7.804},4954:{lat:47.228,lng:7.793},4955:{lat:47.234,lng:7.782},
// Luzern Region
6002:{lat:47.048,lng:8.306},6003:{lat:47.048,lng:8.306},6004:{lat:47.053,lng:8.3},6005:{lat:47.036,lng:8.313},6006:{lat:47.058,lng:8.326},6010:{lat:47.038,lng:8.288},6012:{lat:47.031,lng:8.280},6013:{lat:47.024,lng:8.271},6014:{lat:47.017,lng:8.263},6015:{lat:47.010,lng:8.255},6016:{lat:47.003,lng:8.247},6017:{lat:46.996,lng:8.240},6018:{lat:46.989,lng:8.232},6019:{lat:46.982,lng:8.225},6020:{lat:47.072,lng:8.29},6021:{lat:47.07,lng:8.306},6022:{lat:47.064,lng:8.297},6023:{lat:47.083,lng:8.279},6024:{lat:47.076,lng:8.271},6025:{lat:47.069,lng:8.263},6026:{lat:47.062,lng:8.255},6027:{lat:47.055,lng:8.248},6028:{lat:47.048,lng:8.240},6030:{lat:47.056,lng:8.259},6032:{lat:47.087,lng:8.26},6033:{lat:47.101,lng:8.268},6034:{lat:47.094,lng:8.260},6035:{lat:47.087,lng:8.252},6036:{lat:47.080,lng:8.244},6037:{lat:47.073,lng:8.236},6038:{lat:47.066,lng:8.229},6039:{lat:47.059,lng:8.221},6042:{lat:47.055,lng:8.286},6043:{lat:47.048,lng:8.278},6044:{lat:47.041,lng:8.270},6045:{lat:47.034,lng:8.263},6046:{lat:47.027,lng:8.255},6047:{lat:47.020,lng:8.247},6048:{lat:47.013,lng:8.240},6049:{lat:47.006,lng:8.232},6052:{lat:47.06,lng:8.352},6053:{lat:47.053,lng:8.344},6055:{lat:47.046,lng:8.337},6056:{lat:47.039,lng:8.329},6057:{lat:47.032,lng:8.322},6060:{lat:46.982,lng:8.346},6061:{lat:46.975,lng:8.338},6062:{lat:46.968,lng:8.331},6063:{lat:46.961,lng:8.323},6064:{lat:46.954,lng:8.316},6065:{lat:46.947,lng:8.308},6066:{lat:46.940,lng:8.301},6067:{lat:46.933,lng:8.293},6068:{lat:46.926,lng:8.286},6072:{lat:46.974,lng:8.362},6073:{lat:46.981,lng:8.370},6074:{lat:46.989,lng:8.368},6075:{lat:46.996,lng:8.376},6076:{lat:47.003,lng:8.384},6078:{lat:47.010,lng:8.392},6080:{lat:46.968,lng:8.378},6082:{lat:46.961,lng:8.386},6083:{lat:46.954,lng:8.394},6084:{lat:46.947,lng:8.402},6085:{lat:46.940,lng:8.410},6086:{lat:46.933,lng:8.418},6102:{lat:47.078,lng:8.285},6103:{lat:47.085,lng:8.293},6104:{lat:47.092,lng:8.301},6105:{lat:47.099,lng:8.309},6106:{lat:47.106,lng:8.317},6107:{lat:47.113,lng:8.325},6108:{lat:47.120,lng:8.333},6110:{lat:47.072,lng:8.159},6112:{lat:47.079,lng:8.167},6113:{lat:47.086,lng:8.175},6114:{lat:47.093,lng:8.183},6122:{lat:47.102,lng:8.142},6123:{lat:47.109,lng:8.150},6125:{lat:47.116,lng:8.158},6126:{lat:47.123,lng:8.166},6130:{lat:47.126,lng:8.174},6132:{lat:47.133,lng:8.182},6133:{lat:47.140,lng:8.190},6142:{lat:47.147,lng:8.198},6143:{lat:47.154,lng:8.206},6144:{lat:47.161,lng:8.214},6145:{lat:47.168,lng:8.222},6146:{lat:47.175,lng:8.230},6147:{lat:47.182,lng:8.238},6148:{lat:47.189,lng:8.246},6152:{lat:47.196,lng:8.254},6153:{lat:47.203,lng:8.262},6154:{lat:47.210,lng:8.270},6156:{lat:47.217,lng:8.278},6162:{lat:47.224,lng:8.286},6163:{lat:47.231,lng:8.294},6166:{lat:47.238,lng:8.302},6167:{lat:47.245,lng:8.310},6170:{lat:47.252,lng:8.318},6173:{lat:47.259,lng:8.326},6174:{lat:47.266,lng:8.334},6182:{lat:47.273,lng:8.342},6192:{lat:47.280,lng:8.350},6196:{lat:47.287,lng:8.358},6197:{lat:47.294,lng:8.366},6203:{lat:47.108,lng:8.120},6204:{lat:47.115,lng:8.128},6205:{lat:47.122,lng:8.136},6206:{lat:47.102,lng:8.126},6207:{lat:47.109,lng:8.134},6208:{lat:47.116,lng:8.142},6210:{lat:47.123,lng:8.103},6211:{lat:47.130,lng:8.111},6212:{lat:47.137,lng:8.119},6213:{lat:47.144,lng:8.127},6214:{lat:47.151,lng:8.135},6215:{lat:47.158,lng:8.143},6216:{lat:47.165,lng:8.151},6217:{lat:47.172,lng:8.159},6218:{lat:47.179,lng:8.167},6221:{lat:47.186,lng:8.175},6222:{lat:47.193,lng:8.183},6231:{lat:47.200,lng:8.191},6232:{lat:47.207,lng:8.199},6233:{lat:47.214,lng:8.207},6234:{lat:47.221,lng:8.215},6235:{lat:47.228,lng:8.223},6236:{lat:47.235,lng:8.231},6242:{lat:47.242,lng:8.239},6243:{lat:47.249,lng:8.247},6244:{lat:47.256,lng:8.255},6245:{lat:47.263,lng:8.263},6246:{lat:47.270,lng:8.271},6247:{lat:47.277,lng:8.279},6248:{lat:47.284,lng:8.287},6252:{lat:47.291,lng:8.295},6253:{lat:47.298,lng:8.303},6260:{lat:47.305,lng:8.311},6262:{lat:47.312,lng:8.319},6263:{lat:47.319,lng:8.327},6264:{lat:47.326,lng:8.335},6265:{lat:47.333,lng:8.343},6274:{lat:47.340,lng:8.351},6275:{lat:47.347,lng:8.359},6276:{lat:47.354,lng:8.367},6277:{lat:47.361,lng:8.375},6280:{lat:47.185,lng:8.232},6281:{lat:47.192,lng:8.240},6283:{lat:47.199,lng:8.248},6284:{lat:47.206,lng:8.256},6285:{lat:47.213,lng:8.264},6286:{lat:47.220,lng:8.272},6287:{lat:47.227,lng:8.280},6288:{lat:47.234,lng:8.288},6289:{lat:47.241,lng:8.296},6294:{lat:47.248,lng:8.304},6295:{lat:47.255,lng:8.312},6300:{lat:47.178,lng:8.478},6301:{lat:47.185,lng:8.486},6302:{lat:47.192,lng:8.494},6303:{lat:47.199,lng:8.502},6304:{lat:47.206,lng:8.510},6312:{lat:47.213,lng:8.518},6313:{lat:47.154,lng:8.512},6314:{lat:47.161,lng:8.520},6315:{lat:47.124,lng:8.527},6316:{lat:47.131,lng:8.535},6317:{lat:47.138,lng:8.543},6318:{lat:47.145,lng:8.551},6319:{lat:47.152,lng:8.559},6322:{lat:47.159,lng:8.567},6323:{lat:47.166,lng:8.575},6331:{lat:47.153,lng:8.546},6332:{lat:47.139,lng:8.543},6333:{lat:47.146,lng:8.551},6340:{lat:47.173,lng:8.559},6341:{lat:47.180,lng:8.567},6343:{lat:47.187,lng:8.575},6344:{lat:47.194,lng:8.583},6345:{lat:47.201,lng:8.591},6346:{lat:47.208,lng:8.599},6353:{lat:47.215,lng:8.607},6354:{lat:47.222,lng:8.615},6356:{lat:47.229,lng:8.623},6362:{lat:46.983,lng:8.467},6363:{lat:46.990,lng:8.475},6365:{lat:46.997,lng:8.483},6370:{lat:46.960,lng:8.444},6371:{lat:46.967,lng:8.452},6372:{lat:46.974,lng:8.460},6373:{lat:46.981,lng:8.468},6374:{lat:46.988,lng:8.476},6375:{lat:46.995,lng:8.484},6376:{lat:47.002,lng:8.492},6377:{lat:47.009,lng:8.500},6382:{lat:47.016,lng:8.508},6383:{lat:47.023,lng:8.516},6386:{lat:47.030,lng:8.524},6387:{lat:47.037,lng:8.532},6388:{lat:47.044,lng:8.540},6390:{lat:46.971,lng:8.536},6391:{lat:46.978,lng:8.544},6402:{lat:47.022,lng:8.552},6403:{lat:47.029,lng:8.560},6404:{lat:47.036,lng:8.568},6405:{lat:47.043,lng:8.576},6406:{lat:47.050,lng:8.584},6410:{lat:47.002,lng:8.5},6411:{lat:47.009,lng:8.508},6412:{lat:47.016,lng:8.516},6413:{lat:47.023,lng:8.524},6414:{lat:47.030,lng:8.532},6415:{lat:47.037,lng:8.540},6416:{lat:47.044,lng:8.548},6417:{lat:47.051,lng:8.556},6418:{lat:47.058,lng:8.564},6422:{lat:47.065,lng:8.572},6423:{lat:47.072,lng:8.580},6424:{lat:47.079,lng:8.588},6430:{lat:46.998,lng:8.648},6431:{lat:47.005,lng:8.656},6432:{lat:47.012,lng:8.664},6433:{lat:47.019,lng:8.672},6434:{lat:47.026,lng:8.680},6436:{lat:47.033,lng:8.688},6438:{lat:46.972,lng:8.574},6439:{lat:46.979,lng:8.582},6440:{lat:46.996,lng:8.65},6441:{lat:47.003,lng:8.658},6442:{lat:47.010,lng:8.666},6443:{lat:47.017,lng:8.674},6452:{lat:46.952,lng:8.622},6453:{lat:46.959,lng:8.630},6454:{lat:46.966,lng:8.638},6455:{lat:46.973,lng:8.646},6460:{lat:46.979,lng:8.490},6461:{lat:46.986,lng:8.498},6462:{lat:46.993,lng:8.506},6463:{lat:47.000,lng:8.514},6464:{lat:47.007,lng:8.522},6465:{lat:47.014,lng:8.530},6466:{lat:47.021,lng:8.538},6467:{lat:47.028,lng:8.546},6468:{lat:47.035,lng:8.554},6469:{lat:47.042,lng:8.562},6472:{lat:46.940,lng:8.470},6473:{lat:46.947,lng:8.478},6474:{lat:46.954,lng:8.486},6475:{lat:46.961,lng:8.494},6476:{lat:46.968,lng:8.502},6482:{lat:46.749,lng:8.623},6484:{lat:46.756,lng:8.631},6485:{lat:46.763,lng:8.639},6486:{lat:46.770,lng:8.647},6487:{lat:46.777,lng:8.655},6488:{lat:46.784,lng:8.663},6490:{lat:46.873,lng:8.590},6491:{lat:46.880,lng:8.598},6493:{lat:46.887,lng:8.606},6494:{lat:46.894,lng:8.614},6500:{lat:46.317,lng:9.002},6501:{lat:46.324,lng:9.010},6503:{lat:46.331,lng:9.018},6512:{lat:46.338,lng:9.026},6513:{lat:46.345,lng:9.034},6514:{lat:46.352,lng:9.042},6515:{lat:46.359,lng:9.050},6516:{lat:46.366,lng:9.058},6517:{lat:46.373,lng:9.066},6518:{lat:46.380,lng:9.074},6523:{lat:46.387,lng:9.082},6524:{lat:46.394,lng:9.090},6525:{lat:46.401,lng:9.098},6526:{lat:46.408,lng:9.106},6527:{lat:46.415,lng:9.114},6528:{lat:46.422,lng:9.122},6532:{lat:46.429,lng:9.130},6533:{lat:46.436,lng:9.138},6534:{lat:46.443,lng:9.146},
// Zürich Region - COMPLETE
8001:{lat:47.377,lng:8.542},8002:{lat:47.370,lng:8.536},8003:{lat:47.372,lng:8.53},8004:{lat:47.375,lng:8.525},8005:{lat:47.386,lng:8.525},8006:{lat:47.384,lng:8.542},8008:{lat:47.365,lng:8.561},8032:{lat:47.360,lng:8.556},8037:{lat:47.391,lng:8.516},8038:{lat:47.351,lng:8.534},8041:{lat:47.340,lng:8.536},8044:{lat:47.353,lng:8.568},8045:{lat:47.366,lng:8.502},8046:{lat:47.407,lng:8.499},8047:{lat:47.375,lng:8.491},8048:{lat:47.391,lng:8.489},8049:{lat:47.405,lng:8.494},8050:{lat:47.409,lng:8.544},8051:{lat:47.405,lng:8.554},8052:{lat:47.415,lng:8.541},8053:{lat:47.361,lng:8.581},8055:{lat:47.374,lng:8.512},8057:{lat:47.401,lng:8.549},8063:{lat:47.365,lng:8.516},8064:{lat:47.381,lng:8.498},8091:{lat:47.376,lng:8.549},8092:{lat:47.408,lng:8.508},8093:{lat:47.408,lng:8.508},
// Zürich Umland
8100:{lat:47.429,lng:8.477},8101:{lat:47.435,lng:8.485},8102:{lat:47.427,lng:8.468},8103:{lat:47.420,lng:8.462},8104:{lat:47.437,lng:8.457},8105:{lat:47.448,lng:8.446},8106:{lat:47.455,lng:8.452},8107:{lat:47.462,lng:8.459},8108:{lat:47.469,lng:8.465},8112:{lat:47.444,lng:8.436},8113:{lat:47.436,lng:8.430},8114:{lat:47.429,lng:8.424},8115:{lat:47.421,lng:8.417},8116:{lat:47.413,lng:8.411},8117:{lat:47.405,lng:8.405},8118:{lat:47.397,lng:8.399},8121:{lat:47.390,lng:8.393},8122:{lat:47.382,lng:8.387},8123:{lat:47.374,lng:8.381},8124:{lat:47.366,lng:8.375},8125:{lat:47.328,lng:8.605},8126:{lat:47.336,lng:8.611},8127:{lat:47.344,lng:8.617},8132:{lat:47.352,lng:8.623},8133:{lat:47.344,lng:8.605},8134:{lat:47.331,lng:8.523},8135:{lat:47.339,lng:8.530},8136:{lat:47.347,lng:8.536},8142:{lat:47.355,lng:8.542},8143:{lat:47.348,lng:8.519},8152:{lat:47.447,lng:8.507},8153:{lat:47.452,lng:8.513},8154:{lat:47.460,lng:8.518},8155:{lat:47.466,lng:8.525},8156:{lat:47.473,lng:8.532},8157:{lat:47.479,lng:8.539},8158:{lat:47.481,lng:8.505},8162:{lat:47.477,lng:8.471},8163:{lat:47.484,lng:8.478},8164:{lat:47.491,lng:8.484},8165:{lat:47.499,lng:8.490},8166:{lat:47.505,lng:8.496},8172:{lat:47.511,lng:8.503},8173:{lat:47.517,lng:8.508},8174:{lat:47.524,lng:8.515},8175:{lat:47.530,lng:8.521},8176:{lat:47.537,lng:8.528},8180:{lat:47.485,lng:8.461},8181:{lat:47.491,lng:8.468},8182:{lat:47.498,lng:8.474},8183:{lat:47.504,lng:8.481},8184:{lat:47.487,lng:8.496},8185:{lat:47.494,lng:8.503},8186:{lat:47.500,lng:8.509},8187:{lat:47.507,lng:8.516},8188:{lat:47.513,lng:8.522},8192:{lat:47.499,lng:8.507},8193:{lat:47.506,lng:8.513},8194:{lat:47.513,lng:8.520},8195:{lat:47.519,lng:8.527},8196:{lat:47.526,lng:8.533},8197:{lat:47.532,lng:8.540},8200:{lat:47.699,lng:8.632},8201:{lat:47.705,lng:8.638},8202:{lat:47.692,lng:8.626},8203:{lat:47.685,lng:8.620},8204:{lat:47.679,lng:8.615},8205:{lat:47.672,lng:8.609},8207:{lat:47.665,lng:8.603},8208:{lat:47.658,lng:8.597},8212:{lat:47.651,lng:8.591},8213:{lat:47.644,lng:8.586},8214:{lat:47.637,lng:8.580},8215:{lat:47.631,lng:8.574},8216:{lat:47.624,lng:8.568},8217:{lat:47.617,lng:8.562},8218:{lat:47.610,lng:8.556},8219:{lat:47.604,lng:8.551},8222:{lat:47.711,lng:8.643},8223:{lat:47.718,lng:8.650},8224:{lat:47.725,lng:8.656},8225:{lat:47.731,lng:8.662},8226:{lat:47.738,lng:8.668},8228:{lat:47.744,lng:8.675},8232:{lat:47.750,lng:8.681},8233:{lat:47.757,lng:8.687},8234:{lat:47.763,lng:8.693},8235:{lat:47.770,lng:8.699},8236:{lat:47.776,lng:8.705},8238:{lat:47.783,lng:8.711},8239:{lat:47.789,lng:8.718},8240:{lat:47.795,lng:8.724},8241:{lat:47.801,lng:8.730},8242:{lat:47.808,lng:8.736},8243:{lat:47.814,lng:8.742},8245:{lat:47.820,lng:8.748},8246:{lat:47.826,lng:8.754},8247:{lat:47.833,lng:8.760},8248:{lat:47.839,lng:8.766},8249:{lat:47.845,lng:8.773},8252:{lat:47.680,lng:8.632},8253:{lat:47.673,lng:8.626},8254:{lat:47.666,lng:8.620},8255:{lat:47.659,lng:8.614},8256:{lat:47.652,lng:8.608},8257:{lat:47.645,lng:8.602},8258:{lat:47.638,lng:8.597},8259:{lat:47.631,lng:8.591},8260:{lat:47.625,lng:8.585},8261:{lat:47.618,lng:8.579},8262:{lat:47.611,lng:8.573},8263:{lat:47.605,lng:8.567},8264:{lat:47.598,lng:8.561},8265:{lat:47.591,lng:8.556},8266:{lat:47.585,lng:8.550},8267:{lat:47.578,lng:8.544},8268:{lat:47.571,lng:8.538},8269:{lat:47.565,lng:8.532},8272:{lat:47.559,lng:8.526},8273:{lat:47.552,lng:8.520},8274:{lat:47.546,lng:8.514},8280:{lat:47.539,lng:8.509},8302:{lat:47.447,lng:8.521},8303:{lat:47.455,lng:8.527},8304:{lat:47.463,lng:8.533},8305:{lat:47.471,lng:8.539},8306:{lat:47.478,lng:8.546},8307:{lat:47.486,lng:8.552},8308:{lat:47.493,lng:8.558},8309:{lat:47.500,lng:8.565},8310:{lat:47.448,lng:8.531},8311:{lat:47.456,lng:8.537},8312:{lat:47.463,lng:8.543},8315:{lat:47.471,lng:8.550},8317:{lat:47.478,lng:8.556},8320:{lat:47.485,lng:8.562},8322:{lat:47.493,lng:8.568},8330:{lat:47.461,lng:8.540},8331:{lat:47.468,lng:8.547},8332:{lat:47.475,lng:8.553},8335:{lat:47.483,lng:8.559},8340:{lat:47.474,lng:8.575},8342:{lat:47.482,lng:8.582},8344:{lat:47.489,lng:8.588},8345:{lat:47.497,lng:8.594},8352:{lat:47.504,lng:8.600},8353:{lat:47.512,lng:8.607},8354:{lat:47.519,lng:8.613},8355:{lat:47.527,lng:8.619},8356:{lat:47.534,lng:8.625},8357:{lat:47.542,lng:8.632},8360:{lat:47.518,lng:8.631},8362:{lat:47.526,lng:8.638},8363:{lat:47.533,lng:8.644},8370:{lat:47.541,lng:8.650},8371:{lat:47.548,lng:8.656},8372:{lat:47.556,lng:8.662},8374:{lat:47.563,lng:8.669},8376:{lat:47.571,lng:8.675},8400:{lat:47.501,lng:8.724},8401:{lat:47.494,lng:8.724},8402:{lat:47.504,lng:8.731},8403:{lat:47.497,lng:8.731},8404:{lat:47.490,lng:8.731},8405:{lat:47.484,lng:8.738},8406:{lat:47.477,lng:8.744},8407:{lat:47.470,lng:8.750},8408:{lat:47.463,lng:8.757},8409:{lat:47.457,lng:8.763},8412:{lat:47.450,lng:8.770},8413:{lat:47.443,lng:8.776},8414:{lat:47.436,lng:8.782},8415:{lat:47.429,lng:8.789},8416:{lat:47.423,lng:8.795},8418:{lat:47.416,lng:8.801},8421:{lat:47.516,lng:8.731},8422:{lat:47.523,lng:8.738},8424:{lat:47.530,lng:8.744},8425:{lat:47.537,lng:8.750},8426:{lat:47.543,lng:8.757},8427:{lat:47.550,lng:8.763},8428:{lat:47.557,lng:8.769},8442:{lat:47.542,lng:8.751},8444:{lat:47.535,lng:8.745},8447:{lat:47.529,lng:8.739},8450:{lat:47.522,lng:8.732},8451:{lat:47.528,lng:8.726},8452:{lat:47.535,lng:8.720},8453:{lat:47.541,lng:8.714},8454:{lat:47.548,lng:8.707},8455:{lat:47.555,lng:8.701},8457:{lat:47.561,lng:8.695},8458:{lat:47.568,lng:8.689},8459:{lat:47.574,lng:8.682},8460:{lat:47.581,lng:8.676},8461:{lat:47.587,lng:8.670},8462:{lat:47.594,lng:8.664},8463:{lat:47.600,lng:8.657},8464:{lat:47.607,lng:8.651},8465:{lat:47.613,lng:8.645},8466:{lat:47.620,lng:8.639},8467:{lat:47.627,lng:8.632},8468:{lat:47.633,lng:8.626},8471:{lat:47.640,lng:8.620},8472:{lat:47.646,lng:8.614},8474:{lat:47.653,lng:8.607},8475:{lat:47.660,lng:8.601},8476:{lat:47.666,lng:8.595},8477:{lat:47.673,lng:8.589},8478:{lat:47.679,lng:8.582},8479:{lat:47.686,lng:8.576},8482:{lat:47.693,lng:8.570},8483:{lat:47.699,lng:8.564},8484:{lat:47.706,lng:8.557},8486:{lat:47.712,lng:8.551},8487:{lat:47.719,lng:8.545},8488:{lat:47.726,lng:8.539},8489:{lat:47.732,lng:8.532},8492:{lat:47.739,lng:8.526},8493:{lat:47.745,lng:8.520},8494:{lat:47.752,lng:8.513},8495:{lat:47.758,lng:8.507},8496:{lat:47.765,lng:8.501},8497:{lat:47.772,lng:8.494},8498:{lat:47.778,lng:8.488},8499:{lat:47.785,lng:8.482},8500:{lat:47.629,lng:8.899},8501:{lat:47.622,lng:8.892},8505:{lat:47.635,lng:8.906},8506:{lat:47.641,lng:8.912},8507:{lat:47.647,lng:8.919},8508:{lat:47.654,lng:8.925},8512:{lat:47.660,lng:8.931},8513:{lat:47.666,lng:8.938},8514:{lat:47.673,lng:8.944},8515:{lat:47.679,lng:8.950},8536:{lat:47.641,lng:8.981},8537:{lat:47.648,lng:8.987},8546:{lat:47.634,lng:8.968},8547:{lat:47.627,lng:8.962},8548:{lat:47.620,lng:8.956},8552:{lat:47.612,lng:8.950},8553:{lat:47.606,lng:8.944},8554:{lat:47.599,lng:8.937},8555:{lat:47.592,lng:8.931},8556:{lat:47.585,lng:8.925},8558:{lat:47.578,lng:8.918},8560:{lat:47.571,lng:8.912},8561:{lat:47.565,lng:8.906},8564:{lat:47.558,lng:8.900},8565:{lat:47.551,lng:8.893},8566:{lat:47.544,lng:8.887},8570:{lat:47.538,lng:8.881},8572:{lat:47.531,lng:8.875},8573:{lat:47.524,lng:8.868},8574:{lat:47.517,lng:8.862},8575:{lat:47.511,lng:8.856},8576:{lat:47.504,lng:8.849},8577:{lat:47.497,lng:8.843},8578:{lat:47.490,lng:8.837},8580:{lat:47.484,lng:8.831},8581:{lat:47.477,lng:8.824},8582:{lat:47.470,lng:8.818},8583:{lat:47.463,lng:8.812},8584:{lat:47.456,lng:8.805},8585:{lat:47.450,lng:8.799},8586:{lat:47.443,lng:8.793},8587:{lat:47.436,lng:8.787},8588:{lat:47.429,lng:8.780},8589:{lat:47.422,lng:8.774},8590:{lat:47.547,lng:8.919},8592:{lat:47.541,lng:8.913},8593:{lat:47.534,lng:8.907},8594:{lat:47.527,lng:8.900},8595:{lat:47.520,lng:8.894},8596:{lat:47.513,lng:8.888},8597:{lat:47.507,lng:8.882},8598:{lat:47.500,lng:8.875},8599:{lat:47.493,lng:8.869},8600:{lat:47.356,lng:8.671},8601:{lat:47.363,lng:8.678},8602:{lat:47.370,lng:8.684},8603:{lat:47.377,lng:8.690},8604:{lat:47.384,lng:8.697},8605:{lat:47.391,lng:8.703},8606:{lat:47.341,lng:8.719},8607:{lat:47.347,lng:8.726},8608:{lat:47.354,lng:8.732},8610:{lat:47.342,lng:8.722},8611:{lat:47.349,lng:8.729},8612:{lat:47.356,lng:8.735},8613:{lat:47.363,lng:8.741},8614:{lat:47.370,lng:8.748},8615:{lat:47.377,lng:8.754},8616:{lat:47.383,lng:8.760},8617:{lat:47.390,lng:8.766},8618:{lat:47.397,lng:8.773},8620:{lat:47.357,lng:8.741},8621:{lat:47.364,lng:8.748},8622:{lat:47.371,lng:8.754},8623:{lat:47.378,lng:8.761},8624:{lat:47.385,lng:8.767},8625:{lat:47.392,lng:8.773},8626:{lat:47.399,lng:8.780},8627:{lat:47.406,lng:8.786},8628:{lat:47.413,lng:8.792},8630:{lat:47.413,lng:8.798},8632:{lat:47.420,lng:8.805},8633:{lat:47.427,lng:8.811},8634:{lat:47.434,lng:8.817},8635:{lat:47.440,lng:8.824},8636:{lat:47.447,lng:8.830},8637:{lat:47.454,lng:8.836},8638:{lat:47.461,lng:8.843},8639:{lat:47.468,lng:8.849},8640:{lat:47.329,lng:8.798},8641:{lat:47.336,lng:8.804},8642:{lat:47.343,lng:8.810},8644:{lat:47.350,lng:8.817},8645:{lat:47.357,lng:8.823},8646:{lat:47.363,lng:8.829},8700:{lat:47.356,lng:8.723},8702:{lat:47.331,lng:8.714},8703:{lat:47.324,lng:8.708},8704:{lat:47.317,lng:8.702},8706:{lat:47.309,lng:8.696},8707:{lat:47.302,lng:8.689},8708:{lat:47.296,lng:8.683},8712:{lat:47.289,lng:8.678},8713:{lat:47.282,lng:8.672},8714:{lat:47.275,lng:8.666},8715:{lat:47.268,lng:8.660},8716:{lat:47.261,lng:8.654},8717:{lat:47.254,lng:8.648},8718:{lat:47.247,lng:8.642},8723:{lat:47.241,lng:8.636},8724:{lat:47.234,lng:8.630},8725:{lat:47.227,lng:8.624},8726:{lat:47.220,lng:8.617},8727:{lat:47.213,lng:8.611},8730:{lat:47.207,lng:8.605},8732:{lat:47.200,lng:8.599},8733:{lat:47.193,lng:8.593},8734:{lat:47.186,lng:8.587},8735:{lat:47.179,lng:8.581},8737:{lat:47.172,lng:8.575},8738:{lat:47.165,lng:8.568},8739:{lat:47.158,lng:8.562},8800:{lat:47.298,lng:8.717},8801:{lat:47.291,lng:8.710},8802:{lat:47.284,lng:8.704},8803:{lat:47.277,lng:8.698},8804:{lat:47.271,lng:8.693},8805:{lat:47.264,lng:8.687},8806:{lat:47.207,lng:8.712},8807:{lat:47.213,lng:8.718},8808:{lat:47.219,lng:8.725},8810:{lat:47.287,lng:8.673},8811:{lat:47.280,lng:8.667},8812:{lat:47.273,lng:8.661},8813:{lat:47.267,lng:8.655},8815:{lat:47.260,lng:8.649},8816:{lat:47.253,lng:8.643},8820:{lat:47.246,lng:8.637},8824:{lat:47.239,lng:8.631},8825:{lat:47.232,lng:8.625},8832:{lat:47.226,lng:8.619},8833:{lat:47.219,lng:8.613},8834:{lat:47.212,lng:8.607},8835:{lat:47.205,lng:8.601},8836:{lat:47.199,lng:8.595},8840:{lat:47.192,lng:8.589},8841:{lat:47.185,lng:8.582},8842:{lat:47.178,lng:8.576},8843:{lat:47.171,lng:8.570},8844:{lat:47.164,lng:8.564},8845:{lat:47.158,lng:8.558},8847:{lat:47.151,lng:8.551},8848:{lat:47.144,lng:8.545},8849:{lat:47.137,lng:8.539},8852:{lat:47.131,lng:8.533},8853:{lat:47.124,lng:8.527},8854:{lat:47.117,lng:8.521},8855:{lat:47.110,lng:8.515},8856:{lat:47.104,lng:8.509},8857:{lat:47.097,lng:8.502},8858:{lat:47.090,lng:8.496},8862:{lat:47.083,lng:8.490},8863:{lat:47.076,lng:8.484},8864:{lat:47.070,lng:8.478},8865:{lat:47.063,lng:8.471},8866:{lat:47.056,lng:8.465},8867:{lat:47.049,lng:8.459},8868:{lat:47.043,lng:8.453},8872:{lat:47.036,lng:8.447},8873:{lat:47.029,lng:8.441},8874:{lat:47.022,lng:8.434},8875:{lat:47.015,lng:8.428},8876:{lat:47.008,lng:8.422},8877:{lat:47.001,lng:8.416},8878:{lat:46.994,lng:8.409},8880:{lat:46.988,lng:8.403},8881:{lat:46.981,lng:8.397},8882:{lat:46.974,lng:8.391},8883:{lat:46.967,lng:8.385},8884:{lat:46.960,lng:8.378},8885:{lat:46.953,lng:8.372},8886:{lat:46.946,lng:8.366},8887:{lat:46.939,lng:8.360},8888:{lat:46.932,lng:8.353},8889:{lat:46.925,lng:8.347},8890:{lat:46.919,lng:8.341},8892:{lat:46.912,lng:8.335},8893:{lat:46.905,lng:8.329},8894:{lat:46.898,lng:8.322},8895:{lat:46.891,lng:8.316},8896:{lat:46.884,lng:8.310},8897:{lat:46.877,lng:8.304},8898:{lat:46.870,lng:8.297},8903:{lat:47.323,lng:8.495},8904:{lat:47.316,lng:8.489},8905:{lat:47.309,lng:8.483},8906:{lat:47.302,lng:8.477},8907:{lat:47.295,lng:8.471},8908:{lat:47.288,lng:8.465},8909:{lat:47.281,lng:8.459},8910:{lat:47.275,lng:8.453},8911:{lat:47.268,lng:8.447},8912:{lat:47.261,lng:8.441},8913:{lat:47.254,lng:8.434},8914:{lat:47.247,lng:8.428},8915:{lat:47.240,lng:8.422},8916:{lat:47.234,lng:8.416},8917:{lat:47.227,lng:8.410},8918:{lat:47.220,lng:8.404},8919:{lat:47.213,lng:8.397},8925:{lat:47.330,lng:8.488},8926:{lat:47.323,lng:8.481},8932:{lat:47.330,lng:8.481},8933:{lat:47.337,lng:8.487},8934:{lat:47.344,lng:8.494},8942:{lat:47.326,lng:8.503},8943:{lat:47.319,lng:8.496},8944:{lat:47.312,lng:8.490},8951:{lat:47.348,lng:8.500},8952:{lat:47.355,lng:8.507},8953:{lat:47.342,lng:8.463},8954:{lat:47.349,lng:8.470},8955:{lat:47.356,lng:8.476},8956:{lat:47.363,lng:8.483},8957:{lat:47.370,lng:8.489},8962:{lat:47.335,lng:8.456},8963:{lat:47.342,lng:8.462},8964:{lat:47.349,lng:8.469},8965:{lat:47.356,lng:8.475},8966:{lat:47.363,lng:8.482},8967:{lat:47.370,lng:8.488},
// St. Gallen, Graubünden etc.
9000:{lat:47.425,lng:9.377},9001:{lat:47.425,lng:9.377},9006:{lat:47.418,lng:9.370},9007:{lat:47.411,lng:9.363},9008:{lat:47.404,lng:9.357},9009:{lat:47.396,lng:9.350},9010:{lat:47.389,lng:9.344},9011:{lat:47.382,lng:9.337},9012:{lat:47.375,lng:9.331},9014:{lat:47.431,lng:9.384},9015:{lat:47.438,lng:9.391},9016:{lat:47.444,lng:9.397},9020:{lat:47.451,lng:9.404},9021:{lat:47.458,lng:9.411},9022:{lat:47.464,lng:9.417},9023:{lat:47.471,lng:9.424},9024:{lat:47.478,lng:9.430},9026:{lat:47.485,lng:9.437},9027:{lat:47.491,lng:9.443},9028:{lat:47.498,lng:9.450},9029:{lat:47.505,lng:9.456},9030:{lat:47.418,lng:9.358},9032:{lat:47.411,lng:9.351},9033:{lat:47.404,lng:9.344},9034:{lat:47.397,lng:9.338},9036:{lat:47.390,lng:9.331},9037:{lat:47.384,lng:9.325},9038:{lat:47.377,lng:9.319},9042:{lat:47.370,lng:9.313},9043:{lat:47.363,lng:9.307},9044:{lat:47.356,lng:9.301},9052:{lat:47.350,lng:9.295},9053:{lat:47.343,lng:9.289},9054:{lat:47.336,lng:9.283},9055:{lat:47.329,lng:9.277},9056:{lat:47.322,lng:9.271},9057:{lat:47.315,lng:9.265},9058:{lat:47.308,lng:9.259},9062:{lat:47.302,lng:9.253},9063:{lat:47.295,lng:9.247},9064:{lat:47.288,lng:9.241},9100:{lat:47.395,lng:9.290},9101:{lat:47.388,lng:9.284},9102:{lat:47.381,lng:9.278},9103:{lat:47.374,lng:9.272},9104:{lat:47.367,lng:9.265},9105:{lat:47.360,lng:9.259},9107:{lat:47.353,lng:9.253},9108:{lat:47.347,lng:9.247},9112:{lat:47.340,lng:9.241},9113:{lat:47.333,lng:9.235},9114:{lat:47.326,lng:9.229},9200:{lat:47.551,lng:9.043},9201:{lat:47.558,lng:9.049},9202:{lat:47.565,lng:9.056},9203:{lat:47.572,lng:9.062},9204:{lat:47.579,lng:9.069},9205:{lat:47.585,lng:9.075},9212:{lat:47.592,lng:9.082},9213:{lat:47.599,lng:9.088},9214:{lat:47.606,lng:9.095},9215:{lat:47.612,lng:9.101},9216:{lat:47.619,lng:9.107}};
const CFB={luzern:{lat:47.05,lng:8.309},zürich:{lat:47.377,lng:8.542},bern:{lat:46.948,lng:7.447},basel:{lat:47.557,lng:7.593},winterthur:{lat:47.501,lng:8.724},olten:{lat:47.352,lng:7.904},zug:{lat:47.166,lng:8.516},emmen:{lat:47.087,lng:8.26},kriens:{lat:47.038,lng:8.288},sursee:{lat:47.174,lng:8.114}};
const DGF={Abdichtungen:{lat:47.352,lng:7.904},'Interbohr AG':{lat:47.16,lng:8.45},'Anliker Spezialitäten AG':{lat:47.376,lng:8.541},'Niederlassung Basel':{lat:47.557,lng:7.593},'Niederlassung Winterthur':{lat:47.501,lng:8.724}};
// ═══ STATE ═══
let map,cluster,markers={};
let data=[],plans=[],tlog=[],auditors=['Alain Groelly','René Rottenberger','Niklaus Meier','Matthias Knotz'],ferien=[],personAudits=[],ferienWunsch=[],rapporte=[];
let selId=null,curTab='all',editId=null,planMode=false,planned=new Set();
let curView='map',kwOff=0,popIdx=null,popMode='site',popPersonId=null,qaId=null,statFilters=new Set(),mergeFiles=[];
// ═══ HELPERS ═══
// aC defined above as function with color picker support
const dC=d=>{if(!d)return'#6B7280';return DC[d.split(' + ')[0]]||'#6B7280';};
const mapSN=sn=>{
  const t=sn.trim();
  // Check for Werkhof sheet first (exact match on number prefix)
  if(/^12\s*WH/i.test(t))return'Werkhöfe';
  // Check for GU sheet: match full word "Generalunternehmung" OR standalone "GU" token
  // (not as substring of unrelated words)
  const tUpper=t.toUpperCase();
  if(tUpper.includes('GENERALUNTERNEHM')||/(^|[^A-Z])GU([^A-Z]|$)/.test(tUpper))return'Generalunternehmung';
  const u=t.toUpperCase();
  for(const[k,v]of Object.entries(DEPT_MAP)){
    if(k==='GU')continue; // handled above to avoid false substring matches
    if(u.includes(k.toUpperCase()))return v;
  }
  return t;
};
const normA=a=>a.toLowerCase().replace(/[\s\.,\-\/]+/g,'');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
// Parse date string as LOCAL time (avoids UTC timezone shift)
function parseDate(ds){if(!ds)return new Date();const[y,m,d]=ds.split('-').map(Number);return new Date(y,m-1,d);}
function fd(d){if(!d)return'—';const dd=parseDate(d);return dd.toLocaleDateString('de-CH');}
function kwToDate(kw,yr=new Date().getFullYear()){
  const j=new Date(yr,0,4);
  const sw=new Date(j.getTime()-((j.getDay()||7)-1)*86400000);
  const d=new Date(sw.getTime()+(kw-1)*7*86400000);
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function dateToKW(ds){
  const d=parseDate(ds);
  // ISO week: Thursday of this week determines the year
  const thu=new Date(d);thu.setDate(d.getDate()+(4-((d.getDay()||7))));
  const jan1=new Date(thu.getFullYear(),0,1);
  return Math.ceil(((thu-jan1)/86400000+1)/7);
}
function geocode(addr,dept){
  // PLZ-based: minimal random offset (0.001° ~100m) – just so markers don't overlap
  if(addr){const m=addr.match(/\b(\d{4})\b/);if(m&&PLZ[+m[1]]){const g=PLZ[+m[1]];return{lat:g.lat+(Math.random()-.5)*.001,lng:g.lng+(Math.random()-.5)*.001};}
  const al=addr.toLowerCase();for(const[c2,g]of Object.entries(CFB)){if(al.includes(c2))return{lat:g.lat+(Math.random()-.5)*.002,lng:g.lng+(Math.random()-.5)*.002};}}
  if(dept&&DGF[dept])return{lat:DGF[dept].lat+(Math.random()-.5)*.01,lng:DGF[dept].lng+(Math.random()-.5)*.01};
  return null;
}
const hasP=e=>{
  const tod=today();
  const curKWStart=kwToDate(dateToKW(tod));
  return plans.some(p=>p.bsId==e.id&&(p.date>=tod||p.date>=curKWStart));
};
const onVac=(aud,dt)=>ferien.some(f=>f.auditor===aud&&dt>=f.von&&dt<=f.bis);
// ═══ STATUS ═══
function hasBeratPlan(e){
  return beratPlan.some(p=>p.bsId===e.id&&p.date>=today());
}
// now (optional): Zeitpunkt in ms, an dem die Ampel gelten soll (Standard: jetzt). Tourguide nutzt den Audit-Tag.
function status(e,now){
  if(!e.active)return'inactive';
  if(e.paused)return'paused';
  if(hasP(e))return'planned';
  if(hasBeratPlan(e))return'beratung';
  if(!e.lastAudit&&!e.resumeFrom){
    if(!e.createdAt)return'new';
    const dn=dl(e,now);
    if(dn<-S('due_overdue_days'))return'overdue';
    if(dn<=0)return'due';
    return'new';
  }
  const d=dl(e,now);
  if(d<-S('due_overdue_days'))return'overdue';
  if(d<=0)return'due';
  if(d<=S('due_soon_days'))return'soon';
  return'ok';
}
// Erfassungsdatum für nie auditierte Baustellen: die interne ID ist der Erfassungs- bzw. Importzeitpunkt
// (Date.now()) -> daraus das echte Datum ableiten. Ein später gesetztes Datum (z.B. Migration «heute»)
// wird durch das frühere ID-Datum ersetzt. Ohne plausible ID: heute (Frist läuft ab jetzt).
function idToDate(id){
  const t=Math.floor(+id);
  if(!(t>1.5e12&&t<Date.now()+86400000))return null;
  const d=new Date(t);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function ensureCreatedAt(){
  let n=0;
  data.forEach(e=>{
    if(e.lastAudit||e.resumeFrom)return;
    const idD=idToDate(e.id);
    const want=idD&&(!e.createdAt||idD<e.createdAt)?idD:(e.createdAt||today());
    if(e.createdAt!==want){e.createdAt=want;n++;}
  });
  if(n)setTimeout(()=>{try{saveNow();}catch(x){}},800);
}
function dl(e,now){
  // Nie auditierte Baustellen: Rhythmus läuft ab Erfassungsdatum
  const ref=e.lastAudit||e.resumeFrom||e.createdAt;
  if(!ref)return-999;
  return Math.round((parseDate(ref).getTime()+e.rhythm*86400000-(now||Date.now()))/86400000);
}
function dotC(e){if(planned.has(e.id))return'#10B981';if(e.type==='werkhof')return'#EA580C';const s=status(e);if(s==='paused')return'rgba(148,163,184,.75)';if(s==='planned')return'#6366F1';if(s==='beratung')return'#8B5CF6';if(s==='overdue')return'#EF4444';if(s==='due')return'#F59E0B';if(s==='soon')return'#FDE047';return'#10B981';}
// ═══ STORAGE ═══
let saveT=null;
function save(){clearTimeout(saveT);try{if(sbConnected&&sbBase)setSyncState('saving');}catch(e){}saveT=setTimeout(()=>{saveT=null;saveLocal();if(!sbConnected)showToast('💾',1200);sbPush();},900);}
// Immediate save for critical actions (no debounce)
function saveNow(){clearTimeout(saveT);saveT=null;saveLocal();sbPush();}
function load(){try{const r=localStorage.getItem(SK);if(!r)return false;const p=JSON.parse(r);if(p.data){data=p.data;ensureCreatedAt();ensurePersonalHistory();}if(p.plans)plans=p.plans;if(p.tlog)tlog=p.tlog;if(p.auditors)auditors=p.auditors;if(p.ferien)ferien=p.ferien;if(p.ferienWunsch)ferienWunsch=p.ferienWunsch;if(p.rapporte){rapporte=p.rapporte;normalizeRapporte();}if(p.ghostAudits)window._ghostAudits=p.ghostAudits;if(p.personAudits)personAudits=p.personAudits;try{window._piCollectBox=JSON.parse(localStorage.getItem('anliker_pi_collectbox')||'[]');}catch(e){window._piCollectBox=[];}try{window._tempWorkers=JSON.parse(localStorage.getItem('anliker_temp_workers')||'[]');}catch(e){window._tempWorkers=[];}try{window._orsKey=localStorage.getItem('anliker_ors_key')||'';}catch(e){}return true;}catch(e){return false;}}
function showToast(m,d=2500){const t=document.getElementById('toast');t.textContent=m;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',d);}
// ═══ DIALOGE & RÜCKGÄNGIG ═══
// Ersetzt die Browser-Fenster confirm()/prompt(). Rückgabe: true/false, beim Textfeld der Text
// bzw. null, bei einem dritten Knopf (extra) den Wert 'extra'.
function uiDialog({msg,input=false,def='',ok='OK',cancel='Abbrechen',extra=null,danger=false}){
  return new Promise(res=>{
    const bg=document.createElement('div');bg.className='ui-dlg-bg';
    bg.innerHTML=`<div class="ui-dlg" role="dialog" aria-modal="true"><div class="ui-dlg-msg"></div>${input?'<input class="ui-dlg-inp" type="text">':''}<div class="ui-dlg-btns">${extra?'<button type="button" class="ui-btn" data-v="extra"></button>':''}<button type="button" class="ui-btn" data-v="cancel"></button><button type="button" class="ui-btn ui-btn-pri${danger?' ui-btn-danger':''}" data-v="ok"></button></div></div>`;
    bg.querySelector('.ui-dlg-msg').textContent=msg;
    bg.querySelector('[data-v=ok]').textContent=ok;
    bg.querySelector('[data-v=cancel]').textContent=cancel;
    if(extra)bg.querySelector('[data-v=extra]').textContent=extra;
    const inp=bg.querySelector('.ui-dlg-inp');if(inp)inp.value=def||'';
    const done=v=>{document.removeEventListener('keydown',key,true);bg.remove();res(v==='ok'?(input?inp.value:true):v==='extra'?'extra':(input?null:false));};
    const key=e=>{if(e.key==='Escape'){e.preventDefault();done('cancel');}else if(e.key==='Enter'&&(inp||document.activeElement?.dataset?.v!=='cancel')){e.preventDefault();done('ok');}};
    bg.addEventListener('click',e=>{const v=e.target.dataset&&e.target.dataset.v;if(v)done(v);else if(e.target===bg)done('cancel');});
    document.addEventListener('keydown',key,true);
    document.body.appendChild(bg);
    setTimeout(()=>{if(inp){inp.focus();inp.select();}else bg.querySelector('[data-v=ok]').focus();},30);
  });
}
// Formular-Dialog: fields=[{k,l,type:'text'|'date'|'select',v,opts:[...]}]. validate(vals) -> Fehlertext oder ''.
// Rückgabe: Objekt mit den Werten oder null (abgebrochen).
function uiForm({title,fields,ok='Speichern',validate,extra=null,danger=false}){
  return new Promise(res=>{
    const bg=document.createElement('div');bg.className='ui-dlg-bg';
    bg.innerHTML=`<div class="ui-dlg" role="dialog" aria-modal="true"><div class="ui-dlg-msg" style="font-weight:700"></div><div class="ui-form"></div><div class="ui-form-err" style="display:none;color:#DC2626;font-size:12px;margin:-8px 0 12px"></div><div class="ui-dlg-btns">${extra?'<button type="button" class="ui-btn ui-btn-danger" style="margin-right:auto;color:#fff" data-v="extra"></button>':''}<button type="button" class="ui-btn" data-v="cancel">Abbrechen</button><button type="button" class="ui-btn ui-btn-pri${danger?' ui-btn-danger':''}" data-v="ok"></button></div></div>`;
    bg.querySelector('.ui-dlg-msg').textContent=title;bg.querySelector('[data-v=ok]').textContent=ok;
    if(extra)bg.querySelector('[data-v=extra]').textContent=extra;
    const form=bg.querySelector('.ui-form');
    fields.forEach(f=>{
      const w=document.createElement('label');w.style.cssText='display:block;font-size:12px;color:var(--tx2);margin-bottom:10px';w.textContent=f.l;
      const el=document.createElement(f.type==='select'?'select':'input');
      if(f.type!=='select')el.type=f.type||'text';else(f.opts||[]).forEach(o=>{const op=document.createElement('option');op.value=o;op.textContent=o;el.appendChild(op);});
      el.className='ui-dlg-inp';el.style.margin='4px 0 0';el.dataset.k=f.k;el.value=f.v??'';
      w.appendChild(el);form.appendChild(w);
    });
    const vals=()=>{const o={};form.querySelectorAll('[data-k]').forEach(el=>o[el.dataset.k]=el.value.trim());return o;};
    const err=bg.querySelector('.ui-form-err');
    const done=v=>{
      if(v==='ok'){const o=vals(),m=validate?validate(o):'';if(m){err.textContent=m;err.style.display='block';return;}}
      document.removeEventListener('keydown',key,true);bg.remove();
      res(v==='ok'?vals():v==='extra'?'extra':null);
    };
    const key=e=>{if(e.key==='Escape'){e.preventDefault();done('cancel');}else if(e.key==='Enter'){e.preventDefault();done('ok');}};
    bg.addEventListener('click',e=>{const v=e.target.dataset&&e.target.dataset.v;if(v)done(v);else if(e.target===bg)done('cancel');});
    document.addEventListener('keydown',key,true);document.body.appendChild(bg);
    setTimeout(()=>form.querySelector('[data-k]')?.focus(),30);
  });
}
function askConfirm(msg,o={}){return uiDialog({msg,...o});}
function askText(msg,def='',o={}){return uiDialog({msg,input:true,def,ok:'Speichern',...o});}
// Rückgängig: vor einer Änderung aufrufen. Nach der Änderung erscheint unten ein Hinweis mit
// «Rückgängig». Rückgängig nimmt nur die eigene Änderung zurück (Merge), Änderungen anderer
// Benutzer, die inzwischen dazugekommen sind, bleiben erhalten.
function undoPoint(label,refresh){
  const before=mgClone(sbCollect());
  setTimeout(()=>{
    const after=mgClone(sbCollect());
    if(mgEq(before,after))return;
    showUndo(label,()=>{
      sbApply(mgMergeAll(after,before,sbCollect()));
      saveNow();sbRefreshUI();
      try{if(refresh)refresh();}catch(e){console.warn(e);}
      showToast('↩ Rückgängig gemacht',2000);
    });
  },0);
}
function showUndo(label,onUndo){
  let el=document.getElementById('undo-toast');
  if(!el){el=document.createElement('div');el.id='undo-toast';el.innerHTML='<span></span><button type="button">Rückgängig</button>';document.body.appendChild(el);}
  const t=document.getElementById('toast');if(t)t.style.display='none';
  el.querySelector('span').textContent='🗑 '+label;
  el.querySelector('button').onclick=()=>{el.style.display='none';clearTimeout(el._t);onUndo();};
  el.style.display='flex';clearTimeout(el._t);el._t=setTimeout(()=>{el.style.display='none';},8000);
}
function dlJSON(obj,fn){const b=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fn;a.click();}
function teamExport(){dlJSON({...sbCollect(),tlog,savedAt:new Date().toISOString(),type:'team',v:2},'anliker_backup_'+today()+'.json');showToast('📤 Sicherung heruntergeladen',3000);}


function loadJSON(file,fromModal=false){if(!file)return;const r=new FileReader();r.onload=e=>{try{const p=JSON.parse(e.target.result);const vals={};for(const f in SB_FIELDS)if(p[f]!==undefined)vals[f]=p[f];if(!vals.data)throw new Error('Keine Baustellen in der Datei');if(p.tlog)tlog=p.tlog;sbApply(vals);const st=document.getElementById('json-st');if(st)st.textContent=`✓ ${data.length} Baustellen, ${plans.length} Planungen`;saveNow();sbRefreshUI();buildCalBS();if(fromModal)setTimeout(closeModal,1400);else showToast('✓ Sicherung geladen',2500);}catch(ex){showToast('⚠ Fehler: '+ex.message,4000);}};r.readAsText(file);}



// ═══ MAP ═══
function initMap(){
  map=L.map('map').setView([47.15,8.1],8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap',maxZoom:19}).addTo(map);
  cluster=L.markerClusterGroup({showCoverageOnHover:false,maxClusterRadius:45,iconCreateFunction(c){const n=c.getChildCount(),sz=n<10?30:n<50?36:44;return L.divIcon({className:'marker-cluster-custom',html:`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:#1A1D2E;border:3px solid #6366F1;display:flex;align-items:center;justify-content:center;color:#fff;font-size:${sz>36?12:10}px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.3)">${n}</div>`,iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});}});
  map.addLayer(cluster);
  map.on('click',ev=>{if(!planMode)return;const b=findNN(ev.latlng.lat,ev.latlng.lng);if(b){planned.has(b.id)?planned.delete(b.id):planned.add(b.id);updPB();renderMarkers();renderList();}});
}
function findNN(lat,lng){let best=null,bd=999;data.filter(e=>e.active&&!e.paused&&e.lat&&e.lng).forEach(e=>{const d=Math.sqrt((e.lat-lat)**2+(e.lng-lng)**2);if(d<.06&&d<bd){bd=d;best=e;}});return best;}
function makeIcon(e,sel){
  const c=dotC(e),isPa=e.paused,isWH=e.type==='werkhof',op=isPa?.72:1;
  const isGU=e.type==='gu'||(e.dept&&e.dept.startsWith('Generalunternehmung'));
  // NEW: star icon for baustellen never audited AND no plan
  const isNew=!e.lastAudit&&!isPa&&e.active&&!isWH&&!isGU&&!hasP(e)&&!planned.has(e.id);
  if(isNew){
    const sz=sel?28:22;
    // Stern = noch nie auditiert; Farbe nach Frist ab Erfassung: violett (neu), orange (fällig), rot (überfällig)
    const st=status(e);const sc=st==='overdue'?'#EF4444':st==='due'?'#F59E0B':'#7C3AED';
    return L.divIcon({className:'',html:`<div style="opacity:${op};filter:${sel?'drop-shadow(0 0 6px '+sc+')':'drop-shadow(0 1px 2px rgba(0,0,0,.3))'}">`+
      `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${sc}" stroke="#fff" stroke-width="1.2" xmlns="http://www.w3.org/2000/svg">`+
      `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`+
      `</svg></div>`,iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});
  }
  // GU = rotated square (diamond) icon
  if(isGU){
    const s=sel?26:18;
    const sh=sel?'filter:drop-shadow(0 2px 6px rgba(0,0,0,.4))':'filter:drop-shadow(0 1px 3px rgba(0,0,0,.25))';
    return L.divIcon({className:'',html:`<div style="opacity:${op};width:${s}px;height:${s}px;display:flex;align-items:center;justify-content:center"><div style="width:${sel?18:12}px;height:${sel?18:12}px;background:${c};transform:rotate(45deg);border:${sel?'2.5px':'2px'} solid #fff;${sh}"></div></div>`,iconSize:[s,s],iconAnchor:[s/2,s/2]});
  }
  if(sel){
    if(isWH){const s=28;return L.divIcon({className:'',html:`<div style="opacity:${op}"><svg width="${s}" height="${s+10}" viewBox="0 0 24 30"><path d="M3 12l9-9 9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" fill="${c}" filter="drop-shadow(0 2px 4px rgba(0,0,0,.4))"/><rect x="9" y="15" width="6" height="6" fill="rgba(255,255,255,.7)"/><polygon points="12,28 7,22 17,22" fill="${c}"/></svg></div>`,iconSize:[s,s+10],iconAnchor:[s/2,s+10]});}
    return L.divIcon({className:'',html:`<div style="position:relative;width:32px;height:42px;opacity:${op}"><div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:22px;height:22px;border-radius:50%;background:${c};border:3px solid #fff;box-shadow:0 0 0 3px ${c}44,0 4px 12px rgba(0,0,0,.35)"></div><div style="position:absolute;top:18px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:11px solid ${c}"></div><div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:8px;height:4px;border-radius:50%;background:rgba(0,0,0,.2)"></div></div>`,iconSize:[32,42],iconAnchor:[16,42]});
  }
  if(isWH){const s=22;return L.divIcon({className:'',html:`<div style="opacity:${op}"><svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" fill="${c}" filter="drop-shadow(0 1px 3px rgba(0,0,0,.3))"/><rect x="9" y="15" width="6" height="6" fill="rgba(255,255,255,.65)"/></svg></div>`,iconSize:[s,s],iconAnchor:[s/2,s/2],className:''});}
  return L.divIcon({className:'',html:`<div style="width:22px;height:22px;border-radius:50%;background:${c};border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);opacity:${op};cursor:pointer"></div>`,iconSize:[22,22],iconAnchor:[11,11]});
}
function renderMarkers(){
  if(!cluster||!map)return;
  cluster.clearLayers();
  markers={};
  const q=(document.getElementById('srch')?.value||'').toLowerCase();
  const df=document.getElementById('dsel')?.value||'';
  const sf=document.getElementById('stsel')?.value||'';
  const dayPlanOn=window._dayPlanMode;
  const dayPlanDate=document.getElementById('dayplan-date')?.value||today();
  const ms=[];
  const visible=[];
  data.forEach(e=>{
    if(!e.lat||!e.lng)return;
    // "Meine Tagesplanung": nur Baustellen zeigen, die für den gewählten Tag beim eingeloggten
    // Nutzer eingeplant sind - überschreibt alle anderen Filter, da es ein bewusst enger
    // Fokus-Modus ist (nur der eigene Tagesplan, sonst nichts).
    if(dayPlanOn){
      const hasPlanToday=plans.some(p=>p.bsId===e.id&&p.date===dayPlanDate&&p.auditor===currentUser);
      if(!hasPlanToday)return;
      visible.push(e);
      return;
    }
    // Active/inactive logic
    const isInact=!e.active;
    const isPaused=e.paused;
    if(statFilters.size===0){
      // Default: only show active non-paused
      if(!e.active||e.paused)return;
    }
    // Dept filter
    if(df&&!(e.dept||'').includes(df))return;
    // Status dropdown
    if(sf&&status(e)!==sf)return;
    // Stat card filters
    if(statFilters.size>0){
      const s=status(e);
      const ok=statFilters.has(s)||
        (statFilters.has('werkhof')&&e.type==='werkhof')||
        (statFilters.has('inactive')&&isInact)||
        (statFilters.has('paused')&&isPaused);
      if(!ok)return;
    }
    // Text search
    if(q&&!(e.name+(e.addr||'')+(e.dept||'')+(e.psp||'')).toLowerCase().includes(q))return;
    visible.push(e);
  });

  // Gruppiere Baustellen die am (fast) selben Ort liegen (~5m Toleranz)
  const TOL=0.00005; // ca. 5 Meter
  const groups=[];
  const used=new Set();
  visible.forEach(e=>{
    if(used.has(e.id))return;
    const group=[e];used.add(e.id);
    visible.forEach(o=>{
      if(o.id===e.id||used.has(o.id))return;
      if(Math.abs(o.lat-e.lat)<TOL&&Math.abs(o.lng-e.lng)<TOL){group.push(o);used.add(o.id);}
    });
    groups.push(group);
  });

  groups.forEach(group=>{
    if(group.length===1){
      const e=group[0];
      const m=L.marker([e.lat,e.lng],{icon:makeIcon(e,selId===e.id)});
      m.bindTooltip(`<div style="font-size:12px;font-weight:600;color:#1A1D2E;max-width:200px">${e.name}<br><span style="font-weight:400;color:#6B7280;font-size:11px">${e.addr||''}</span></div>`,{direction:'top',offset:[0,-8],opacity:1,className:'bs-tooltip'});
      m.on('click',ev=>{
        if((planMode||multiPlanMode||multiAuditMode)&&e.active&&!e.paused){
          ev.originalEvent.stopPropagation();
          planned.has(e.id)?planned.delete(e.id):planned.add(e.id);
          updPB();renderMarkers();renderList();
        } else selEntry(e.id);
      });
      m.on('contextmenu',ev=>{ev.originalEvent.preventDefault();showQA(e.id,ev.originalEvent.clientX,ev.originalEvent.clientY);});
      markers[e.id]=m;ms.push(m);
    }else{
      // Mehrere Baustellen am selben Ort → Auswahl-Marker mit Anzahl
      const repr=group[0];
      const hasGU=group.some(e=>e.type==='gu');
      const icon=L.divIcon({
        className:'',
        html:`<div style="position:relative;width:26px;height:26px">
          <div style="width:24px;height:24px;border-radius:50%;background:#1A1D2E;border:2.5px solid ${hasGU?'#7C3AED':'#fff'};display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,.35)">${group.length}</div>
        </div>`,
        iconSize:[26,26],iconAnchor:[13,13]
      });
      const m=L.marker([repr.lat,repr.lng],{icon});
      m.on('click',ev=>{ev.originalEvent.stopPropagation();showOverlapPicker(group,ev.originalEvent.clientX,ev.originalEvent.clientY);});
      m.bindTooltip(`<div style="font-size:12px;font-weight:600;color:#1A1D2E">${group.length} Baustellen am selben Ort<br><span style="font-weight:400;color:#6B7280;font-size:11px">${group.map(e=>e.name).join(', ')}</span></div>`,{direction:'top',offset:[0,-8],opacity:1,className:'bs-tooltip'});
      group.forEach(e=>{markers[e.id]=m;});
      ms.push(m);
    }
  });

  cluster.addLayers(ms);
}
function showOverlapPicker(group,x,y){
  const pop=document.getElementById('qa');
  document.getElementById('qa-n').textContent=`${group.length} Baustellen am selben Ort`;
  document.getElementById('qa-auds').innerHTML=group.map(e=>{
    const isGU=e.type==='gu';
    const icon=isGU?'◆':'●';
    const col=isGU?'#7C3AED':dotC(e);
    return`<button class="qaub" onclick="closeQA();selEntry(${e.id})"><span style="color:${col};font-size:13px;flex-shrink:0">${icon}</span><span style="flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.name}</span></button>`;
  }).join('');
  pop.style.display='block';
  const vw=window.innerWidth,vh=window.innerHeight;
  pop.style.left=Math.min(x,vw-200)+'px';pop.style.top=Math.min(y,vh-190)+'px';
}

// ═══ MAP SEARCH ═══
function mapSrch(){
  const q=document.getElementById('map-q').value.trim();
  const res=document.getElementById('msrch-res');
  if(!q){res.style.display='none';return;}
  const ql=q.toLowerCase();
  // First: search existing baustellen
  const hits=data.filter(e=>e.active&&(e.name.toLowerCase().includes(ql)||(e.addr||'').toLowerCase().includes(ql)||(e.psp||'').toLowerCase().includes(ql))).slice(0,5);
  let html=hits.map(e=>`<div class="msr" onclick="mapSel(${e.id})"><div class="msrn">${e.name}</div><div class="msrs">${e.addr||'—'}</div></div>`).join('');
  if(hits.length)html+=`<div style="font-size:10px;color:var(--tx3);padding:4px 10px;border-top:1px solid var(--bd)">Adressen:</div>`;
  res.innerHTML=html||'';
  res.style.display=hits.length?'block':'none';
  // Also search Swisstopo for address
  if(q.length>=3){
    fetch(`https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(q)}&type=locations&limit=4&sr=4326&lang=de`)
      .then(r=>r.json()).then(d=>{
        if(!d.results||!d.results.length)return;
        const addrHits=d.results.map(r=>{
          const a=r.attrs;
          const lbl=mgSafe((a.label||'').replace(/<[^>]+>/g,''));
          return`<div class="msr" onclick="mapGoTo(${+a.lat||0},${+a.lon||0},'${lbl}')">
            <div class="msrn" style="color:var(--blue)">📍 ${lbl}</div>
            <div class="msrs">${mgSafe(String(a.detail||''))}</div>
          </div>`;
        }).join('');
        const cur=document.getElementById('msrch-res');
        cur.innerHTML=(hits.length?cur.innerHTML:'')+addrHits;
        cur.style.display='block';
      }).catch(()=>{});
  }
}
function mapGoTo(lat,lng,label){
  map.setView([lat,lng],15);
  document.getElementById('msrch-res').style.display='none';
  document.getElementById('map-q').value='';
  // Show temporary marker
  if(window._mapGoToMarker)map.removeLayer(window._mapGoToMarker);
  window._mapGoToMarker=L.marker([lat,lng],{icon:L.divIcon({className:'',html:`<div style="background:#3B82F6;color:#fff;border-radius:8px;padding:4px 8px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.3)">${label}</div>`,iconAnchor:[0,0]})}).addTo(map);
  setTimeout(()=>{if(window._mapGoToMarker){map.removeLayer(window._mapGoToMarker);window._mapGoToMarker=null;}},5000);
}
function mapSel(id){document.getElementById('msrch-res').style.display='none';document.getElementById('map-q').value='';const e=data.find(x=>x.id===id);if(e?.lat)map.setView([e.lat,e.lng],14,{animate:true});selEntry(id);}
// ═══ LIST ═══
function renderList(){
  const q=(document.getElementById('srch')?.value||'').toLowerCase();
  const df=document.getElementById('dsel')?.value||'';
  const sf=document.getElementById('stsel')?.value||'';
  let list=[...data];
  // Übersichtsmodus: sobald gesucht oder eine Abteilung gewählt ist (ohne Status-Einschränkung), zeigt die
  // Liste ALLE Baustellen dazu - aktive nach Dringlichkeit, dann pausierte, dann inaktive.
  const overview=!!(q||df)&&!sf&&statFilters.size===0;
  // Default: show active non-paused (unless stat filter shows paused/inactive)
  if(statFilters.size===0&&!overview)list=list.filter(e=>e.active&&!e.paused);
  if(q){
    // When searching: include ALL baustellen (paused, inactive too)
    list=data.filter(e=>(e.name+(e.addr||'')+(e.dept||'')+(e.psp||'')+(e.sap||'')+(e.prv||'')+(e.bc||'')).toLowerCase().includes(q));
    if(df)list=list.filter(e=>deptParts(e.dept).includes(df));
    if(sf)list=list.filter(e=>status(e)===sf);
  } else {
    if(df)list=list.filter(e=>deptParts(e.dept).includes(df));
    if(sf)list=list.filter(e=>status(e)===sf);
    if(statFilters.size>0){
      list=list.filter(e=>{
        const s=status(e);
        return statFilters.has(s)||(statFilters.has('beratung')&&s==='beratung')||(statFilters.has('werkhof')&&e.type==='werkhof')||
               (statFilters.has('inactive')&&!e.active)||(statFilters.has('paused')&&e.paused);
      });
      if(df)list=list.filter(e=>(e.dept||'').includes(df));
    }
  }
  // Sortierung: aktiv (rot, orange, gelb, grün/ok, blau=geplant, violett=neu) -> pausiert -> inaktiv
  const _grp=e=>!e.active?2:e.paused?1:0;
  const _ord={overdue:0,due:1,soon:2,ok:3,planned:4,beratung:4,new:5};
  if(overview){
    list.sort((a,b)=>{
      const ga=_grp(a),gb=_grp(b);if(ga!==gb)return ga-gb;
      if(ga===0){const oa=_ord[status(a)]??3,ob=_ord[status(b)]??3;if(oa!==ob)return oa-ob;}
      return dl(a)-dl(b)||a.name.localeCompare(b.name);
    });
  }else list.sort((a,b)=>dl(a)-dl(b));
  if(!data.length){document.getElementById('bslist').innerHTML=`<div class="empty-s"><h3>Keine Baustellen</h3><p>Über «+ Neue Baustelle» erfassen oder ein Backup laden.</p></div>`;return;}
  const tc={overdue:'tov',due:'tdu',soon:'tsn',ok:'tok',new:'tnew',paused:'tpa',inactive:'tin',planned:'tpl',beratung:'tpl'};
  const sl=e=>{const s=status(e);if(s==='planned'){const p=plans.filter(x=>x.bsId===e.id&&x.date>=today()).sort((a,b)=>a.date.localeCompare(b.date))[0];return p?`KW ${dateToKW(p.date)}`:'Geplant';}if(s==='overdue')return`${Math.abs(dl(e))-10}T überfällig`;if(s==='due')return`${Math.abs(dl(e))}T über`;if(s==='soon')return`in ${dl(e)}T`;if(s==='new')return'Neu – kein Audit';if(s==='beratung')return'Beratung geplant';if(s==='paused')return'Pausiert';if(s==='inactive')return'Inaktiv';return`in ${dl(e)}T`;};
  const _cardHTML=e=>{
    const s=status(e),ip=planned.has(e.id);
    const chk=(planMode||multiPlanMode||multiAuditMode)&&e.active&&!e.paused?`<div class="pchk${ip?' on':''}" onclick="togPI(event,${e.id})">${ip?'✓':''}</div>`:'';
    return`<div class="bsc${selId===e.id?' sel':''}${ip?' rsel':''}${!e.active?' inact':''}${e.paused?' paused':''}" onclick="selEntry(${e.id})">
      <div style="display:flex;align-items:flex-start;gap:5px">${chk}<div style="flex:1;min-width:0">
        <div class="bn">${e.type==='werkhof'?'🏠 ':''}${e.name}${(()=>{const t=personalTrend(e);return t?` <span title="Personal ${t.txt}" style="color:${t.col};font-weight:700">${t.sym}</span>`:'';})()}</div>
        <div class="bsub"><span class="ddot" style="background:${dC(e.dept)}"></span>${e.dept||'—'}</div>
        ${e.prv?`<div class="bsub" style="padding-left:14px">${e.prv}</div>`:''}
        ${e.psp?`<div class="bsub" style="padding-left:14px;color:var(--tx3);font-size:10px">${e.psp}</div>`:''}
        <div class="btags">
          <span class="tag ${tc[s]||'tgr'}">${sl(e)}</span>
          <span class="tag tgr" title="Audit-Rhythmus: alle ${rhLabel(e.rhythm,true)}">${rhLabel(e.rhythm)}</span>
          ${e.lastKW?`<span class="tag tgr">KW${e.lastKW}</span>`:''}
          ${e.auditor?`<span class="tag" style="background:${aC(e.auditor)}18;color:${aC(e.auditor)}">${e.auditor.split(' ').pop()}</span>`:''}
          ${e.note?'<span class="tag tgr">📝</span>':''}
        </div>
      </div></div>
    </div>`;
  };
  let _html='';
  if(overview){
    const cnt=[0,0,0];list.forEach(x=>cnt[_grp(x)]++);
    const heads=[['🟢 Aktiv – nach Dringlichkeit','#10B981'],['⏸ Pausiert','#94A3B8'],['⛔ Inaktiv','#64748B']];
    let last=-1;
    list.forEach(x=>{const g=_grp(x);if(g!==last){last=g;_html+=`<div style="position:sticky;top:0;z-index:2;background:var(--sf);padding:6px 10px;font-size:11px;font-weight:700;color:${heads[g][1]};border-bottom:1px solid var(--bd)">${heads[g][0]} (${cnt[g]})</div>`;}_html+=_cardHTML(x);});
    _html=`<div style="padding:6px 10px;font-size:11px;color:var(--tx2);background:var(--sf2);border-bottom:1px solid var(--bd)">📋 Übersicht: ${list.length} Baustellen${df?' · '+escH(df):''}${q?' · «'+escH(q)+'»':''}</div>`+_html;
  }else _html=list.map(_cardHTML).join('');
  document.getElementById('bslist').innerHTML=_html||`<div style="padding:12px;font-size:11px;color:var(--tx3);text-align:center">Keine Einträge.</div>`;
}
// ═══ STATS ═══
function updateStats(){
  document.getElementById('sn-t').textContent=data.filter(e=>e.active&&!e.paused).length;
  document.getElementById('sn-o').textContent=data.filter(e=>status(e)==='overdue').length;
  document.getElementById('sn-d').textContent=data.filter(e=>status(e)==='due').length;
  document.getElementById('sn-s').textContent=data.filter(e=>status(e)==='soon').length;
  document.getElementById('sn-k').textContent=data.filter(e=>status(e)==='ok').length;
  const snnw=document.getElementById('sn-nw');if(snnw)snnw.textContent=data.filter(e=>status(e)==='new').length;
  document.getElementById('sn-pl').textContent=data.filter(e=>status(e)==='planned').length;
  document.getElementById('sn-p').textContent=data.filter(e=>e.paused).length;
  document.getElementById('sn-i').textContent=data.filter(e=>!e.active).length;
  const snwh=document.getElementById('sn-wh');if(snwh)snwh.textContent=data.filter(e=>e.type==='werkhof').length;
}
function statFlt(f){
  if(f==='all'){statFilters.clear();document.querySelectorAll('.stat').forEach(s=>s.classList.remove('on'));}
  else{statFilters.has(f)?statFilters.delete(f):statFilters.add(f);const map2={overdue:'ov',due:'du',soon:'sn',ok:'ok',new:'nw',planned:'pl',paused:'pa',inactive:'in',werkhof:'wh'};document.getElementById('st-'+(map2[f]||f))?.classList.toggle('on');}
  renderMarkers();renderList();
}
// ═══ DETAIL PANEL ═══
function delPlan(planId,bsId,date){
  undoPoint(`Planung vom ${fd(date)} gelöscht`,()=>{buildCalBS();if(selId==+bsId)selEntry(+bsId);});
  plans=plans.filter(p=>!(p.bsId==bsId&&p.date===date));
  const bs=data.find(x=>x.id==bsId);
  saveNow();renderAll();buildCalBS();
  if(bs)log('Planung gelöscht 🗑',bs.name,'#6B7280',fd(date));
  setTimeout(()=>selEntry(+bsId),100);
  showToast('🗑 Planung gelöscht',2000);
}
function delBeratPlan(id){
  beratPlan=beratPlan.filter(p=>p.id!==id);
  saveNow();selEntry(+selId);
  showToast('🗑 Beratungs-Planung gelöscht',1500);
}
function delBeratung(bsId,beratId){
  const e=data.find(x=>x.id===+bsId);if(!e)return;
  e.beratungen=(e.beratungen||[]).filter(b=>b.id!==beratId);
  saveNow();selEntry(bsId);
  showToast('🗑 Beratung gelöscht',1500);
}
function toggleHistExpand(id){
  const histEl=document.getElementById('dp-hist');
  if(!histEl)return;
  histEl.dataset.expanded=histEl.dataset.expanded==='1'?'0':'1';
  selEntry(id);
}
function delAudit(bsId,date,kw){
  undoPoint(`Audit vom ${fd(date)} gelöscht`,()=>{if(selId===bsId)selEntry(bsId);});
  const e=data.find(x=>x.id===bsId);if(!e)return;
  e.auditHistory=(e.auditHistory||[]).filter(h=>!(h.date===date&&(h.kw||0)===(kw||0)));
  // Recalculate lastAudit from remaining history
  const sorted=[...(e.auditHistory||[])].sort((a,b)=>b.date.localeCompare(a.date));
  e.lastAudit=sorted[0]?.date||null;
  e.lastKW=sorted[0]?.kw||null;
  e.auditor=sorted[0]?.auditor||null;
  saveNow();renderMarkers();renderList();updateStats();
  log('Audit gelöscht 🗑',e.name,'#6B7280',`${fd(date)}`);
  selEntry(bsId);
}
function selEntry(id){
  const prev=selId;selId=id;
  ['audit-form','plan-form','note-form','pause-form','resume-form','delc'].forEach(x=>document.getElementById(x).style.display='none');
  const e=data.find(x=>x.id===id);if(!e)return;
  document.getElementById('dp-name').textContent=(e.type==='werkhof'?'🏠 ':'')+e.name;
  document.getElementById('dp-sub').textContent=e.dept||'Baustelle';
  document.getElementById('dp-psp').textContent=e.psp||'—';
  document.getElementById('dp-sap').textContent=e.sap||'—';
  document.getElementById('dp-addr').textContent=e.addr||'—';
  document.getElementById('dp-prv').textContent=e.prv||'—';
  const bcEl=document.getElementById('dp-bc');if(bcEl)bcEl.textContent=e.bc||'—';
  document.getElementById('dp-dept').textContent=e.dept||'—';
  document.getElementById('dp-rh').textContent=rhLabel(e.rhythm,true);
  {const zr=document.getElementById('dp-zb-row');if(zr){zr.style.display=e.zeitbedarf?'':'none';if(e.zeitbedarf)document.getElementById('dp-zb').textContent=e.zeitbedarf+' min (fix)';}}
  renderPersonalHistory(e);
  // Personal aus dem letzten Einsatzlisten-Import (Personal-Import Feature) - nur sichtbar,
  // wenn diese Baustelle je in einem Import geführt wurde (kein Wert = nie importiert).
  const perRow=document.getElementById('dp-personal-row');
  if(perRow){
    const has=e.lastPersonalKW!==undefined&&e.lastPersonalCount!==undefined;
    const man=(e.personalHistory||[]).some(h=>h.kw===e.lastPersonalKW&&h.manual);
    document.getElementById('dp-personal-lbl').textContent=has?'Personal KW '+e.lastPersonalKW:'Personal';
    document.getElementById('dp-personal-cnt').textContent=has?e.lastPersonalCount+(man?' (manuell)':''):'– keine Angabe';
    document.getElementById('dp-personal-edit').onclick=()=>openPersonalManual(e.id);
    perRow.style.display=e.type==='werkhof'?'none':'flex';
  }
  // lastAudit always derived from auditHistory - never from resumeFrom
  const lastAuditEntry=(e.auditHistory||[]).sort((a,b)=>b.date.localeCompare(a.date))[0];
  document.getElementById('dp-last').textContent=lastAuditEntry?`${fd(lastAuditEntry.date)}${lastAuditEntry.kw?' (KW'+lastAuditEntry.kw+')':''}`:'Kein Audit';
  const clrBtn=document.getElementById('dp-last-clr');
  if(clrBtn)clrBtn.style.display='none';
  document.getElementById('dp-aud').textContent=e.auditor||'—';
  if(e.lastAudit&&!e.paused){const nd=new Date(parseDate(e.lastAudit).getTime()+e.rhythm*86400000);const nds=nd.getFullYear()+'-'+String(nd.getMonth()+1).padStart(2,'0')+'-'+String(nd.getDate()).padStart(2,'0');document.getElementById('dp-next').textContent=`${fd(nds)} (${dl(e)}T)`;}
  else if(e.paused){
    if(e.pauseUntil){const kw=dateToKW(e.pauseUntil);document.getElementById('dp-next').textContent='⏸ Pausiert bis KW '+kw;}
    else document.getElementById('dp-next').textContent='⏸ Pausiert (unbegrenzt)';
  } else document.getElementById('dp-next').textContent='—';
  const cnt=e.auditHistory?.length||0;const cb=document.getElementById('dp-cntb');
  if(cnt>0){const bA={};(e.auditHistory||[]).forEach(h=>{const a=h.auditor||'Unbek.';bA[a]=(bA[a]||0)+1;});document.getElementById('dp-cnt').textContent=`${cnt}× — ${Object.entries(bA).map(([a,n])=>a.split(' ').pop()+': '+n).join(' · ')}`;cb.style.display='block';}else cb.style.display='none';
  // Verlauf: Audits + Beratungen zusammen chronologisch
  const histEl=document.getElementById('dp-hist');
  if(histEl){
    const audits=(e.auditHistory||[]).map(h=>({...h,_type:'audit'}));
    const berats=(e.beratungen||[]).map(b=>({...b,_type:'berat'}));
    const combined=[...audits,...berats].sort((a,b)=>b.date.localeCompare(a.date));
    if(combined.length){
      const rowStyle='display:grid;grid-template-columns:110px 1fr auto;align-items:center;gap:4px;padding:4px 12px;font-size:11px;border-bottom:1px solid var(--bd)';
      const showAll=histEl.dataset.expanded==='1';
      const visible=showAll?combined:combined.slice(0,4);
      histEl.innerHTML=`<div style="font-size:11px;font-weight:600;color:var(--tx2);margin:8px 0 4px;padding:0 12px">Verlauf</div>`+
        visible.map(h=>{
          const isBerat=h._type==='berat';
          const delFn=isBerat?`delBeratung(${id},${h.id})`:`delAudit(${id},'${h.date}',${h.kw||0})`;
          return`<div style="${rowStyle}">
            <span style="${isBerat?'color:#8B5CF6':''}">${isBerat?'💬 ':''}${fd(h.date)}${h.kw?' KW'+h.kw:''}</span>
            <span style="color:var(--tx2)">${h.auditor||'Unbekannt'}${h.note?' · '+h.note:''}</span>
            <button onclick="${delFn}" style="background:none;border:none;cursor:pointer;color:#EF4444;font-size:13px;padding:0 2px">🗑</button>
          </div>`;
        }).join('')+
        (combined.length>4?`<div onclick="toggleHistExpand(${id})" style="padding:6px 12px;font-size:11px;color:var(--blue);cursor:pointer;text-align:center;border-bottom:1px solid var(--bd)">
          ${showAll?'▲ Weniger anzeigen':`▼ Alle ${combined.length} anzeigen`}
        </div>`:'');
      histEl.style.display='block';
    } else histEl.style.display='none';
  }
  const nb=document.getElementById('dp-noteb');if(e.note){nb.textContent='📝 '+e.note;nb.style.display='block';}else nb.style.display='none';
  // Planungs-Liste mit Lösch-Button
  const plansEl=document.getElementById('dp-plans');
  if(plansEl){
    const rowStyle='display:grid;grid-template-columns:110px 1fr auto;align-items:center;gap:4px;padding:4px 12px;font-size:11px;border-bottom:1px solid var(--bd)';
    const curKWStart=kwToDate(dateToKW(today()));
    const ePlans=plans.filter(p=>p.bsId===e.id&&(p.date>=today()||p.date>=curKWStart)).sort((a,b)=>a.date.localeCompare(b.date));
    const eBeratPlans=beratPlan.filter(p=>p.bsId===e.id&&p.date>=today()).sort((a,b)=>a.date.localeCompare(b.date));
    if(ePlans.length||eBeratPlans.length){
      let html='<div style="font-size:11px;font-weight:600;color:var(--tx2);margin:8px 0 4px;padding:0 12px">Planungen</div>';
      ePlans.forEach(p=>{
        html+=`<div style="${rowStyle}">
          <span style="color:#6366F1">📅 ${fd(p.date)}</span>
          <span style="color:var(--tx2)">${p.auditor||'Unbekannt'}</span>
          <button onclick="delPlan('${p.id||p.date}',${e.id},'${p.date}')" style="background:none;border:none;cursor:pointer;color:#EF4444;font-size:13px;padding:0 2px">🗑</button>
        </div>`;
      });
      eBeratPlans.forEach(p=>{
        html+=`<div style="${rowStyle}">
          <span style="color:#8B5CF6">💬 ${fd(p.date)}</span>
          <span style="color:var(--tx2)">${p.auditor||'Unbekannt'}${p.note?' · '+p.note:''}</span>
          <button onclick="delBeratPlan(${p.id})" style="background:none;border:none;cursor:pointer;color:#EF4444;font-size:13px;padding:0 2px">🗑</button>
        </div>`;
      });
      plansEl.innerHTML=html;
      plansEl.style.display='block';
    } else plansEl.style.display='none';
  }
  const pb=document.getElementById('dp-pb'),ab=document.getElementById('dp-ab');
  if(e.active){pb.style.display='';pb.textContent=e.paused?'▶ Reaktivieren':'⏸ Pausieren';pb.className=e.paused?'bg':'bpu';}else pb.style.display='none';
  const puEl=document.getElementById('dp-pause-until');
  if(puEl){if(e.paused&&e.pauseUntil){const kw=dateToKW(e.pauseUntil);const d=parseDate(e.pauseUntil);puEl.textContent='⏸ Pausiert bis KW '+kw+' ('+d.getDate()+'.'+(d.getMonth()+1)+'.)';puEl.style.display='block';}else if(e.paused){puEl.textContent='⏸ Pausiert (unbegrenzt)';puEl.style.display='block';}else puEl.style.display='none';}
  ab.textContent=e.active?'⚫ Inaktiv':'✓ Aktivieren';ab.className=e.active?'bt2':'bg';
  document.getElementById('dp').style.display='block';
  if(e.lat&&e.lng){
    const curZ=map.getZoom();
    // If zoomed out too far, zoom in to street level; otherwise just pan
    if(curZ<13)map.flyTo([e.lat,e.lng],14,{animate:true,duration:0.8});
    else map.panTo([e.lat,e.lng],{animate:true});
    // Flash the marker with a circle to make it visible
    setTimeout(()=>{if(markers[id])markers[id].setIcon(makeIcon(e,true));},850);
  }
  if(prev&&prev!==id&&markers[prev]){const pe=data.find(x=>x.id===prev);if(pe)markers[prev].setIcon(makeIcon(pe,false));}
  if(markers[id])markers[id].setIcon(makeIcon(e,true));
  renderList();
  // Scroll selected entry into view in sidebar
  setTimeout(()=>{const el=document.querySelector('.bsc.sel');if(el)el.scrollIntoView({behavior:'smooth',block:'nearest'});},100);
}
function closeDP(){const p=selId;selId=null;document.getElementById('dp').style.display='none';if(p&&markers[p]){const e=data.find(x=>x.id===p);if(e)markers[p].setIcon(makeIcon(e,false));}renderList();}
function getStickyPlanKW(){
  const next=dateToKW(today())+1;
  try{
    const s=JSON.parse(localStorage.getItem('plan_kw_sticky')||'null');
    // gespeicherter Montag muss >= Montag der aktuellen Woche sein (funktioniert auch über den Jahreswechsel)
    if(s&&s.kw&&s.monday&&s.monday>=kwToDate(dateToKW(today())))return s.kw;
  }catch(e){}
  return next;
}
function setStickyPlanKW(kw){
  kw=+kw;if(!kw)return;
  try{localStorage.setItem('plan_kw_sticky',JSON.stringify({kw,monday:kwToDate(kw)}));}catch(e){}
}
function showF(w){
  ['audit-form','plan-form','note-form','pause-form','resume-form','delc'].forEach(x=>document.getElementById(x).style.display='none');
  if(w==='audit'){document.getElementById('audit-form').style.display='block';if(currentUser){const ap=document.getElementById('aud-pick');if(ap)[...ap.options].forEach(o=>{if(o.text===currentUser||o.value===currentUser)ap.value=o.value;});};document.getElementById('aud-date').value=today();}
  if(w==='plan'){
    document.getElementById('plan-form').style.display='block';
    if(currentUser){const pa=document.getElementById('plan-aud');if(pa)[...pa.options].forEach(o=>{if(o.text===currentUser||o.value===currentUser)pa.value=o.value;});}
    // Default: KW mode. Zuletzt gewählte KW bleibt stehen (bis man sie ändert), solange sie nicht
    // in der Vergangenheit liegt - sonst nächste KW.
    _planMode='kw';
    setPlanMode('kw');
    document.getElementById('plan-kw').value=getStickyPlanKW();
    document.getElementById('plan-date').value='';
  }
  if(w==='note'){const e=data.find(x=>x.id===selId);document.getElementById('note-form').style.display='block';document.getElementById('note-inp').value=e?.note||'';}
}
function showDel(){['audit-form','plan-form','note-form','pause-form','resume-form'].forEach(x=>document.getElementById(x).style.display='none');document.getElementById('delc').style.display='block';}
function hideDel(){document.getElementById('delc').style.display='none';}
function doDelete(){if(!selId)return;const e=data.find(x=>x.id===selId);if(e)log('Gelöscht',e.name,'#EF4444','');data=data.filter(x=>x.id!==selId);closeDP();renderAll();}
function confirmAudit(){
  const aud=document.getElementById('aud-pick').value,dt=document.getElementById('aud-date').value;
  if(!aud||!dt){showToast('Auditor und Datum erforderlich');return;}
  const e=data.find(x=>x.id===selId);if(!e)return;
  e.lastAudit=dt;e.lastKW=dateToKW(dt);e.auditor=aud;
  // Add to auditHistory if not already there
  if(!e.auditHistory)e.auditHistory=[];
  const exists=e.auditHistory.some(h=>h.date===dt&&h.auditor===aud);
  if(!exists)e.auditHistory.push({date:dt,kw:dateToKW(dt),auditor:aud});
  plans=plans.filter(p=>!(p.bsId===e.id&&p.date<=dt));
  log('Auditiert ✓',e.name,'#10B981',aud);
  document.getElementById('audit-form').style.display='none';
  const sid=+selId;
  saveNow();renderAll();
  setTimeout(()=>selEntry(sid),100);
  showToast('✓ Audit erfasst',2000);
}
let _planMode='kw';
function setPlanMode(mode){
  _planMode=mode;
  const kwBtn=document.getElementById('plan-mode-kw');
  const dtBtn=document.getElementById('plan-mode-date');
  if(kwBtn){kwBtn.style.background=mode==='kw'?'var(--blue)':'var(--sf2)';kwBtn.style.color=mode==='kw'?'#fff':'var(--tx)';}
  if(dtBtn){dtBtn.style.background=mode==='date'?'var(--blue)':'var(--sf2)';dtBtn.style.color=mode==='date'?'#fff':'var(--tx)';}
  if(mode==='kw')document.getElementById('plan-date').value='';
  else document.getElementById('plan-kw').value='';
}
function confirmPlan(){
  const aud=document.getElementById('plan-aud').value;
  const kwVal=document.getElementById('plan-kw').value;
  if(kwVal)setStickyPlanKW(kwVal);
  const dtVal=document.getElementById('plan-date').value;
  let dt=_planMode==='kw'?kwToDate(+kwVal):dtVal;
  if(!aud||!dt||(dt==='Invalid Date')){showToast('Auditor und KW/Datum erforderlich');return;}
  const e=data.find(x=>x.id===selId);if(!e)return;
  if(onVac(aud,dt))showToast(`⚠️ ${aud.split(' ').pop()} hat Ferien!`,4000);
  plans.push({bsId:e.id,auditor:aud,date:dt});plans.sort((a,b)=>a.date.localeCompare(b.date));
  log('Geplant',e.name,'#6366F1',aud);
  document.getElementById('plan-form').style.display='none';
  _planMode='kw';setPlanMode('kw');
  document.getElementById('plan-kw').value='';document.getElementById('plan-date').value='';
  saveNow();renderAll();selEntry(selId);
}
function saveNote(){const note=document.getElementById('note-inp').value.trim();const e=data.find(x=>x.id===selId);if(!e)return;e.note=note;log(note?'Notiz':'Notiz gelöscht',e.name,'#8B5CF6','');document.getElementById('note-form').style.display='none';save();selEntry(selId);}
function clearLastAudit(){
  const e=data.find(x=>x.id===+selId);if(!e)return;
  e.lastAudit=null;e.lastKW=null;e.auditor=null;e.resumeFrom=null;
  saveNow();selEntry(selId);renderMarkers();renderList();
  showToast('✓ Letztes Audit Datum gelöscht',2000);
}
function togglePause(){const e=data.find(x=>x.id===selId);if(!e)return;if(e.paused){document.getElementById('resume-form').style.display='block';document.getElementById('resume-d').value=today();}else{
  document.getElementById('pause-form').style.display='block';
  document.getElementById('pause-r').value=e.pauseReason||'';
  const sel=document.getElementById('pause-u');
  if(sel){
    const curKW=dateToKW(today());
    let opts='<option value="">— keine —</option>';
    for(let i=1;i<=52;i++){
      if(i<curKW)continue;
      const dt=kwToDate(i);
      const d=parseDate(dt);
      opts+='<option value="'+dt+'" style="background:#fff;color:#000">KW '+i+' ('+d.getDate()+'.'+(d.getMonth()+1)+'.)</option>';
    }
    sel.innerHTML=opts;
    sel.style.background='var(--sf)';
    sel.style.color='var(--tx)';
  }
}}
function confirmPause(){const e=data.find(x=>x.id===selId);if(!e)return;e.paused=true;e.pauseReason=document.getElementById('pause-r').value.trim();e.pauseUntil=document.getElementById('pause-u').value||null;log('Pausiert ⏸',e.name,'#94A3B8','');document.getElementById('pause-form').style.display='none';renderAll();selEntry(selId);}
function confirmResume(){
  const e=data.find(x=>x.id===selId);if(!e)return;
  e.paused=false;e.pauseReason=null;e.pauseUntil=null;e.resumeFrom=null;
  // Restore lastAudit from auditHistory if available
  const hist=(e.auditHistory||[]).sort((a,b)=>b.date.localeCompare(a.date));
  if(hist.length){e.lastAudit=hist[0].date;e.lastKW=hist[0].kw;e.auditor=hist[0].auditor;}
  log('Reaktiviert ▶',e.name,'#10B981','');
  document.getElementById('resume-form').style.display='none';
  saveNow();renderAll();selEntry(selId);
}
function editSel(){if(selId)openEdit(selId);}
function toggleActive(){const e=data.find(x=>x.id===selId);if(!e)return;e.active=!e.active;if(!e.active)e.paused=false;log(e.active?'Aktiviert':'Inaktiv',e.name,e.active?'#10B981':'#6B7280','');renderAll();selEntry(selId);}
// ═══ TIMELINE ═══
function log(action,name,color,who){tlog.unshift({ts:new Date().toISOString(),action,name,color,who:who||'',by:currentUser||''});if(tlog.length>60)tlog.pop();renderTL();save();}
function renderTL(){
  const inner=document.getElementById('tli');
  const tls=document.getElementById('tls');
  if(!inner||!tls)return;
  inner.style.display='flex';inner.style.flexDirection='row';inner.style.height='100%';inner.style.width='100%';
  if(!tlog.length){inner.innerHTML='<span style="color:var(--tx3);font-size:11px;align-self:center;padding:8px">Noch keine Aktivitäten.</span>';return;}
  // Calculate how many cards fit in the available width (each card ~140px)
  const cardW=140;
  const available=tls.clientWidth||window.innerWidth-170;
  const maxCards=Math.max(1,Math.floor(available/cardW));
  const entries=tlog.slice(0,maxCards); // tlog[0] = newest (unshift), just take first N
  inner.innerHTML=entries.map(e=>{
    const t=new Date(e.ts);
    const ts=t.toLocaleDateString('de-CH')+' '+String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0');
    // Find baustelle by name to enable navigation
    const bs=data.find(x=>x.name===e.name);
    const clickFn=bs?`setView('map',document.querySelector('.tab'));selEntry(${bs.id})`:'';
    return`<div class="tle" style="flex:1;min-width:0" ${clickFn?`onclick="${clickFn}" title="Zur Baustelle navigieren"`:''}>
      <div style="font-size:10px;color:var(--tx3);white-space:nowrap">${ts}</div>
      <div style="font-size:11px;font-weight:600;color:var(--tx);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.name}</div>
      <div style="font-size:11px;color:${e.color};font-weight:500;white-space:nowrap">${e.action}</div>
      ${e.who?`<div style="font-size:10px;color:var(--tx2);white-space:nowrap">${e.who}</div>`:''}
      ${e.by&&e.by!==e.who?`<div style="font-size:10px;color:var(--tx3);white-space:nowrap">von ${e.by.split(' ').pop()}</div>`:''}
    </div>`;
  }).join('');
}
// ═══ NAVIGATION ═══

function setView(v,el){
  curView=v;document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));el.classList.add('on');
  document.getElementById('map-view').style.display=v==='map'?'flex':'none';
  document.getElementById('xl-view').style.display=v==='xl'?'flex':'none';
  document.getElementById('pa-view').style.display=v==='pa'?'flex':'none';
  document.getElementById('cal-view').style.display=v==='cal'?'flex':'none';
  document.getElementById('aud-view').style.display=v==='aud'?'block':'none';
  if(v==='map')setTimeout(()=>map.invalidateSize(),120);
  if(v==='cal'){weekOff=0;buildCalBS();renderCalSB();renderKW();}
  if(v==='aud'){buildYearSelects();renderAudTags();renderAudCodes();renderAuditors();renderAudTotals();renderFerList();renderFerChart();renderWunschFerien();renderPA();buildAudPASel();setAudTab('overview');}
  if(v==='xl'){buildYearSelects();buildXLFilter();renderXL();}
  if(v==='pa'){renderPA2();}
}
// ═══ ROUTE / PLAN ═══
let multiPlanMode=false;

let multiAuditMode=false;

function toggleMultiAudit(){
  if(multiAuditMode){
    multiAuditMode=false;planned.clear();
    const btn=document.getElementById('mabtn');
    if(btn){btn.innerHTML='<i class="ti ti-checks"></i> Mehrfach auditieren';btn.style.background='var(--sf2)';btn.style.color='var(--tx)';}
    document.getElementById('ma-bar').style.display='none';
    renderKW();return;
  }
  multiAuditMode=true;planned.clear();
  const btn=document.getElementById('mabtn');
  if(btn){btn.innerHTML='✕ Beenden';btn.style.background='#EF4444';btn.style.color='#fff';}
  // Show audit bar
  const bar=document.getElementById('ma-bar');
  if(bar) bar.style.display='flex';
  // Populate auditor after render
  setTimeout(()=>{
    const sel=document.getElementById('ma-aud');
    if(sel){
      sel.innerHTML='<option value="">— Auditor —</option>'+auditors.map(a=>`<option value="${a}"${a===currentUser?' selected':''}>${a}</option>`).join('');
      if(currentUser)sel.value=currentUser;
    }
  },50);
  renderKW();
  // Populate auditor AFTER renderKW (which might reset the bar)
  setTimeout(()=>{
    const sel=document.getElementById('ma-aud');
    if(sel){
      sel.innerHTML='<option value="">— Auditor —</option>'+auditors.map(a=>`<option value="${a}"${a===currentUser?' selected':''}>${a}</option>`).join('');
      if(currentUser)sel.value=currentUser;
    }
  },100);
  showToast('✅ Geplante Baustellen anklicken → «Alle auditiert»',3000);
}

function toggleKWAuditSel(bsId){
  if(planned.has(bsId))planned.delete(bsId);
  else planned.add(bsId);
  const cnt=document.getElementById('ma-count');
  if(cnt)cnt.textContent=planned.size+' ausgewählt';
  renderKW();
}

function applyMultiAudit(){
  if(!planned.size){showToast('Keine Baustellen ausgewählt');return;}
  const aud=document.getElementById('ma-aud').value;
  if(!aud){showToast('Bitte Auditor wählen');return;}
  let count=0;
  planned.forEach(id=>{
    const e=data.find(x=>x.id===+id);if(!e)return;
    // Use the plan date for this baustelle
    const plan=plans.find(p=>p.bsId===+id);
    const dt=plan?plan.date:today();
    e.lastAudit=dt;e.lastKW=dateToKW(dt);e.auditor=aud;
    if(!e.auditHistory)e.auditHistory=[];
    if(!e.auditHistory.some(h=>h.date===dt&&h.auditor===aud))
      e.auditHistory.push({date:dt,kw:dateToKW(dt),auditor:aud});
    plans=plans.filter(p=>!(p.bsId===+id&&p.date<=dt));
    log('Auditiert ✓',e.name,'#10B981',aud);
    count++;
  });
  saveNow();
  multiAuditMode=false;planned.clear();
  const btn=document.getElementById('mabtn');
  if(btn){btn.innerHTML='<i class="ti ti-checks"></i> Mehrfach auditieren';btn.style.background='var(--sf2)';btn.style.color='var(--tx)';}
  document.getElementById('ma-bar').style.display='none';
  renderAll();renderKW();
  showToast(`✅ ${count} Baustellen auditiert – ${aud}`,4000);
}

function toggleMultiPlan(){
  // Activate multi-plan mode
  if(multiPlanMode){clearPlanMode();return;}
  // Deactivate route mode if active
  if(planMode){planMode=false;document.getElementById('rbtn').textContent='Route';document.getElementById('rbtn').className='hb';}
  multiPlanMode=true;planned.clear();
  const btn=document.getElementById('mpbtn');
  btn.textContent='✕ Planen beenden';btn.className='hb act';
  // Show planbar with mp-controls
  document.getElementById('planbar').style.display='flex';
  document.getElementById('mp-controls').style.display='flex';
  document.querySelectorAll('.route-only').forEach(el=>el.style.display='none');
  // Set default date to tomorrow
  const tom=new Date();tom.setDate(tom.getDate()+1);
  const ds=tom.getFullYear()+'-'+String(tom.getMonth()+1).padStart(2,'0')+'-'+String(tom.getDate()).padStart(2,'0');
  document.getElementById('mp-date').value=ds;
  document.getElementById('mp-kw').value=dateToKW(today());
  document.getElementById('mp-kw').style.display='none';
  document.getElementById('mp-date').style.display='block';
  // Reset radio to date mode
  const dateRadio=document.querySelector('[name=mp-mode][value=date]');
  if(dateRadio){dateRadio.checked=true;}
  // Populate auditor dropdown
  const sel=document.getElementById('mp-aud');
  sel.innerHTML='<option value="">— Auditor —</option>'+auditors.map(a=>`<option>${a}</option>`).join('');
  if(currentUser)[...sel.options].forEach(o=>{if(o.text===currentUser)sel.value=o.text;});
  updPB();renderMarkers();renderList();
  showToast('📅 Baustellen auswählen dann Datum & Auditor setzen',3000);
}

function clearPlanMode(){
  planMode=false;multiPlanMode=false;multiAuditMode=false;planned.clear();
  document.getElementById('planbar').style.display='none';
  document.getElementById('mp-controls').style.display='none';
  const mac=document.getElementById('ma-controls');if(mac)mac.style.display='none';
  document.querySelectorAll('.route-only').forEach(el=>el.style.display='');
  const rb=document.getElementById('rbtn');if(rb){rb.innerHTML='<i class="ti ti-route"></i> Route';rb.className='hb';}
  const mb=document.getElementById('mpbtn');if(mb){mb.innerHTML='<i class="ti ti-calendar-plus"></i> Planen';mb.className='hb';}
  const mab=document.getElementById('mabtn');if(mab){mab.innerHTML='<i class="ti ti-check"></i> Auditieren';mab.className='hb';}
  renderMarkers();renderList();
}

function setMPMode(mode){
  document.getElementById('mp-date').style.display=mode==='date'?'block':'none';
  const kwEl=document.getElementById('mp-kw');
  kwEl.style.display=mode==='kw'?'block':'none';
  // Set current KW as default when switching to KW mode
  if(mode==='kw'&&!kwEl.value){
    kwEl.value=dateToKW(today());
  }
}

function applyMultiPlan(){
  if(!planned.size){showToast('Keine Baustellen ausgewählt');return;}
  const aud=document.getElementById('mp-aud').value;
  if(!aud){showToast('Bitte Auditor wählen');return;}
  // Read which mode is active by checking which input is visible
  const kwEl2=document.getElementById('mp-kw');
  const mode=kwEl2&&kwEl2.style.display!=='none'?'kw':'date';

  let date='';
  if(mode==='kw'){
    const kw=+document.getElementById('mp-kw').value;
    if(!kw){showToast('Bitte KW eingeben');return;}
    date=kwToDate(kw);
  } else {
    date=document.getElementById('mp-date').value;
    if(!date){showToast('Bitte Datum wählen');return;}
  }
  let count=0;
  planned.forEach(id=>{
    plans=plans.filter(p=>!(p.bsId===id&&p.date===date));
    plans.push({bsId:+id,auditor:aud,date,id:Date.now()+Math.random()});
    const e=data.find(x=>x.id===+id);
    if(e)log('Geplant 📅',e.name,'#6366F1',aud);
    count++;
  });
  saveNow();
  const label=mode==='kw'?`KW ${document.getElementById('mp-kw').value}`:new Date(date+'T12:00:00').toLocaleDateString('de-CH');
  const prevSelId=selId;
  clearPlanMode();
  renderAll();buildCalBS();
  if(prevSelId)setTimeout(()=>selEntry(prevSelId),150);
  showToast(`✅ ${count} Baustellen geplant – ${aud}, ${label}`,4000);
}


function togPI(ev,id){ev.stopPropagation();planned.has(id)?planned.delete(id):planned.add(id);updPB();renderMarkers();renderList();}
function updPB(){
  const b=document.getElementById('planbar');
  if(planned.size>0||planMode||multiPlanMode){
    b.style.display='flex';
    document.getElementById('plan-cnt').textContent=`${planned.size} ausgewählt`;
  } else {
    b.style.display='none';
  }
}

function nnSort(sel){const wG=sel.filter(e=>e.lat&&e.lng),wO=sel.filter(e=>!e.lat||!e.lng);if(wG.length<2)return sel;let rem=[...wG];rem.sort((a,b)=>b.lat-a.lat||(a.lng-b.lng));let cur=rem.shift();const s=[cur];while(rem.length){let bi=0,bd=999;rem.forEach((e,i)=>{const d=Math.sqrt((e.lat-cur.lat)**2+(e.lng-cur.lng)**2);if(d<bd){bd=d;bi=i;}});cur=rem.splice(bi,1)[0];s.push(cur);}return[...s,...wO];}
function openMaps(entries){
  let sel=entries||data.filter(e=>planned.has(e.id)&&e.addr);
  if(!sel.length){showToast('Keine Adressen');return;}
  sel=nnSort(sel);
  const start=localStorage.getItem('audit_start')||'';
  const pts=sel.map(e=>encodeURIComponent(e.addr));
  if(pts.length>10){showToast(`Google Maps erlaubt max. 10 Stopps – die ersten 10 von ${pts.length} werden geöffnet`,4000);pts.splice(10);}
  const url=start?`https://www.google.com/maps/dir/${encodeURIComponent(start)}/${pts.join('/')}`:`https://www.google.com/maps/dir/${pts.join('/')}`;
  window.open(url,'_blank');
}
async function setStart(){const c=localStorage.getItem('audit_start')||'';const v=await askText('Startadresse für Routenplanung:',c);if(v!==null){localStorage.setItem('audit_start',v.trim());showToast(v.trim()?`📍 ${v}`:'Startadresse gelöscht',3000);}}


// ═══ SELECTS ═══
function fillFDept(cur){
  const el=document.getElementById('f-dept');if(!el)return;
  const opts=getAllDepts();
  if(cur&&!opts.includes(cur))opts.push(cur); // kombinierte/alte Werte nie verlieren
  el.innerHTML='<option value="">— Bitte wählen —</option>'+opts.map(d=>`<option value="${d.replace(/"/g,'&quot;')}">${d}</option>`).join('');
  el.value=cur||'';
}
function buildSelects(){fillFDept('');buildDF();buildAudSels();}
function buildDF(){
  const el=document.getElementById('dsel');if(!el)return;
  const cur=el.value;
  const depts=data.length>0?[...new Set(data.map(e=>e.dept).filter(Boolean))].sort():ALL_DEPTS;
  el.innerHTML='<option value="">Alle Abteilungen</option>'+depts.map(d=>`<option value="${d}">${d}</option>`).join('');
  if(depts.includes(cur))el.value=cur;
  el.onchange=()=>{
renderMarkers();renderList();
  };
  const sf=document.getElementById('stsel');if(sf)sf.onchange=()=>{renderMarkers();renderList();};
  const srch=document.getElementById('srch');if(srch)srch.oninput=()=>{renderMarkers();renderList();};
}
function getAvailableYears(){
  const years=new Set();
  const curYr=new Date().getFullYear();
  years.add(curYr);
  data.forEach(e=>(e.auditHistory||[]).forEach(h=>{if(h.date)years.add(parseInt(h.date.slice(0,4)));} ));
  return [...years].sort((a,b)=>b-a);
}

function buildYearSelects(){
  const years=getAvailableYears();
  const curYr=new Date().getFullYear();
  ['aud-year','xl-year'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    const cur=+el.value||curYr;
    el.innerHTML=years.map(y=>`<option value="${y}"${y===cur?' selected':''}>${y}</option>`).join('');
  });
}

function getSelectedYear(selId){
  const el=document.getElementById(selId);
  return el?+el.value:new Date().getFullYear();
}

function buildAudSels(){
  const o='<option value="">—</option>'+auditors.map(a=>`<option>${a}</option>`).join('');
  ['aud-pick','plan-aud','cal-aud','fer-aud','pa-aud'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=o;});
  // Populate KW auditor filter
  const kwF=document.getElementById('kw-aud-filter');
  if(kwF){
    const cur=kwF.value;
    kwF.innerHTML='<option value="">Alle Auditoren</option>'+auditors.map(a=>`<option value="${a}">${a}</option>`).join('');
    kwF.value=cur||'';
  }
  setTimeout(prefillAuditor,50);
}
function buildAudPASel(){const o='<option value="">—</option>'+auditors.map(a=>`<option>${a}</option>`).join('');const el=document.getElementById('pa-aud');if(el)el.innerHTML=o;}
function buildCalBS(){const s=document.getElementById('cal-bs');if(!s)return;const c=s.value;s.innerHTML='<option value="">Baustelle…</option>'+data.filter(e=>e.active&&!e.paused).sort((a,b)=>(a.dept||'').localeCompare(b.dept||'')||(a.psp||'~').localeCompare(b.psp||'~')||a.name.localeCompare(b.name)).map(e=>`<option value="${e.id}">${e.type==='werkhof'?'🏠 ':''}${escH(bsLabelText(e))}</option>`).join('');if(c)s.value=c;}
// ═══ AUDITOREN ═══
function renderAudCodes(){
  const el=document.getElementById('aud-codes-list');if(!el)return;
  el.innerHTML=auditors.map(a=>{
    const col=aC(a);
    const code=AUD_CODES[a]||(a?a.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2):'XX');
    return`<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--sf2);border-radius:8px;border:1px solid var(--bd)">
      <span style="width:28px;height:28px;border-radius:50%;background:${col};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff">${code}</span>
      <span style="font-size:12px;color:var(--tx)">${a}</span>
      <input value="${code}" maxlength="4" onchange="setAudCode('${a}',this.value)"
        style="width:40px;padding:3px 6px;border:1px solid var(--bd);border-radius:5px;font-size:12px;font-weight:700;text-align:center;background:var(--sf);color:var(--tx);text-transform:uppercase">
    </div>`;
  }).join('');
}
function setAudCode(name,code){
  AUD_CODES[name]=code.toUpperCase().slice(0,4);
  saveAudCodes();renderAudCodes();renderAll();
  showToast('✓ Kürzel gespeichert',1500);
}
function setAudTab(tab){
  ['overview','ferien','dept','rapp'].forEach(t=>{
    const panel=document.getElementById('aud-panel-'+t);
    if(panel)panel.style.display=t===tab?'':'none';
    const btn=document.getElementById('aud-tab-'+t);
    if(btn){
      btn.style.borderBottomColor=t===tab?'var(--blue)':'transparent';
      btn.style.color=t===tab?'var(--blue)':'var(--tx2)';
    }
  });
  if(tab==='ferien'){renderFerList();renderFerChart();renderWunschFerien();}
  if(tab==='rapp')renderRapporte();
}
function renderAudTotals(){
  const el=document.getElementById('aud-totals-content');if(!el)return;
  let totalQ=0,totalU=0,totalA=0,count=0;
  auditors.forEach(a=>{
    const m=auditorMeta[a]||{};
    const q=m.qms||0,u=m.ums||0,am2=m.ams||0;
    if(q+u+am2>0){totalQ+=q;totalU+=u;totalA+=am2;count++;}
  });
  if(!count){el.innerHTML='<div style="font-size:12px;color:var(--tx3)">Noch keine Anstellungsdaten erfasst.</div>';return;}
  const total=totalQ+totalU+totalA;
  el.innerHTML=`
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px">
      <div style="text-align:center;padding:12px 20px;background:#EEF2FF;border-radius:10px;min-width:80px">
        <div style="font-size:22px;font-weight:700;color:#6366F1">${totalQ}%</div>
        <div style="font-size:11px;color:#6366F1;font-weight:600;margin-top:2px">QMS</div>
      </div>
      <div style="text-align:center;padding:12px 20px;background:#F0FDF4;border-radius:10px;min-width:80px">
        <div style="font-size:22px;font-weight:700;color:#10B981">${totalU}%</div>
        <div style="font-size:11px;color:#10B981;font-weight:600;margin-top:2px">UMS</div>
      </div>
      <div style="text-align:center;padding:12px 20px;background:#FFFBEB;border-radius:10px;min-width:80px">
        <div style="font-size:22px;font-weight:700;color:#F59E0B">${totalA}%</div>
        <div style="font-size:11px;color:#F59E0B;font-weight:600;margin-top:2px">AMS</div>
      </div>
      <div style="text-align:center;padding:12px 20px;background:var(--sf2);border-radius:10px;min-width:80px">
        <div style="font-size:22px;font-weight:700;color:var(--tx)">${totalQ+totalU+totalA}%</div>
        <div style="font-size:11px;color:var(--tx2);font-weight:600;margin-top:2px">Total</div>
      </div>
    </div>
    <div style="font-size:11px;color:var(--tx3)">${count} Auditoren mit Anstellungsdaten</div>`;
}
function renderAudTags(){
  document.getElementById('aud-tags').innerHTML=auditors.map((a,i)=>`<span class="atag" style="background:${aC(a)};display:inline-flex;align-items:center;gap:4px">
    <input type="color" value="${aC(a)}" onchange="saveAudColor('${a}',this.value)" title="Farbe wählen" style="width:14px;height:14px;border:none;border-radius:50%;padding:0;cursor:pointer;background:none;opacity:.8">
    ${a}<button class="atag-x" onclick="rmAud(${i})">×</button>
  </span>`).join('');
}

function rmAud(i){undoPoint(`${auditors[i]} entfernt`,()=>{renderAudTags();renderAuditors();});auditors.splice(i,1);buildAudSels();renderAudTags();renderAuditors();saveNow();}
// ═══ FERIEN ═══
let _ferOpen=false;
function toggleFerList(){
  _ferOpen=!_ferOpen;
  document.getElementById('fer-list-wrap').style.display=_ferOpen?'':'none';
  document.getElementById('fer-toggle-icon').textContent=_ferOpen?'▲ ausblenden':'▼ einblenden';
}

function ferIsAdmin(){return document.body.classList.contains('admin-mode');}
function addFerien(){if(!ferIsAdmin()){showToast('Fixe Ferien erfasst der Admin – trag unten einen Wunsch ein',3500);return;}const aud=document.getElementById('fer-aud').value,von=document.getElementById('fer-von').value,bis=document.getElementById('fer-bis').value,lbl=document.getElementById('fer-lbl').value.trim()||'Ferien';if(!aud||!von||!bis){showToast('Alle Felder erforderlich');return;}if(bis<von){showToast('Bis muss nach Von sein');return;}ferien.push({id:Date.now(),auditor:aud,von,bis,label:lbl});['fer-von','fer-bis','fer-lbl'].forEach(id=>document.getElementById(id).value='');renderFerList();renderFerChart();saveNow();showToast('✓ Ferien erfasst');}
function rmFerien(id){
  if(!ferIsAdmin()){showToast('Nur Admins können fixe Ferien löschen');return;}
  const f=ferien.find(x=>x.id===id);if(!f)return;
  undoPoint(`Ferien ${f.auditor} ${fd(f.von)}–${fd(f.bis)} gelöscht`,()=>{renderFerList();renderFerChart();});
  ferien=ferien.filter(x=>x.id!==id);renderFerList();renderFerChart();saveNow();
}
// Ferien bzw. Wunsch bearbeiten (gemeinsamer Dialog)
async function ferEditDialog(item,isWish){
  const admin=ferIsAdmin();
  const fields=[];
  if(admin)fields.push({k:'auditor',l:'Auditor',type:'select',v:item.auditor,opts:[...new Set([item.auditor,...auditors])]});
  fields.push({k:'von',l:'Von',type:'date',v:item.von},{k:'bis',l:'Bis',type:'date',v:item.bis},{k:'label',l:isWish?'Notiz':'Bezeichnung',v:item.label||''});
  const r=await uiForm({title:(isWish?'Wunschferien':'Ferien')+' bearbeiten – '+item.auditor,fields,extra:'Löschen',
    validate:o=>!o.von||!o.bis?'Von und Bis sind nötig':o.bis<o.von?'Bis muss nach Von sein':''});
  return r;
}
async function editFerien(id){
  if(!ferIsAdmin()){showToast('Nur Admins können fixe Ferien bearbeiten');return;}
  const f=ferien.find(x=>x.id===id);if(!f)return;
  const r=await ferEditDialog(f,false);if(!r)return;
  if(r==='extra'){rmFerien(id);return;}
  undoPoint('Ferien geändert',()=>{renderFerList();renderFerChart();});
  Object.assign(f,{auditor:r.auditor||f.auditor,von:r.von,bis:r.bis,label:r.label||'Ferien'});
  renderFerList();renderFerChart();saveNow();
}
// ═══ WUNSCHFERIEN ═══
// Jeder Auditor trägt eigene Wunschtermine ein (für sich selbst, kein Dropdown für Nicht-
// Admins), alle sehen alle Wünsche zur gegenseitigen Absprache, Admin bestätigt einzeln ->
// wird automatisch zum echten, fixen Ferien-Eintrag.
function renderWunschFerien(){
  const isAdmin=document.body.classList.contains('admin-mode');
  const wrap=document.getElementById('wf-aud-wrap');
  if(wrap){
    if(isAdmin){
      wrap.innerHTML=`<div><label>Auditor</label><select id="wf-aud"><option value="">—</option>${auditors.map(a=>`<option value="${a}">${a}</option>`).join('')}</select></div>`;
      const sel=document.getElementById('wf-aud');
      if(sel&&currentUser&&auditors.includes(currentUser))sel.value=currentUser;
    }else{
      wrap.innerHTML=`<div><label>Auditor</label><div style="padding:7px 9px;background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rs);font-size:12px;color:var(--tx)">${currentUser||'—'}</div></div>`;
    }
  }
  renderWunschList();
  renderWunschChart();
}
function addWunschFerien(){
  const isAdmin=document.body.classList.contains('admin-mode');
  const aud=isAdmin?(document.getElementById('wf-aud')?.value||''):currentUser;
  const von=document.getElementById('wf-von').value,bis=document.getElementById('wf-bis').value,lbl=document.getElementById('wf-lbl').value.trim()||'Wunsch';
  if(!aud||!von||!bis){showToast('Alle Felder erforderlich');return;}
  if(bis<von){showToast('Bis muss nach Von sein');return;}
  ferienWunsch.push({id:Date.now(),auditor:aud,von,bis,label:lbl});
  ['wf-von','wf-bis','wf-lbl'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  renderWunschList();renderWunschChart();saveNow();showToast('✓ Wunsch erfasst');
}
function rmWunschFerien(id){
  const w=ferienWunsch.find(x=>x.id===id);
  const isAdmin=document.body.classList.contains('admin-mode');
  if(w&&!isAdmin&&w.auditor!==currentUser){showToast('Nur eigene Wünsche löschbar');return;}
  if(w)undoPoint(`Wunsch ${w.auditor} ${fd(w.von)}–${fd(w.bis)} gelöscht`,()=>{renderWunschList();renderWunschChart();});
  ferienWunsch=ferienWunsch.filter(x=>x.id!==id);
  renderWunschList();renderWunschChart();saveNow();
}
async function editWunsch(id){
  const w=ferienWunsch.find(x=>x.id===id);if(!w)return;
  if(!ferIsAdmin()&&w.auditor!==currentUser){showToast('Nur eigene Wünsche bearbeitbar');return;}
  const r=await ferEditDialog(w,true);if(!r)return;
  if(r==='extra'){rmWunschFerien(id);return;}
  undoPoint('Wunsch geändert',()=>{renderWunschList();renderWunschChart();});
  Object.assign(w,{auditor:ferIsAdmin()?(r.auditor||w.auditor):w.auditor,von:r.von,bis:r.bis,label:r.label||'Wunsch'});
  renderWunschList();renderWunschChart();saveNow();
}
// Balken in der Übersicht angeklickt
function ferBarClick(id,isWish){if(isWish)editWunsch(id);else if(ferIsAdmin())editFerien(id);}
// Admin bestätigt einen Wunsch -> wird zum echten Ferien-Eintrag, Wunsch verschwindet aus der Liste
function confirmWunsch(id){
  const w=ferienWunsch.find(x=>x.id===id);if(!w)return;
  ferien.push({id:Date.now(),auditor:w.auditor,von:w.von,bis:w.bis,label:w.label==='Wunsch'?'Ferien':w.label});
  ferienWunsch=ferienWunsch.filter(x=>x.id!==id);
  log('Ferien bestätigt ✓ (Wunsch)',w.auditor,'#10B981','');
  renderWunschList();renderWunschChart();renderFerList();renderFerChart();saveNow();
  showToast('✓ Bestätigt und übernommen: '+w.auditor);
}
function renderWunschList(){
  const el=document.getElementById('wf-list');if(!el)return;
  const isAdmin=document.body.classList.contains('admin-mode');
  if(!ferienWunsch.length){el.innerHTML='<div style="font-size:11px;color:var(--tx3);padding:6px">Noch keine Wunschferien erfasst.</div>';return;}
  el.innerHTML=ferienWunsch.slice().sort((a,b)=>a.von.localeCompare(b.von)).map(w=>{
    const c=aC(w.auditor),ini=w.auditor.split(' ').map(x=>x[0]).join('');
    const canDelete=isAdmin||w.auditor===currentUser;
    return`<div class="fi">
      <div class="fiav" style="background:${c}">${ini}</div>
      <div class="fiinfo">${w.auditor} – ${w.label}<div class="fid">${fd(w.von)} – ${fd(w.bis)}</div></div>
      ${isAdmin?`<button onclick="confirmWunsch(${w.id})" title="Bestätigen und in echte Ferien übernehmen" style="border:none;background:#10B981;color:#fff;border-radius:6px;padding:5px 9px;font-size:11px;cursor:pointer;margin-right:4px;white-space:nowrap">✓ Bestätigen</button>`:''}
      ${canDelete?`<button class="fidel" onclick="editWunsch(${w.id})" title="Bearbeiten" style="color:var(--blue)"><i class="ti ti-pencil"></i></button><button class="fidel" onclick="rmWunschFerien(${w.id})" title="Löschen"><i class="ti ti-trash"></i></button>`:''}
    </div>`;
  }).join('');
}
function renderWunschChart(){
  const el=document.getElementById('wf-chart');if(!el)return;
  el.innerHTML=ferGanttHTML(ferienWunsch,true);
}
// ═══ GEMEINSAME FERIEN-GANTT-DARSTELLUNG ═══
// Eine Funktion für beide Übersichten (fixe Ferien + Wunschferien), damit Darstellung, Jahr und
// Zeitraum immer identisch sind. Zeitraum: ganzes Jahr oder Tertial (4 Monate) - im Tertial
// werden einzelne Tage, Wochenenden, KW und Beschriftungen in den Balken sichtbar.
let _ferPeriod='Y';
function setFerPeriod(p){
  _ferPeriod=p;
  document.querySelectorAll('#fer-period-btns button').forEach(b=>{
    const on=b.dataset.p===p;
    b.style.background=on?'var(--blue)':'var(--sf2)';b.style.color=on?'#fff':'var(--tx)';
  });
  renderFerChart();renderWunschChart();
}
function fillFerYearSelect(){
  const sel=document.getElementById('fer-year');if(!sel||sel.options.length)return;
  const y=new Date().getFullYear();
  sel.innerHTML=[y-1,y,y+1,y+2].map(v=>`<option value="${v}"${v===y?' selected':''}>${v}</option>`).join('');
}
function ferISO(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function ferLocalDate(s){const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d);}
function ferGanttHTML(entries,isWish){
  fillFerYearSelect();
  const yr=+(document.getElementById('fer-year')?.value||new Date().getFullYear());
  const ranges={Y:[0,11],T1:[0,3],T2:[4,7],T3:[8,11]};
  const [m0,m1]=ranges[_ferPeriod]||ranges.Y;
  const start=new Date(yr,m0,1),end=new Date(yr,m1+1,0);
  const DAY=86400000;
  const nDays=Math.round((end-start)/DAY)+1;
  const idx=d=>Math.round((d-start)/DAY);
  const pct=i=>(i/nDays*100).toFixed(3);
  const zoom=_ferPeriod!=='Y';
  const rowH=zoom?34:26;
  const mNames=zoom?['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']:['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  // Monatsbeschriftung + Monatslinien
  let monthLbl='',grid='';
  for(let m=m0;m<=m1;m++){
    const a=idx(new Date(yr,m,1)),b=idx(new Date(yr,m+1,1));
    monthLbl+=`<div style="position:absolute;left:${pct(a)}%;width:${pct(b-a)}%;text-align:center;font-size:10px;font-weight:700;color:var(--tx2)">${mNames[m]}</div>`;
    grid+=`<div style="position:absolute;left:${pct(a)}%;top:0;bottom:0;border-left:1px solid var(--bd)"></div>`;
  }
  // Im Tertial: Wochenenden schattiert + KW-Beschriftung an jedem Montag
  let kwLbl='';
  if(zoom){
    for(let i=0;i<nDays;i++){
      const d=new Date(yr,m0,1+i);const wd=d.getDay();
      if(wd===0||wd===6)grid+=`<div style="position:absolute;left:${pct(i)}%;width:${pct(1)}%;top:0;bottom:0;background:rgba(148,163,184,.18)"></div>`;
      if(wd===1){
        kwLbl+=`<div style="position:absolute;left:${pct(i)}%;font-size:9px;color:var(--tx3);white-space:nowrap">KW${dateToKW(ferISO(d))}</div>`;
        grid+=`<div style="position:absolute;left:${pct(i)}%;top:0;bottom:0;border-left:1px dashed var(--bd);opacity:.6"></div>`;
      }
    }
  }
  const dayCounts=new Array(nDays).fill(0);
  const rows=auditors.map(a=>{
    const col=aC(a),ini=a.split(' ').map(w=>w[0]).join('');
    const bars=entries.filter(f=>f.auditor===a).map(f=>{
      const s=Math.max(0,idx(ferLocalDate(f.von))),e=Math.min(nDays-1,idx(ferLocalDate(f.bis)));
      if(s>e)return'';
      if(isWish)for(let i=s;i<=e;i++)dayCounts[i]++;
      const len=e-s+1; // inklusive Enddatum -> einzelne Tage werden korrekt als 1 Tag dargestellt
      const bg=isWish?`repeating-linear-gradient(45deg,${col}cc,${col}cc 4px,${col}55 4px,${col}55 8px)`:col;
      const border=isWish?`1.5px dashed ${col}`:'none';
      const txt=zoom?`<span style="padding:0 4px;font-size:10px;font-weight:600;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.label||''}</span>`:'';
      const canEdit=isWish?(ferIsAdmin()||a===currentUser):ferIsAdmin();
      return`<div ${canEdit?`onclick="ferBarClick(${f.id},${isWish})" `:''}title="${a} – ${f.label||''}: ${fd(f.von)} – ${fd(f.bis)} (${len} Tag${len>1?'e':''})${canEdit?' · antippen zum Bearbeiten':''}" style="${canEdit?'cursor:pointer;':''}position:absolute;left:${pct(s)}%;width:max(${pct(len)}%,4px);top:3px;bottom:3px;background:${bg};border:${border};border-radius:4px;z-index:2;display:flex;align-items:center;overflow:hidden;box-sizing:border-box">${txt}</div>`;
    }).join('');
    return`<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
      <div style="width:120px;flex-shrink:0;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--tx)" title="${a}">
        <span style="width:22px;height:22px;border-radius:50%;background:${col};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0">${ini}</span>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.split(' ')[0]}</span>
      </div>
      <div style="flex:1;height:${rowH}px;background:var(--sf2);border-radius:4px;position:relative;overflow:hidden">${grid}${bars}</div>
    </div>`;
  }).join('');
  // Heute-Markierung (nur wenn im gewählten Zeitraum)
  const tI=idx(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  const todayMark=(tI>=0&&tI<nDays)?`<div style="position:absolute;left:calc(128px + (100% - 128px) * ${(tI+0.5)/nDays});top:0;bottom:0;width:2px;background:#EF4444;opacity:.7;pointer-events:none;z-index:3" title="Heute"></div>`:'';
  // Überlappungsstreifen (nur Wunschferien): ab 2 Personen gleichzeitig rot
  let overlap='';
  if(isWish){
    let seg=-1,segs='';
    for(let i=0;i<=nDays;i++){
      const hit=i<nDays&&dayCounts[i]>=S('wf_overlap');
      if(hit&&seg<0)seg=i;
      if(!hit&&seg>=0){segs+=`<div title="Überschneidung: ${fd(ferISO(new Date(yr,m0,1+seg)))} – ${fd(ferISO(new Date(yr,m0,i)))}" style="position:absolute;left:${pct(seg)}%;width:max(${pct(i-seg)}%,3px);top:0;bottom:0;background:#EF4444"></div>`;seg=-1;}
    }
    overlap=`<div style="display:flex;align-items:center;gap:8px;margin-top:6px">
      <div style="width:120px;flex-shrink:0;font-size:10px;font-weight:600;color:#EF4444">⚠ Überschneidung</div>
      <div style="flex:1;height:8px;background:var(--sf2);border-radius:4px;position:relative;overflow:hidden">${segs}</div>
    </div>`;
  }
  if(!entries.length)return`<div style="font-size:11px;color:var(--tx3)">${isWish?'Noch keine Wunschferien erfasst.':'Keine Ferien erfasst.'}</div>`;
  return`<div style="overflow-x:auto"><div style="min-width:${zoom?900:640}px">
    <div style="display:flex;gap:8px;margin-bottom:2px"><div style="width:120px;flex-shrink:0"></div><div style="flex:1;position:relative;height:16px">${monthLbl}</div></div>
    ${zoom?`<div style="display:flex;gap:8px;margin-bottom:4px"><div style="width:120px;flex-shrink:0"></div><div style="flex:1;position:relative;height:13px">${kwLbl}</div></div>`:''}
    <div style="position:relative">${rows}${todayMark}</div>
    ${overlap}
    <div style="font-size:10px;color:var(--tx3);margin-top:6px;text-align:right">${isWish?'Schraffiert = Wunsch (noch nicht bestätigt) · ':''}Roter Strich = Heute · Balken antippen/überfahren für Details</div>
  </div></div>`;
}
function renderFerChart(){
  const el=document.getElementById('fer-chart');if(!el)return;
  el.innerHTML=ferGanttHTML(ferien,false);
}
function renderFerList(){
  const admin=ferIsAdmin();
  const hint=document.getElementById('fer-fix-hint');if(hint)hint.style.display=admin?'none':'';
  document.getElementById('fer-list').innerHTML=ferien.length?ferien.slice().sort((a,b)=>a.von.localeCompare(b.von)).map(f=>{const c=aC(f.auditor),ini=f.auditor.split(' ').map(w=>w[0]).join('');
    return`<div class="fi"><div class="fiav" style="background:${c}">${ini}</div><div class="fiinfo">${f.auditor} – ${f.label}<div class="fid">${fd(f.von)} – ${fd(f.bis)}</div></div>${admin?`<button class="fidel" onclick="editFerien(${f.id})" title="Bearbeiten" style="color:var(--blue)"><i class="ti ti-pencil"></i></button><button class="fidel" onclick="rmFerien(${f.id})" title="Löschen"><i class="ti ti-trash"></i></button>`:''}</div>`;}).join(''):'<div style="font-size:11px;color:var(--tx3);padding:6px">Noch keine Ferien.</div>';
}
// ═══ PERSONEN-AUDITS ═══

function rmPA(id){personAudits=personAudits.filter(p=>p.id!==id);renderPA();renderPA2();renderAuditors();saveNow();showToast('🗑 Gelöscht',1500);}
// ═══ PERSONEN-AUDITS ═══
let _selectedPersons=[];

function setPATab(tab){
  ['audit','register','matrix'].forEach(t=>{
    document.getElementById('pa-panel-'+t).style.display=t===tab?'flex':'none';
    const btn=document.getElementById('pa-tab-'+t);
    if(btn){
      btn.style.borderBottomColor=t===tab?'var(--blue)':'transparent';
      btn.style.color=t===tab?'var(--blue)':'var(--tx2)';
    }
  });
  if(tab==='register')renderPersonRegister();
  if(tab==='matrix')renderPersonMatrix();
  if(tab==='audit'){
    // Prefill auditor
    const sel=document.getElementById('pa-aud2');
    if(sel&&currentUser)[...sel.options].forEach(o=>{if(o.value===currentUser)sel.value=currentUser;});
  }
}

function paSuggest(q){
  const sug=document.getElementById('pa-suggestions');
  if(!q||q.length<2){sug.style.display='none';return;}
  const ql=q.toLowerCase();
  const matches=persons.filter(p=>
    String(p.pnr).includes(q)||
    (p.nachname||'').toLowerCase().includes(ql)||
    (p.vorname||'').toLowerCase().includes(ql)
  ).filter(p=>!_selectedPersons.some(s=>s.id===p.id)).slice(0,8);
  if(!matches.length){sug.style.display='none';return;}
  sug.innerHTML=matches.map(p=>`<div onclick="selectPerson(${p.id})" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid var(--bd)"
    onmouseover="this.style.background='var(--sf2)'" onmouseout="this.style.background=''">
    <strong>${p.nachname} ${p.vorname}</strong>
    <span style="color:var(--tx2);margin-left:6px">${p.pnr}</span>
    <span style="color:var(--tx3);margin-left:6px;font-size:11px">${p.abt} · ${p.firma||''}</span>
  </div>`).join('');
  sug.style.display='block';
}

function selectPerson(id){
  const p=persons.find(x=>x.id===id);if(!p)return;
  if(!_selectedPersons.some(x=>x.id===id))_selectedPersons.push(p);
  document.getElementById('pa-search').value='';
  document.getElementById('pa-suggestions').style.display='none';
  renderSelectedPersons();
  document.getElementById('pa-search').focus();
}
function unselectPerson(id){_selectedPersons=_selectedPersons.filter(x=>x.id!==id);renderSelectedPersons();}
function renderSelectedPersons(){
  const box=document.getElementById('pa-selected');if(!box)return;
  if(!_selectedPersons.length){box.style.display='none';return;}
  box.style.display='block';
  document.getElementById('pa-sel-chips').innerHTML=_selectedPersons.map((p,i)=>`<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 6px 4px 10px;background:var(--sf);border:1px solid ${i===0?'var(--blue)':'var(--bd)'};border-radius:14px;font-size:12px"><b>${escH(p.nachname)} ${escH(p.vorname||'')}</b><span style="color:var(--tx3);font-size:10px">${escH(String(p.pnr))}</span><button onclick="unselectPerson(${p.id})" title="Entfernen" style="border:none;background:none;cursor:pointer;color:#EF4444;font-size:12px;line-height:1">✕</button></span>`).join('');
  const n=_selectedPersons.length,f=_selectedPersons[0];
  document.getElementById('pa-sel-info').textContent=n>1
    ?`${n} Personen in einem Audit – zählt als 1 Audit, in der Jahresmatrix erhalten alle den Eintrag. Die erstgenannte Person (${f.nachname}) bestimmt die Abteilung: ${f.abt||'–'}`
    :[f.abt,f.firma,f.ort].filter(Boolean).join(' · ');
}
// ═══ PERSONEN-REGISTER: Auswahllisten (Abteilung / Arbeitsort / Firma) ═══
// Listen liegen in deptMeta._personLists (synchronisiert). Werte, die im Register vorkommen, werden
// automatisch ergänzt (Gross-/Kleinschreibung wird als gleich behandelt) - so geht beim Umstellen nichts verloren.
const PL_KINDS={abt:{l:'Abteilung'},ort:{l:'Arbeitsort'},firma:{l:'Firma'}};
function paPnrs(a){return(a.pnrs&&a.pnrs.length?a.pnrs:[a.pnr]).filter(x=>x!==undefined&&x!==null&&x!=='').map(String);}
function personLists(){
  deptMeta._personLists=deptMeta._personLists||{};
  const pl=deptMeta._personLists;
  ['abt','ort','firma'].forEach(k=>{
    if(!Array.isArray(pl[k]))pl[k]=[];
    let ch=false;
    persons.forEach(p=>{
      const v=(p[k]||'').trim();if(!v)return;
      const ex=pl[k].find(x=>x.toLowerCase()===v.toLowerCase());
      if(ex){if(p[k]!==ex)p[k]=ex;}          // abweichende Schreibweise auf die Listen-Schreibweise vereinheitlichen
      else{pl[k].push(v);ch=true;}
    });
    if(ch)pl[k].sort((a,b)=>a.localeCompare(b));
  });
  return pl;
}
function fillPersonSelects(vals){
  const pl=personLists();
  [['pf-abt','abt'],['pf-ort','ort'],['pf-firma','firma']].forEach(([id,k])=>{
    const el=document.getElementById(id);if(!el)return;
    const cur=(vals&&vals[k]!==undefined)?vals[k]:el.value;
    const canon=cur?pl[k].find(o=>o.toLowerCase()===String(cur).trim().toLowerCase()):null;
    el.innerHTML='<option value="">— wählen —</option>'+pl[k].map(o=>`<option value="${escH(o)}">${escH(o)}</option>`).join('')+'<option value="__new__">＋ Neuer Eintrag…</option>';
    el.value=canon||'';
  });
}
async function pfSelChange(kind,el){
  if(el.value!=='__new__')return;
  const v=((await askText(`Neue ${PL_KINDS[kind].l} (steht danach für alle zur Auswahl):`,'',{ok:'Hinzufügen'}))||'').trim();
  if(!v){el.value='';return;}
  const pl=personLists();
  const ex=pl[kind].find(x=>x.toLowerCase()===v.toLowerCase());
  if(ex){showToast(`«${ex}» gibt es schon – ausgewählt`,2500);fillPersonSelects({[kind]:ex});return;}
  pl[kind].push(v);pl[kind].sort((a,b)=>a.localeCompare(b));saveDepts();
  fillPersonSelects({[kind]:v});
}
let _editPersonId=null;
function pfTitle(){const t=document.getElementById('pf-title');if(t)t.textContent=_editPersonId!==null?'Person bearbeiten':'Person hinzufügen';}
function closePersonForm(){_editPersonId=null;document.getElementById('pa-add-form').style.display='none';pfTitle();}
function openAddPerson(){
  const f=document.getElementById('pa-add-form');
  const opening=f.style.display==='none'||_editPersonId!==null;
  _editPersonId=null;
  f.style.display=opening?'block':'none';
  ['pf-pnr','pf-nach','pf-vor'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  fillPersonSelects({abt:'',ort:'',firma:''});
  const sp=document.getElementById('pf-spez');if(sp)sp.value='';
  pfTitle();
}
function openEditPerson(id){
  const p=persons.find(x=>x.id===id);if(!p)return;
  _editPersonId=id;
  const f=document.getElementById('pa-add-form');f.style.display='block';
  document.getElementById('pf-pnr').value=p.pnr;
  document.getElementById('pf-nach').value=p.nachname||'';
  document.getElementById('pf-vor').value=p.vorname||'';
  fillPersonSelects({abt:p.abt||'',ort:p.ort||'',firma:p.firma||''});
  document.getElementById('pf-spez').value=p.spez||'';
  pfTitle();f.scrollIntoView({block:'nearest'});
}
function savePerson(){
  const pnr=document.getElementById('pf-pnr').value.trim();
  const nach=document.getElementById('pf-nach').value.trim();
  const vor=document.getElementById('pf-vor').value.trim();
  const sv=id=>{const v=document.getElementById(id).value;return v==='__new__'?'':v.trim();};
  const abt=sv('pf-abt'),ort=sv('pf-ort'),firma=sv('pf-firma');
  if(!pnr||!nach){showToast('Personalnummer und Nachname erforderlich');return;}
  if(!abt){showToast('Bitte eine Abteilung wählen');return;}
  const spez=document.getElementById('pf-spez').value;
  if(_editPersonId!==null){
    const p=persons.find(x=>x.id===_editPersonId);if(!p){closePersonForm();return;}
    if(persons.some(x=>x.id!==p.id&&String(x.pnr)===pnr)){showToast('Personalnummer bereits vorhanden');return;}
    const oldPnr=String(p.pnr),full=(nach+' '+vor).trim();
    Object.assign(p,{pnr,nachname:nach,vorname:vor,abt,ort,firma,spez});
    // Bestehende Personen-Audits mitziehen (Nummer, Name, Abteilung/Firma der erstgenannten Person)
    personAudits.forEach(a=>{
      if(a.pnrs){
        const i=a.pnrs.findIndex(x=>String(x)===oldPnr);if(i<0)return;
        a.pnrs[i]=pnr;a.names=a.names||[];a.names[i]=full;a.person=a.names.join(', ');
        if(i===0){a.pnr=pnr;a.kat=abt;a.firma=firma;}
      }else if(String(a.pnr)===oldPnr){a.pnr=pnr;a.person=full;a.kat=abt;a.firma=firma;}
    });
    closePersonForm();saveNow();renderPersonRegister();renderPA2();
    showToast('✓ Person aktualisiert');return;
  }
  if(persons.find(p=>String(p.pnr)===pnr)){showToast('Personalnummer bereits vorhanden');return;}
  persons.push({id:Date.now(),pnr,nachname:nach,vorname:vor,abt,ort,firma,spez});
  document.getElementById('pa-add-form').style.display='none';
  saveNow();renderPersonRegister();
  showToast('✓ Person hinzugefügt');
}
// ── Admin: Listen verwalten ──
function openPersonLists(){renderPersonLists();document.getElementById('pl-bg').style.display='flex';}
function renderPersonLists(){
  const pl=personLists();
  const used=(k,v)=>persons.filter(p=>(p[k]||'').trim().toLowerCase()===v.toLowerCase()).length;
  document.getElementById('pl-body').innerHTML=['abt','ort','firma'].map(k=>`<div style="margin-bottom:16px">
    <div style="font-size:12px;font-weight:700;color:var(--tx);margin-bottom:6px">${PL_KINDS[k].l}</div>
    <div style="border:1px solid var(--bd);border-radius:8px">
      ${pl[k].map(v=>`<div style="display:grid;grid-template-columns:1fr 70px 28px;gap:6px;align-items:center;padding:5px 10px;border-bottom:1px solid var(--bd)">
        <input value="${escH(v)}" data-k="${k}" data-old="${escH(v)}" onchange="renamePersonListItem(this.dataset.k,this.dataset.old,this.value)" style="padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px">
        <span style="text-align:center;font-size:11px;color:var(--tx3)">${used(k,v)} Pers.</span>
        <button data-k="${k}" data-v="${escH(v)}" onclick="removePersonListItem(this.dataset.k,this.dataset.v)" title="${used(k,v)?'In Verwendung – nicht löschbar':'Löschen'}" style="background:none;border:none;cursor:pointer;color:${used(k,v)?'var(--tx3)':'#EF4444'};font-size:13px">🗑</button>
      </div>`).join('')||'<div style="padding:8px 10px;font-size:11px;color:var(--tx3)">Noch keine Einträge.</div>'}
      <div style="display:flex;gap:6px;padding:6px 10px">
        <input id="pl-new-${k}" placeholder="Neu hinzufügen…" onkeydown="if(event.key==='Enter')addPersonListItem('${k}')" style="flex:1;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf2);color:var(--tx);font-size:12px">
        <button onclick="addPersonListItem('${k}')" style="padding:5px 12px;border:none;border-radius:5px;background:var(--blue);color:#fff;font-size:12px;font-weight:600;cursor:pointer">+</button>
      </div>
    </div></div>`).join('');
}
function addPersonListItem(k){
  const inp=document.getElementById('pl-new-'+k);const v=(inp.value||'').trim();if(!v)return;
  const pl=personLists();
  if(pl[k].some(x=>x.toLowerCase()===v.toLowerCase())){showToast('Eintrag existiert bereits',2500);return;}
  pl[k].push(v);pl[k].sort((a,b)=>a.localeCompare(b));saveDepts();renderPersonLists();fillPersonSelects();
}
async function renamePersonListItem(k,oldV,newV){
  newV=(newV||'').trim();
  if(!newV||newV===oldV){renderPersonLists();return;}
  const pl=personLists();
  const ex=pl[k].find(x=>x!==oldV&&x.toLowerCase()===newV.toLowerCase());
  if(ex&&!await askConfirm(`«${ex}» existiert bereits. «${oldV}» damit zusammenführen?`,{ok:'Zusammenführen'})){renderPersonLists();return;}
  const tgt=ex||newV;let n=0;
  persons.forEach(p=>{if((p[k]||'').trim().toLowerCase()===oldV.toLowerCase()){p[k]=tgt;n++;}});
  if(k==='abt'){
    personAudits.forEach(a=>{if((a.kat||'').toLowerCase()===oldV.toLowerCase())a.kat=tgt;});
    const m=deptMeta._abtMap||{};   // Zuordnung Register-Abteilung → Planer-Abteilung mitnehmen
    Object.keys(m).forEach(key=>{if(key.toLowerCase()===oldV.toLowerCase()){if(!m[tgt])m[tgt]=m[key];delete m[key];}});
  }
  if(k==='firma')personAudits.forEach(a=>{if((a.firma||'').toLowerCase()===oldV.toLowerCase())a.firma=tgt;});
  pl[k]=pl[k].filter(x=>x!==oldV);if(!ex)pl[k].push(newV);pl[k].sort((a,b)=>a.localeCompare(b));
  saveDepts();saveNow();renderPersonLists();renderPersonRegister();fillPersonSelects();
  showToast(`✓ «${oldV}» → «${tgt}» (${n} Personen angepasst)`,3000);
}
function removePersonListItem(k,v){
  const n=persons.filter(p=>(p[k]||'').trim().toLowerCase()===v.toLowerCase()).length;
  if(n){showToast(`«${v}» wird von ${n} Person(en) verwendet – erst umbenennen oder Personen ändern`,4500);return;}
  undoPoint(`«${v}» aus der Liste gelöscht`,()=>{renderPersonLists();fillPersonSelects();});
  const pl=personLists();pl[k]=pl[k].filter(x=>x!==v);saveDepts();renderPersonLists();fillPersonSelects();
}
function deletePerson(id){
  undoPoint('Person gelöscht',()=>renderPersonRegister());
  persons=persons.filter(p=>p.id!==id);
  saveNow();renderPersonRegister();
  showToast('🗑 Person gelöscht');
}

function renderPersonRegister(){
  personLists();
  const q=(document.getElementById('pa-reg-search')?.value||'').toLowerCase();
  const firma=document.getElementById('pa-reg-firma')?.value||'';
  // Build firma dropdown
  const firmen=[...new Set(persons.map(p=>p.abt).filter(Boolean))].sort();
  const firmaSel=document.getElementById('pa-reg-firma');
  if(firmaSel){
    const cur=firmaSel.value;
    firmaSel.innerHTML='<option value="">Alle Abteilungen</option>'+firmen.map(f=>`<option value="${f}"${f===cur?' selected':''}>${f}</option>`).join('');
  }
  const spezFilter=document.getElementById('pa-reg-spez')?.value||'';
  const filtered=persons.filter(p=>{
    if(firma&&p.abt!==firma)return false;
    if(spezFilter&&p.spez!==spezFilter)return false;
    if(q&&!String(p.pnr).includes(q)&&!(p.nachname||'').toLowerCase().includes(q)&&!(p.vorname||'').toLowerCase().includes(q)&&!(p.abt||'').toLowerCase().includes(q))return false;
    return true;
  }).sort((a,b)=>(a.abt||'').localeCompare(b.abt||'')||(a.nachname||'').localeCompare(b.nachname||''));
  const count=document.getElementById('pa-reg-count');
  if(count)count.textContent='('+filtered.length+' von '+persons.length+')';
  const tbody=document.getElementById('pa-reg-tbody');
  if(!tbody)return;
  tbody.innerHTML=filtered.map(p=>{
    const lastAudit=personAudits.filter(a=>!a.planned&&paPnrs(a).includes(String(p.pnr))).sort((a,b)=>b.date.localeCompare(a.date))[0];
    const spezSel='<select onchange="setPersonSpez('+p.id+',this.value)" style="border:1px solid var(--bd);border-radius:4px;background:var(--sf2);color:var(--tx);font-size:11px;padding:2px 4px">'+
      '<option value="">—</option>'+['Bodenbeläge', 'Brandschutz', 'Asbest'].map(s=>'<option value="'+s+'"'+(p.spez===s?' selected':'')+'>'+s+'</option>').join('')+'</select>';
    return'<tr>'+
      '<td style="font-family:monospace;font-size:11px">'+p.pnr+'</td>'+
      '<td style="font-weight:600">'+p.nachname+'</td>'+
      '<td>'+p.vorname+'</td>'+
      '<td style="font-size:11px">'+p.abt+'</td>'+
      '<td>'+spezSel+'</td>'+
      '<td style="font-size:11px">'+p.ort+'</td>'+
      '<td style="font-size:11px">'+p.firma+'</td>'+
      '<td style="color:var(--tx2);font-size:11px">'+(lastAudit?fd(lastAudit.date)+'<br><span style="color:var(--tx3)">'+lastAudit.auditor+'</span>':'—')+'</td>'+
      '<td style="white-space:nowrap"><button onclick="openEditPerson('+p.id+')" title="Bearbeiten" style="background:none;border:none;cursor:pointer;color:var(--tx2);font-size:13px">✏️</button><button onclick="deletePerson('+p.id+')" class="admin-only" style="background:none;border:none;cursor:pointer;color:#EF4444;font-size:13px">🗑</button></td>'+
    '</tr>';
  }).join('');
}

function renderPersonMatrix(){
  personLists();
  const yr=+(document.getElementById('pa-mx-year')?.value||new Date().getFullYear());
  const firma=document.getElementById('pa-mx-firma')?.value||'';
  const abt=document.getElementById('pa-mx-abt')?.value||'';
  // Populate dropdowns
  const firmen=[...new Set(persons.map(p=>p.firma).filter(Boolean))].sort();
  const abts=[...new Set(persons.map(p=>p.abt).filter(Boolean))].sort();
  const firmaSel=document.getElementById('pa-mx-firma');
  if(firmaSel){const cur=firmaSel.value;firmaSel.innerHTML='<option value="">Alle Firmen</option>'+firmen.map(f=>`<option value="${f}"${f===cur?' selected':''}>${f}</option>`).join('');}
  const abtSel=document.getElementById('pa-mx-abt');
  if(abtSel){const cur=abtSel.value;abtSel.innerHTML='<option value="">Alle Abteilungen</option>'+abts.map(a=>`<option value="${a}"${a===cur?' selected':''}>${a}</option>`).join('');}
  // Year dropdown
  const years=[...new Set([new Date().getFullYear(),...personAudits.map(a=>a.date?+a.date.slice(0,4):0).filter(Boolean)])].sort((a,b)=>b-a);
  const yrSel=document.getElementById('pa-mx-year');
  if(yrSel){const cur=+yrSel.value||new Date().getFullYear();yrSel.innerHTML=years.map(y=>`<option value="${y}"${y===cur?' selected':''}>${y}</option>`).join('');}
  // Filter persons
  const spezF=document.getElementById('pa-mx-spez')?.value||'';
  const ortF=document.getElementById('pa-mx-ort')?.value||'';
  // Populate ort dropdown
  const orte=[...new Set(persons.map(p=>p.ort).filter(Boolean))].sort();
  const ortSel=document.getElementById('pa-mx-ort');
  if(ortSel){const cur=ortSel.value;ortSel.innerHTML='<option value="">Alle Orte</option>'+orte.map(o=>`<option value="${o}"${o===cur?' selected':''}>${o}</option>`).join('');}
  let filtered=persons.filter(p=>{
    if(firma&&p.firma!==firma)return false;
    if(abt&&p.abt!==abt)return false;
    if(spezF&&p.spez!==spezF)return false;
    if(ortF&&p.ort!==ortF)return false;
    return true;
  }).sort((a,b)=>(a.abt||'').localeCompare(b.abt||'')||(a.nachname||'').localeCompare(b.nachname||''));
  const wrap=document.getElementById('pa-matrix-wrap');
  if(!wrap)return;
  if(!filtered.length){wrap.innerHTML='<div style="padding:20px;color:var(--tx3);text-align:center">Keine Personen gefunden.</div>';return;}
  // Build matrix
  const curKW=dateToKW(today());
  let html='<table id="pa-mx-table" style="border-collapse:collapse;font-size:11px;white-space:nowrap"><thead style="position:sticky;top:0;z-index:4"><tr>';
  html+='<th style="position:sticky;left:0;background:var(--sf);z-index:3;padding:5px 8px;border:1px solid var(--bd);min-width:140px;white-space:nowrap">Name</th>';
  html+='<th style="position:sticky;left:140px;background:var(--sf);z-index:3;padding:5px 8px;border:1px solid var(--bd);min-width:60px">Pers.Nr</th>';
  html+='<th style="position:sticky;left:200px;background:var(--sf);z-index:3;padding:5px 8px;border:1px solid var(--bd);min-width:100px">Abt.</th>';
  for(let kw=1;kw<=52;kw++){
    const isCur=kw===curKW;
    html+=`<th style="padding:3px 5px;border:1px solid var(--bd);min-width:28px;text-align:center;background:${isCur?'#EFF6FF':'var(--sf)'};color:${isCur?'var(--blue)':'var(--tx2)'}">`;
    html+=kw+'</th>';
  }
  html+='</tr></thead><tbody>';
  filtered.forEach(function(p,rowI){
    const zebraColor=rowI%2===0?'#fff':'#F8F9FC';
    const auditsThisYear=personAudits.filter(a=>paPnrs(a).includes(String(p.pnr))&&a.date&&a.date.startsWith(yr));
    // Hellgrün: in diesem Jahr bereits auditiert (nur durchgeführte, geplante zählen nicht)
    const audDone=auditsThisYear.some(a=>!a.planned);
    const nameBg=audDone?'#DCFCE7':zebraColor;
    html+='<tr>';
    html+=`<td style="position:sticky;left:0;background:${nameBg};z-index:1;padding:4px 8px;border:1px solid var(--bd);font-weight:600;white-space:nowrap">`+(audDone?'✓ ':'')+p.nachname+' '+p.vorname+'</td>';
    html+=`<td style="position:sticky;left:140px;background:${nameBg};z-index:1;padding:4px 8px;border:1px solid var(--bd);font-family:monospace;font-size:10px">`+p.pnr+'</td>';
    html+=`<td style="position:sticky;left:200px;background:${nameBg};z-index:1;padding:4px 8px;border:1px solid var(--bd);color:var(--tx2);font-size:10px;white-space:nowrap">`+p.abt+'</td>';
    for(let kw=1;kw<=52;kw++){
      const as=auditsThisYear.filter(a=>dateToKW(a.date)===kw);
      const isCur=kw===curKW;
      if(as.length){
        const a=as.find(x=>!x.planned)||as[0],done=!a.planned;
        const ini=(a.auditor||'?').split(' ').map(w=>w[0]).join('');
        const mates=paPnrs(a).length>1?' · gemeinsam mit '+(a.names||[]).filter((n,i)=>String(paPnrs(a)[i])!==String(p.pnr)).join(', '):'';
        html+=`<td style="padding:3px 4px;border:1px solid var(--bd);text-align:center;background:${done?'#F0FDF4':'#EFF6FF'};color:${done?'#065F46':'#1D4ED8'};font-weight:600" title="${escH((a.auditor||'')+' · '+fd(a.date)+(done?'':' (geplant)')+mates)}">${ini}${done?'':'<span style="font-size:8px">📅</span>'}</td>`;
      } else {
        html+=`<td style="padding:3px 4px;border:1px solid var(--bd);background:${isCur?'#EFF6FF':zebraColor}"></td>`;
      }
    }
    html+='</tr>';
  });
  html+='</tbody></table>';
  const _doneN=filtered.filter(p=>personAudits.some(a=>!a.planned&&paPnrs(a).includes(String(p.pnr))&&a.date&&a.date.startsWith(yr))).length;
  const _pct=filtered.length?Math.round(_doneN/filtered.length*100):0;
  const _sum=`<div style="padding:4px 2px 10px;font-size:12px;color:var(--tx2);display:flex;align-items:center;gap:14px;flex-wrap:wrap"><span>✅ <b style="color:var(--tx)">${_doneN} von ${filtered.length}</b> Personen in ${yr} auditiert (${_pct} %)</span><span><span style="display:inline-block;width:11px;height:11px;background:#DCFCE7;border:1px solid #86EFAC;border-radius:2px;vertical-align:-1px"></span> Name grün = bereits auditiert</span><span><span style="display:inline-block;width:11px;height:11px;background:#EFF6FF;border:1px solid #93C5FD;border-radius:2px;vertical-align:-1px"></span> 📅 = geplant</span></div>`;
  wrap.innerHTML=_sum+html;
}

function paBsSelected(){
  const bsInput=document.getElementById('pa-bs2');
  const val=bsInput?bsInput.value.trim():'';
  if(!val)return;
  // Nur automatisch übernehmen, wenn der eingegebene Name EXAKT einer bestehenden Baustelle
  // entspricht (z.B. per Datalist-Klick) - bei freiem Tippen wird nichts überschrieben.
  const e=data.find(x=>x.name===val);
  if(!e)return;
  const addrEl=document.getElementById('pa-addr');
  if(addrEl&&e.addr)addrEl.value=e.addr;
  // PSP bewusst NICHT übernehmen: Personen können eine andere Firmen-PSP haben
  // (z.B. Spezialitäten AG), auch wenn sie örtlich auf einer Anliker-Baustelle arbeiten.
  if(e.lat&&e.lng){
    window._paPendingLat=e.lat;window._paPendingLng=e.lng;
    const hint=document.getElementById('pa-addr-hint');
    if(hint)hint.textContent=`✓ Koordinaten von "${e.name}" übernommen`;
  }
}
function addPersonAudit2(){
  if(!_selectedPersons.length){showToast('Bitte zuerst mindestens eine Person auswählen');return;}
  const date=document.getElementById('pa-date2').value;
  const aud=document.getElementById('pa-aud2').value;
  if(!date||!aud){showToast('Datum und Auditor erforderlich');return;}
  const bs=document.getElementById('pa-bs2').value.trim();
  const psp=document.getElementById('pa-psp2').value.trim();
  const note=document.getElementById('pa-note2').value.trim();
  const addr=document.getElementById('pa-addr')?.value.trim()||'';
  // Checkbox bedeutet jetzt "bereits durchgeführt" -> Standard ist PLANEN (Kalender/Karte),
  // nur bei explizitem Haken wird sofort als erledigt erfasst.
  const planned=!document.getElementById('pa-planned2')?.checked;
  const lat=window._paPendingLat||null,lng=window._paPendingLng||null;
  // Mehrere Personen = EIN Audit (zählt 1x); pnrs/names führen alle Personen für die Jahresmatrix,
  // pnr/kat/firma gehören zur erstgenannten Person (Abteilungs-Zuordnung).
  const _first=_selectedPersons[0];
  const _names=_selectedPersons.map(p=>((p.nachname||'')+' '+(p.vorname||'')).trim());
  personAudits.push({
    id:Date.now(),
    pnr:_first.pnr,
    pnrs:_selectedPersons.map(p=>String(p.pnr)),
    names:_names,
    kat:_first.abt,
    person:_names.join(', '),
    firma:_first.firma||'',
    bs,psp,date,kw:dateToKW(date),
    auditor:aud,note,addr,planned,lat,lng
  });
  personAudits.sort((a,b)=>b.date.localeCompare(a.date));
  // Reset form
  _selectedPersons=[];
  document.getElementById('pa-search').value='';
  renderSelectedPersons();
  ['pa-bs2','pa-psp2','pa-note2','pa-addr'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const pc=document.getElementById('pa-planned2');if(pc)pc.checked=false;
  const ah=document.getElementById('pa-addr-hint');if(ah)ah.textContent='';
  window._paPendingLat=null;window._paPendingLng=null;
  renderPA2();renderAuditors();renderKW();saveNow();
  log('Personen-Audit '+(planned?'📅 geplant':'✓'),note||aud,'#7C3AED',aud);
  showToast(planned?'📅 Personen-Audit geplant':'✓ Personen-Audit erfasst',2000);
}
function renderPA2(){
  // Populate dept dropdown from data
  const depts=getAllDepts();
  const katSel=document.getElementById('pa-kat2');
  if(katSel){
    const cur=katSel.value;
    katSel.innerHTML='<option value="">— Bitte wählen —</option>'+depts.map(d=>`<option value="${d}"${d===cur?' selected':''}>${d}</option>`).join('');
  }
  // Sync pa-aud2
  const sel=document.getElementById('pa-aud2');
  if(sel){sel.innerHTML='<option value="">—</option>'+auditors.map(a=>`<option${a===currentUser?' selected':''}>${a}</option>`).join('');}
  // Sync pa-bs2: Datalist mit aktiven, nicht pausierten Baustellen (Freitext bleibt trotzdem möglich)
  const bsList=document.getElementById('pa-bs2-list');
  if(bsList){
    bsList.innerHTML=data.filter(e=>e.active&&!e.paused).sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${e.name.replace(/"/g,'&quot;')}" label="${escH([e.psp,e.dept].filter(Boolean).join(' · '))}">${escH([e.psp,e.dept].filter(Boolean).join(' · '))}</option>`).join('');
  }
  const el=document.getElementById('pa-list2');if(!el)return;
  if(!personAudits.length){el.innerHTML='<div style="font-size:11px;color:var(--tx3);padding:6px">Noch keine Personen-Audits erfasst.</div>';return;}
  el.innerHTML=`<table class="dtbl" style="margin-top:6px">
    <thead><tr><th>Datum</th><th>Person</th><th>Pers.Nr</th><th>Abteilung</th><th>Baustelle</th><th>PSP</th><th>Auditor</th><th>Notiz</th><th></th></tr></thead>
    <tbody>${personAudits.map(p=>{const col=aC(p.auditor),ini=p.auditor.split(' ').map(w=>w[0]).join('');
      return`<tr>
        <td style="white-space:nowrap">${fd(p.date)}</td>
        <td style="font-weight:600">${p.person||'—'}</td>
        <td style="font-family:monospace;font-size:11px;color:var(--tx2)">${paPnrs(p).join(', ')||'—'}</td>
        <td>${p.kat||p.firma||'—'}</td>
        <td>${p.bs||'—'}</td>
        <td style="color:var(--tx2);font-size:10px">${p.psp||'—'}</td>
        <td><span style="display:inline-flex;align-items:center;gap:5px"><span style="width:18px;height:18px;border-radius:50%;background:${col};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">${ini}</span>${p.auditor}</span></td>
        <td style="color:var(--tx2);font-style:italic">${p.note||''}</td>
        <td><button onclick="rmPA(${p.id})" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:13px"><i class="ti ti-trash"></i></button></td>
      </tr>`;}).join('')}
    </tbody>
  </table>`;
}
function renderPA(){
  const el=document.getElementById('pa-list');if(!el)return;
  // Update datalist with known categories
  const cats=[...new Set(personAudits.map(p=>p.kat))];
  const dl=document.getElementById('pa-kat-list');
  if(dl)dl.innerHTML=cats.map(k=>`<option value="${k}">`).join('');
  if(!personAudits.length){el.innerHTML='<div style="font-size:11px;color:var(--tx3);padding:6px">Noch keine Personen-Audits erfasst.</div>';return;}
  // Group by category
  const byKat={};
  personAudits.forEach(p=>{if(!byKat[p.kat])byKat[p.kat]=[];byKat[p.kat].push(p);});
  el.innerHTML=`<table class="dtbl" style="margin-top:6px">
    <thead><tr><th>Kategorie</th><th>Kontakt</th><th>Datum</th><th>Auditor</th><th>Notiz</th><th></th></tr></thead>
    <tbody>${personAudits.map(p=>{const c=aC(p.auditor),ini=p.auditor.split(' ').map(w=>w[0]).join('');
      return`<tr>
        <td style="font-weight:600">${p.kat}</td>
        <td>${p.person||'—'}</td>
        <td>${fd(p.date)}</td>
        <td><span style="display:inline-flex;align-items:center;gap:5px"><span style="width:18px;height:18px;border-radius:50%;background:${c};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0">${ini}</span>${p.auditor}</span></td>
        <td style="color:var(--tx2);font-style:italic">${p.note||''}</td>
        <td><button onclick="rmPA(${p.id})" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:13px"><i class="ti ti-trash"></i></button></td>
      </tr>`;}).join('')}
    </tbody>
  </table>`;
}

// ═══ Gesamtübersicht (alle Auditoren, alle Audit-Arten, wählbarer Monatsbereich) ═══
function setAuditTarget(v){
  window._auditTarget=Math.max(0,+v||0);
  try{localStorage.setItem('anliker_audit_target',String(window._auditTarget));}catch(e){}
  saveNow(); // sorgt für Team-weite Synchronisation über Supabase, nicht nur lokal
  renderOverview();
}
function initOverviewDefaults(){
  try{window._auditTarget=+localStorage.getItem('anliker_audit_target')||240;}catch(e){window._auditTarget=240;}
  const toEl=document.getElementById('ov-to'),fromEl=document.getElementById('ov-from');
  if(toEl&&!toEl.value){
    const now=new Date();
    const toStr=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
    // Standard: 1. Januar des aktuellen Jahres bis heute (nicht "letzte 12 Monate")
    const fromStr=now.getFullYear()+'-01';
    toEl.value=toStr;fromEl.value=fromStr;
  }
}
function renderOverview(){
  // Gesamt-Soll = Summe der Soll-Werte aller Auditoren (Auditoren verwalten) - keine separate Eingabe mehr
  const sollSum=auditors.reduce((s,a)=>s+(+((auditorMeta[a]||{}).soll)||0),0);
  const targetEl=document.getElementById('ov-target');
  if(targetEl)targetEl.textContent=sollSum||'—';
  const fromV=document.getElementById('ov-from')?.value; // "YYYY-MM"
  const toV=document.getElementById('ov-to')?.value;
  if(!fromV||!toV)return;
  const inRange=dateStr=>{
    if(!dateStr)return false;
    const ym=dateStr.slice(0,7);
    return ym>=fromV&&ym<=toV;
  };
  let siteCount=0,personCount=0,beratCount=0;
  data.forEach(e=>{
    siteCount+=(e.auditHistory||[]).filter(h=>inRange(h.date)).length;
    beratCount+=(e.beratungen||[]).filter(b=>inRange(b.date)).length;
  });
  siteCount+=(window._ghostAudits||[]).filter(h=>inRange(h.date)).length;
  personCount=personAudits.filter(p=>!p.planned&&inRange(p.date)).length;
  // Soll/Fortschritt: nur Baustellen- und Personen-Audits; Beratungen und Rapporte werden separat gezählt
  const total=siteCount+personCount;
  document.getElementById('ov-total').textContent=total;
  document.getElementById('ov-c-site').textContent=siteCount;
  document.getElementById('ov-c-person').textContent=personCount;
  document.getElementById('ov-c-berat').textContent=beratCount;
  const rpEl=document.getElementById('ov-c-rapp');if(rpEl)rpEl.textContent=rpTermine(rapporte.filter(r=>!r.planned&&inRange(r.date)));
  // Soll auf den gewählten Zeitraum skalieren (Jahres-Soll ÷ 12 × Anzahl Monate im Bereich)
  const [fy,fm]=fromV.split('-').map(Number),[ty,tm]=toV.split('-').map(Number);
  const monthsInRange=Math.max(1,(ty-fy)*12+(tm-fm)+1);
  const scaledTarget=Math.round(sollSum*monthsInRange/12);
  const pct=scaledTarget>0?Math.min(100,Math.round(total/scaledTarget*100)):0;
  document.getElementById('ov-bar').style.width=pct+'%';
  document.getElementById('ov-bar').style.background=pct>=100?'#10B981':pct>=60?'#3B82F6':'#F59E0B';
  document.getElementById('ov-progress-label').textContent=scaledTarget>0?`${total} / ${scaledTarget} (${pct}%)`:'Kein Soll gesetzt (Auditoren verwalten)';
  // Kuchendiagramm per CSS conic-gradient - kein zusätzliches Chart-Tool nötig für 3 Segmente
  const pie=document.getElementById('ov-pie');
  if(total===0){
    pie.innerHTML=`<div style="width:110px;height:110px;border-radius:50%;background:var(--sf2);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--tx3);text-align:center">Keine<br>Audits</div>`;
  }else{
    const pSite=siteCount/total*360;
    const g=`conic-gradient(#3B82F6 0deg ${pSite}deg, #F59E0B ${pSite}deg 360deg)`;
    pie.innerHTML=`<div style="width:110px;height:110px;border-radius:50%;background:${g};box-shadow:0 2px 8px rgba(0,0,0,.1)"></div>`;
  }
}
// ═══ RAPPORTE: ein Eintrag pro teilnehmender Person ═══
// Jede Person hat ihren eigenen Eintrag (separat bestätigen/absagen/verschieben). groupId verbindet
// die Einträge desselben Termins, team = alle ursprünglich Teilnehmenden. Alte gemeinsame Einträge
// (auditors mit mehreren Namen) werden hier einmalig aufgeteilt.
function normalizeRapporte(){
  let changed=false;const out=[];
  rapporte.forEach(r=>{
    const auds=(r.auditors&&r.auditors.length)?r.auditors:(r.auditor?[r.auditor]:[]);
    if(r.auditor&&r.groupId&&auds.length===1){out.push(r);return;}
    changed=true;
    const gid=r.groupId||('g'+r.id);
    auds.forEach((a,i)=>out.push({...r,id:i===0?r.id:r.id*100+i,auditor:a,auditors:[a],team:r.team||auds,groupId:gid}));
  });
  if(changed){rapporte=out;setTimeout(()=>{try{saveNow();}catch(e){}},500);}
}
function rpGroup(r){return rapporte.filter(x=>x.groupId===r.groupId);}
function rpTermine(arr){return new Set(arr.map(r=>r.groupId||r.id)).size;}
// ═══ RAPPORT-ARTEN (verwaltbar, im Admin-Menü) ═══
// Liste liegt in deptMeta._rapportTypes (wird wie die Abteilungen über Supabase synchronisiert).
const RAPPORT_TYPES_DEFAULT=['SiBe-Rapport','QM/UM Rapport','Bauführerrapport','Polierrapport','Andere Sitzung'];
function rapportTypes(){
  const t=deptMeta._rapportTypes;
  return(Array.isArray(t)&&t.length)?t.slice():RAPPORT_TYPES_DEFAULT.slice();
}
function fillRapportTypeSelects(){
  ['rp-type','rpe-type'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    const cur=el.value;const list=rapportTypes();
    if(cur&&!list.includes(cur))list.push(cur); // Art eines bestehenden Termins nie verlieren
    el.innerHTML=list.map(t=>`<option value="${escH(t)}">${escH(t)}</option>`).join('');
    if(cur)el.value=cur;
  });
}
function openRapportTypes(){
  renderRapportTypes();
  document.getElementById('rpt-bg').style.display='flex';
  initStickyFooters();
}
function renderRapportTypes(){
  const list=rapportTypes();
  const used=t=>rapporte.filter(r=>r.type===t).length;
  document.getElementById('rpt-list').innerHTML=list.map((t,i)=>`<div style="display:grid;grid-template-columns:1fr 60px 28px 28px;gap:6px;align-items:center;padding:6px 10px;border-bottom:1px solid var(--bd)">
      <input value="${escH(t)}" data-old="${escH(t)}" onchange="renameRapportType(this.dataset.old,this.value)" style="padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px">
      <span style="text-align:center;font-size:11px;color:var(--tx3)">${used(t)} Termine</span>
      <button onclick="moveRapportType(${i},-1)" ${i===0?'disabled':''} title="Nach oben" style="background:none;border:none;cursor:pointer;color:var(--tx2);font-size:13px;opacity:${i===0?.3:1}">↑</button>
      <button onclick="removeRapportType('${escH(t).replace(/'/g,"\\'")}')" title="${used(t)?'In Verwendung – nicht löschbar':'Löschen'}" style="background:none;border:none;cursor:pointer;color:${used(t)?'var(--tx3)':'#EF4444'};font-size:13px">🗑</button>
    </div>`).join('');
}
function saveRapportTypes(list){
  deptMeta._rapportTypes=list;saveDepts();fillRapportTypeSelects();renderRapportTypes();
  if(document.getElementById('rp-list'))renderRapporte();
}
function addRapportType(){
  const inp=document.getElementById('rpt-new');const v=(inp.value||'').trim();
  if(!v)return;
  const list=rapportTypes();
  if(list.some(t=>t.toLowerCase()===v.toLowerCase())){showToast('Art existiert bereits',2500);return;}
  list.push(v);inp.value='';saveRapportTypes(list);showToast('✓ «'+v+'» hinzugefügt',2000);
}
function renameRapportType(oldT,newT){
  newT=(newT||'').trim();
  if(!newT||newT===oldT){renderRapportTypes();return;}
  const list=rapportTypes();
  if(list.some(t=>t!==oldT&&t.toLowerCase()===newT.toLowerCase())){showToast('Art existiert bereits',2500);renderRapportTypes();return;}
  let n=0;rapporte.forEach(r=>{if(r.type===oldT){r.type=newT;n++;}});
  saveRapportTypes(list.map(t=>t===oldT?newT:t));
  if(n)saveNow();
  showToast(`✓ «${oldT}» → «${newT}»${n?' ('+n+' Termine angepasst)':''}`,3000);
}
function removeRapportType(t){
  const n=rapporte.filter(r=>r.type===t).length;
  if(n){showToast(`«${t}» wird von ${n} Termin(en) verwendet – erst umbenennen oder die Termine ändern`,4500);return;}
  if(rapportTypes().length<=1){showToast('Mindestens eine Art muss bleiben',2500);return;}
  undoPoint(`Rapport-Art «${t}» gelöscht`,()=>{fillRapportTypeSelects();renderRapportTypes();});
  saveRapportTypes(rapportTypes().filter(x=>x!==t));
}
function moveRapportType(i,d){
  const list=rapportTypes();const j=i+d;if(j<0||j>=list.length)return;
  [list[i],list[j]]=[list[j],list[i]];saveRapportTypes(list);
}
// ═══ RAPPORTE ═══
let _rpShowAllSeries=false;
function renderRapporte(){
  fillRapportTypeSelects();
  const ysel=document.getElementById('rp-year');
  if(ysel&&!ysel.options.length){const y=new Date().getFullYear();ysel.innerHTML=[y-2,y-1,y,y+1].map(v=>`<option${v===y?' selected':''}>${v}</option>`).join('');}
  const dEl=document.getElementById('rp-date');if(dEl&&!dEl.value)dEl.value=today();
  const dSel=document.getElementById('rp-dept');
  if(dSel){const cur=dSel.value;dSel.innerHTML='<option value="">— keine / übergreifend —</option>'+getAllDepts().map(d=>`<option value="${d.replace(/"/g,'&quot;')}">${d}</option>`).join('');dSel.value=cur;}
  const box=document.getElementById('rp-auds');
  if(box&&!box.dataset.init){
    box.innerHTML=auditors.map(a=>`<label style="display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border:1px solid var(--bd);border-radius:16px;font-size:12px;cursor:pointer;background:var(--sf2)"><input type="checkbox" value="${a.replace(/"/g,'&quot;')}" ${a===currentUser?'checked':''}> ${a}</label>`).join('');
    box.dataset.init='1';
  }
  const yr=ysel?ysel.value:String(new Date().getFullYear());
  const list=rapporte.filter(r=>!r.planned&&(r.date||'').startsWith(yr)).sort((a,b)=>b.date.localeCompare(a.date));
  const _seenG=new Set();const listG=list.filter(r=>{const g=r.groupId||r.id;if(_seenG.has(g))return false;_seenG.add(g);return true;});
  const _pg=new Set();
  const planned=rapporte.filter(r=>r.planned).sort((a,b)=>(a.date+(a.time||'')).localeCompare(b.date+(b.time||''))).filter(r=>{const g=r.groupId||r.id;if(_pg.has(g))return false;_pg.add(g);return true;});
  const seriesCount={},seriesLast={},seenSeries=new Set();
  planned.forEach(r=>{if(r.seriesId){seriesCount[r.seriesId]=(seriesCount[r.seriesId]||0)+1;seriesLast[r.seriesId]=r.date;}});
  const plannedShown=_rpShowAllSeries?planned:planned.filter(r=>{if(!r.seriesId)return true;if(seenSeries.has(r.seriesId))return false;seenSeries.add(r.seriesId);return true;});
  // Zusammenfassung: nach Art, nach Abteilung, nach Auditor
  const cnt=(arr,fn)=>{const m={};arr.forEach(x=>(fn(x)||[]).forEach(k=>{m[k]=(m[k]||0)+1;}));return Object.entries(m).sort((a,b)=>b[1]-a[1]);};
  const chips=(title,entries)=>entries.length?`<div style="margin-bottom:8px"><div style="font-size:10px;font-weight:600;color:var(--tx2);margin-bottom:4px">${title}</div><div style="display:flex;flex-wrap:wrap;gap:6px">${entries.map(([k,v])=>`<span style="padding:4px 10px;background:var(--sf2);border:1px solid var(--bd);border-radius:14px;font-size:11px">${k}: <b>${v}</b></span>`).join('')}</div></div>`:'';
  document.getElementById('rp-summary').innerHTML=`
    <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:10px"><span style="font-size:26px;font-weight:800;color:var(--tx)">${rpTermine(list)}</span><span style="font-size:12px;color:var(--tx2)">Rapport-Termine ${yr}</span><span style="font-size:12px;color:var(--tx3)">· ${list.length} Teilnahmen</span></div>
    ${chips('Termine nach Art',cnt(listG,r=>[r.type]))}
    ${chips('Termine nach Abteilung',cnt(listG,r=>[r.dept||'Übergreifend']))}
    ${chips('Teilnahmen nach Auditor',cnt(list,r=>[r.auditor]))}`;
  const isAdmin=document.body.classList.contains('admin-mode');
  const row=(r,isPlan)=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid var(--bd);font-size:12px;${isPlan?'background:#F0F9FF':''}">
      <span style="width:92px;flex-shrink:0;color:var(--tx2)">${fd(r.date)}${r.time?'<br><span style="font-size:10px">'+r.time+' Uhr</span>':''}</span>
      <span style="flex:1;min-width:0"><b>${r.type}</b>${r.seriesId?' <span title="Teil einer Serie" style="font-size:10px;color:#0284C7">🔁</span>':''}${r.dept?' · '+r.dept:''}${r.ort?` <span style="color:var(--tx2)">· ${r.ort}</span>`:''}${r.addr?`<div style="font-size:11px;color:var(--tx2)">📍 ${r.addr}</div>`:''}${r.note?`<div style="font-size:11px;color:var(--tx3)">${r.note}</div>`:''}</span>
      <span style="display:flex;gap:3px;flex-shrink:0">${rpGroup(r).map(m=>{const cd=(AUD_CODES[m.auditor]||m.auditor.split(' ').map(w=>w[0]).join('')).slice(0,4);return m.planned?`<span title="${m.auditor}: geplant" style="width:22px;height:22px;border-radius:50%;border:2px solid ${aC(m.auditor)};color:${aC(m.auditor)};font-size:8px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box">${cd}</span>`:`<span title="${m.auditor}: teilgenommen" style="width:22px;height:22px;border-radius:50%;background:${aC(m.auditor)};color:#fff;font-size:8px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">✓</span>`;}).join('')}</span>
      ${(()=>{const mine=rpGroup(r).find(m=>m.auditor===currentUser);const target=mine||(isAdmin?r:null);if(!target)return'';return`${mine&&mine.planned&&isPlan?`<button onclick="confirmRapport(${mine.id})" style="padding:4px 9px;border:none;border-radius:6px;background:#10B981;color:#fff;font-size:11px;cursor:pointer;white-space:nowrap">✓ Teilgenommen</button>`:''}<button onclick="openRapportEdit(${target.id})" title="Bearbeiten / Absagen" style="padding:4px 8px;border:1px solid var(--bd);border-radius:6px;background:var(--sf2);font-size:11px;cursor:pointer">✏️</button>${isPlan?`<button onclick="exportRapportICS(${target.id})" title="${r.seriesId?'Ganze Serie':'Termin'} nach Outlook exportieren" style="padding:4px 7px;border:1px solid var(--bd);border-radius:6px;background:var(--sf2);font-size:11px;cursor:pointer">⬇️ Outlook</button>`:''}`;})()}
    </div>`;
  document.getElementById('rp-list').innerHTML=
    `<div style="display:flex;align-items:center;justify-content:space-between;margin:4px 0 6px"><span style="font-size:11px;font-weight:700;color:#0284C7">📅 Geplant (${planned.length})</span>${planned.length?`<button onclick="exportMyRapporteICS()" style="padding:4px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--sf2);font-size:11px;cursor:pointer">⬇️ Alle meine geplanten → Outlook</button>`:''}</div>`+
    (plannedShown.length?plannedShown.map(r=>row(r,true)+(r.seriesId&&seriesCount[r.seriesId]>1?`<div style="font-size:10px;color:#0284C7;padding:0 10px 6px 112px;background:#F0F9FF;border-bottom:1px solid var(--bd)">🔁 nächster Termin der Serie · danach noch ${seriesCount[r.seriesId]-1} weitere bis ${fd(seriesLast[r.seriesId])} <a href="#" onclick="event.preventDefault();_rpShowAllSeries=!_rpShowAllSeries;renderRapporte()" style="color:#0284C7">${_rpShowAllSeries?'Serien zusammenfassen':'alle anzeigen'}</a></div>`:'')).join(''):'<div style="font-size:11px;color:var(--tx3);padding:6px">Keine geplanten Rapporte.</div>')+
    `<div style="font-size:11px;font-weight:700;color:var(--tx2);margin:16px 0 6px">✅ Teilgenommen ${yr} (${list.length})</div>`+
    (list.length?list.map(r=>row(r,false)).join(''):'<div style="font-size:11px;color:var(--tx3);padding:6px">Keine Rapporte in diesem Jahr.</div>');
}
// Letzte Adresse/Zeit/Dauer/Abteilung des gleichen Rapport-Typs vorbelegen (z.B. SiBe-Rapport immer gleicher Ort)
function rpPrefillFromType(){
  const type=document.getElementById('rp-type').value;
  const last=rapporte.filter(r=>r.type===type).sort((a,b)=>b.date.localeCompare(a.date))[0];
  if(!last)return;
  const set=(id,v)=>{const el=document.getElementById(id);if(el&&!el.value&&v)el.value=v;};
  set('rp-addr',last.addr);set('rp-time',last.time);
  if(last.dur)document.getElementById('rp-dur').value=String(last.dur);
  if(last.dept&&!document.getElementById('rp-dept').value)document.getElementById('rp-dept').value=last.dept;
  if(last.addr&&!document.getElementById('rp-addr').dataset.touched){window._rpPendingLat=last.lat||null;window._rpPendingLng=last.lng||null;}
}
function rpAddDays(ds,n){const d=parseDate(ds);d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function rpAddMonth(ds,k){const[y,m,d]=ds.split('-').map(Number);const t=new Date(y,m-1+k,1);const last=new Date(t.getFullYear(),t.getMonth()+1,0).getDate();t.setDate(Math.min(d,last));return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');}
function addRapport(){
  const date=document.getElementById('rp-date').value;
  const type=document.getElementById('rp-type').value;
  const dept=document.getElementById('rp-dept').value;
  const ort=document.getElementById('rp-ort').value.trim();
  const note=document.getElementById('rp-note').value.trim();
  const time=document.getElementById('rp-time').value;
  const dur=+document.getElementById('rp-dur').value||60;
  const addr=document.getElementById('rp-addr').value.trim();
  const done=document.getElementById('rp-done').checked;
  const rpt=document.getElementById('rp-rep').value;
  const until=document.getElementById('rp-until').value;
  const auds=[...document.querySelectorAll('#rp-auds input:checked')].map(x=>x.value);
  if(!date){showToast('Datum erforderlich');return;}
  if(!auds.length){showToast('Mindestens einen Auditor wählen');return;}
  const base={time,dur,type,dept,ort,note,addr,lat:addr?window._rpPendingLat||null:null,lng:addr?window._rpPendingLng||null:null,auditors:auds};
  // Termine berechnen (Serie oder einmalig)
  let dates=[date];
  if(rpt&&!done){
    if(!until){showToast('Für eine Serie bitte ein Enddatum («bis») wählen');return;}
    if(until<date){showToast('Enddatum liegt vor dem Startdatum');return;}
    dates=[];let cur=date,k=0;
    while(cur<=until&&dates.length<200){dates.push(cur);k++;cur=rpt==='M'?rpAddMonth(date,k):rpAddDays(date,(+rpt)*k);}
  }
  const seriesId=dates.length>1?Date.now():null;
  const t0=Date.now();let k2=0;
  dates.forEach((d,di)=>{
    const gid='g'+t0+'_'+di;
    auds.forEach(a=>rapporte.push({...base,id:t0*100+(k2++),date:d,planned:!done,auditor:a,auditors:[a],team:auds,groupId:gid,...(seriesId?{seriesId,rep:rpt}:{})}));
  });
  ['rp-ort','rp-note','rp-time','rp-addr','rp-until'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('rp-rep').value='';document.getElementById('rp-until-wrap').style.display='none';
  document.getElementById('rp-done').checked=false;
  const h=document.getElementById('rp-addr-hint');if(h)h.textContent='';
  window._rpPendingLat=null;window._rpPendingLng=null;document.getElementById('rp-addr').dataset.touched='';
  saveNow();renderRapporte();renderOverview();renderDeptTable();if(typeof renderKW==='function'&&curView==='cal')renderKW();
  showToast(done?'✓ '+type+' als teilgenommen erfasst':seriesId?`🔁 Serie mit ${dates.length} Terminen geplant`:'📅 '+type+' geplant',3000);
}
// ═══ RAPPORTE → OUTLOOK (.ics) ═══
// Echte Termine mit Uhrzeit/Dauer/Ort (Zeitzone Europe/Zurich). Eine Serie wird als EIN Serientermin
// (RRULE) exportiert, sofern alle noch geplanten Termine der Regel entsprechen; wurde einer verschoben,
// werden die Termine einzeln exportiert. Stabile UIDs -> erneuter Import aktualisiert statt dupliziert.
function icsEsc(s){return String(s||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');}
function icsDT(ds,time,addMin){
  const[y,m,d]=ds.split('-').map(Number);const[hh,mm]=(time||'00:00').split(':').map(Number);
  const t=new Date(y,m-1,d,hh,mm+(addMin||0));const p=n=>String(n).padStart(2,'0');
  return t.getFullYear()+p(t.getMonth()+1)+p(t.getDate())+'T'+p(t.getHours())+p(t.getMinutes())+'00';
}
const ICS_TZ=['BEGIN:VTIMEZONE','TZID:Europe/Zurich','BEGIN:DAYLIGHT','TZOFFSETFROM:+0100','TZOFFSETTO:+0200','TZNAME:CEST','DTSTART:19700329T020000','RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU','END:DAYLIGHT','BEGIN:STANDARD','TZOFFSETFROM:+0200','TZOFFSETTO:+0100','TZNAME:CET','DTSTART:19701025T030000','RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU','END:STANDARD','END:VTIMEZONE'];
function rappVEvent(r,uid,rrule){
  const L=['BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z'];
  if(r.time){L.push('DTSTART;TZID=Europe/Zurich:'+icsDT(r.date,r.time,0));L.push('DTEND;TZID=Europe/Zurich:'+icsDT(r.date,r.time,r.dur||60));}
  else{L.push('DTSTART;VALUE=DATE:'+r.date.replace(/-/g,''));L.push('DTEND;VALUE=DATE:'+rpAddDays(r.date,1).replace(/-/g,''));}
  if(rrule)L.push('RRULE:'+rrule);
  L.push('SUMMARY:'+icsEsc(r.type+(r.dept?' – '+r.dept:'')));
  if(r.addr)L.push('LOCATION:'+icsEsc(r.addr));
  const desc=[r.ort?'Thema/Raum: '+r.ort:'',r.note||'','Teilnehmende: '+(r.team||r.auditors||[]).join(', '),r.addr?'Route: https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(r.addr):''].filter(Boolean).join('\n');
  L.push('DESCRIPTION:'+icsEsc(desc));
  L.push('END:VEVENT');
  return L;
}
function rappSeriesRule(occ){
  // prüft, ob die geplanten Termine exakt einer Regel folgen -> RRULE, sonst null
  if(occ.length<2)return null;
  const rep=occ[0].rep,first=occ[0].date,last=occ[occ.length-1].date;
  if(occ.some(o=>(o.time||'')!==(occ[0].time||'')))return null;
  const exp=[];let k=0,cur=first;
  while(cur<=last&&exp.length<400){exp.push(cur);k++;cur=rep==='M'?rpAddMonth(first,k):rpAddDays(first,(+rep||7)*k);}
  if(exp.length!==occ.length||exp.some((d,i)=>d!==occ[i].date))return null;
  const until=last.replace(/-/g,'')+'T235959';
  return rep==='M'?`FREQ=MONTHLY;INTERVAL=1;UNTIL=${until}`:`FREQ=WEEKLY;INTERVAL=${(+rep||7)/7};UNTIL=${until}`;
}
function buildRappICS(list){
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Anliker Audit Planer//DE','CALSCALE:GREGORIAN','METHOD:PUBLISH',...ICS_TZ];
  const done=new Set();
  list.forEach(r=>{
    if(done.has(r.id))return;
    if(r.seriesId){
      const occ=rapporte.filter(x=>x.seriesId===r.seriesId&&x.planned&&x.auditor===r.auditor).sort((a,b)=>a.date.localeCompare(b.date));
      const rule=rappSeriesRule(occ);
      occ.forEach(o=>done.add(o.id));
      if(rule){L.push(...rappVEvent(occ[0],'rapport-serie-'+r.seriesId+'@anliker.ch',rule));return;}
      occ.forEach(o=>L.push(...rappVEvent(o,'rapport-'+o.id+'@anliker.ch',null)));
      return;
    }
    done.add(r.id);
    L.push(...rappVEvent(r,'rapport-'+r.id+'@anliker.ch',null));
  });
  L.push('END:VCALENDAR');
  return L.join('\r\n');
}
function exportRapportICS(id){
  const r=rapporte.find(x=>x.id===id);if(!r)return;
  dlICS(buildRappICS([r]),`rapport_${r.type.replace(/\W+/g,'_')}_${r.date}.ics`);
  showToast(r.seriesId?'🔁 Serie → Outlook (Datei öffnen/importieren)':'📅 Termin → Outlook',3000);
}
function exportMyRapporteICS(){
  const mine=rapporte.filter(r=>r.planned&&(!currentUser||(r.auditors||[]).includes(currentUser)));
  if(!mine.length){showToast('Keine geplanten Rapporte für dich');return;}
  dlICS(buildRappICS(mine),`rapporte_${(currentUser||'alle').split(' ').pop()}.ics`);
  showToast('📅 Geplante Rapporte → Outlook',2500);
}
let _rpeId=null;
// Bearbeiten gilt immer für den ganzen Termin (Gruppe); Status (geplant / teilgenommen / abgesagt)
// wird pro Person gesetzt.
function openRapportEdit(id){
  const r=rapporte.find(x=>x.id===id);if(!r)return;
  _rpeId=id;
  {const sel=document.getElementById('rpe-type');fillRapportTypeSelects();
   if(![...sel.options].some(o=>o.value===r.type))sel.insertAdjacentHTML('beforeend',`<option value="${escH(r.type)}">${escH(r.type)}</option>`);
   sel.value=r.type;}
  const set=(k,v)=>{const el=document.getElementById('rpe-'+k);if(el)el.value=v??'';};
  set('type',r.type);set('date',r.date);set('time',r.time||'');set('dur',String(r.dur||60));set('addr',r.addr||'');set('ort',r.ort||'');set('note',r.note||'');
  const dSel=document.getElementById('rpe-dept');
  const opts=getAllDepts();if(r.dept&&!opts.includes(r.dept))opts.push(r.dept);
  dSel.innerHTML='<option value="">— keine / übergreifend —</option>'+opts.map(d=>`<option value="${d.replace(/"/g,'&quot;')}">${d}</option>`).join('');dSel.value=r.dept||'';
  const grp=rpGroup(r);
  const seg=(m,val,lbl,col)=>`<label style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:12px;font-size:11px;cursor:pointer;border:1px solid var(--bd)"><input type="radio" name="rpe-st-${m.id}" value="${val}" ${((val==='planned'&&m.planned)||(val==='done'&&!m.planned))?'checked':''} style="accent-color:${col}"> ${lbl}</label>`;
  document.getElementById('rpe-members').innerHTML=grp.map(m=>`<div data-mid="${m.id}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid var(--bd);flex-wrap:wrap">
      <span style="width:22px;height:22px;border-radius:50%;background:${aC(m.auditor)};color:#fff;font-size:8px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${(AUD_CODES[m.auditor]||m.auditor.split(' ').map(w=>w[0]).join('')).slice(0,4)}</span>
      <span style="flex:1;min-width:110px;font-size:12px;font-weight:600">${m.auditor}</span>
      ${seg(m,'planned','Geplant','#0EA5E9')}${seg(m,'done','✓ Teilgenommen','#10B981')}${seg(m,'remove','✕ Abgesagt','#EF4444')}
    </div>`).join('');
  const free=auditors.filter(a=>!grp.some(m=>m.auditor===a));
  document.getElementById('rpe-add').innerHTML=free.length?`<span style="font-size:11px;color:var(--tx2);align-self:center">Hinzufügen:</span>`+free.map(a=>`<label style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border:1px dashed var(--bd);border-radius:16px;font-size:12px;cursor:pointer"><input type="checkbox" value="${a.replace(/"/g,'&quot;')}"> ${a}</label>`).join(''):'';
  window._rpePendingLat=r.lat||null;window._rpePendingLng=r.lng||null;
  const h=document.getElementById('rpe-addr-hint');if(h)h.textContent='';
  const hasFollow=r.seriesId&&rapporte.some(x=>x.seriesId===r.seriesId&&x.date>r.date);
  document.getElementById('rpe-series-wrap').style.display=hasFollow?'flex':'none';document.getElementById('rpe-series').checked=false;
  const mine=grp.find(m=>m.auditor===currentUser);
  document.getElementById('rpe-btn-done').style.display=mine&&mine.planned?'':'none';
  document.getElementById('rpe-title').textContent=r.type+(r.seriesId?' 🔁':'')+' – '+fd(r.date);
  document.getElementById('rpe-bg').style.display='flex';
}
function rpeMyId(){const r=rapporte.find(x=>x.id===_rpeId);if(!r)return _rpeId;const m=rpGroup(r).find(x=>x.auditor===currentUser);return m?m.id:_rpeId;}
function rpeRefresh(){
  saveNow();renderRapporte();renderOverview();renderDeptTable();
  if(typeof renderKW==='function'&&curView==='cal')renderKW();
  if(document.getElementById('mob-plan-list'))renderMobPlan();
}
async function rpeAction(action){
  const r=rapporte.find(x=>x.id===_rpeId);if(!r)return;
  const close=()=>{document.getElementById('rpe-bg').style.display='none';};
  if(action==='cancelAll'){close();cancelRapportTermin(r.id);return;}
  if(action==='done'){const m=rpGroup(r).find(x=>x.auditor===currentUser);if(m)m.planned=false;close();rpeRefresh();showToast('✓ Teilnahme bestätigt');return;}
  // Speichern: gemeinsame Angaben für alle Teilnehmenden, Status pro Person
  const g=k=>document.getElementById('rpe-'+k).value;
  if(!g('date')){showToast('Datum erforderlich');return;}
  const addr=g('addr').trim();
  const shared={type:g('type'),time:g('time'),dur:+g('dur')||60,dept:g('dept'),addr,lat:addr?window._rpePendingLat||null:null,lng:addr?window._rpePendingLng||null:null,ort:g('ort').trim(),note:g('note').trim()};
  const oldDate=r.date,gid=r.groupId;
  const grp=rpGroup(r);
  const status={};grp.forEach(m=>{const s=document.querySelector(`input[name="rpe-st-${m.id}"]:checked`);status[m.id]=s?s.value:(m.planned?'planned':'done');});
  const addNew=[...document.querySelectorAll('#rpe-add input:checked')].map(x=>x.value);
  const remaining=grp.filter(m=>status[m.id]!=='remove').length+addNew.length;
  if(!remaining){if(!await askConfirm('Alle Teilnehmenden abgesagt – ganzen Termin löschen?',{ok:'Termin löschen',danger:true}))return;}
  grp.forEach(m=>{Object.assign(m,shared,{date:g('date')});if(status[m.id]!=='remove')m.planned=status[m.id]==='planned';});
  const removed=grp.filter(m=>status[m.id]==='remove').map(m=>m.auditor);
  rapporte=rapporte.filter(x=>!(x.groupId===gid&&status[x.id]==='remove'));
  const tpl=rapporte.find(x=>x.groupId===gid)||{...r,...shared,date:g('date')};
  addNew.forEach((a,i)=>rapporte.push({...tpl,id:Date.now()*100+i,auditor:a,auditors:[a],planned:true,groupId:gid}));
  const team=rapporte.filter(x=>x.groupId===gid).map(x=>x.auditor);rapporte.filter(x=>x.groupId===gid).forEach(x=>x.team=team);
  // Serie: folgende Termine übernehmen (Angaben + gleiche Teilnehmendenliste)
  let n=0;
  if(r.seriesId&&document.getElementById('rpe-series').checked){
    const later=[...new Set(rapporte.filter(x=>x.seriesId===r.seriesId&&x.date>oldDate&&x.groupId!==gid).map(x=>x.groupId))];
    later.forEach(lg=>{
      const mem=rapporte.filter(x=>x.groupId===lg);const t=mem[0];const d=t.date;
      mem.forEach(x=>{const{note,...s2}=shared;Object.assign(x,s2);});
      rapporte=rapporte.filter(x=>!(x.groupId===lg&&x.planned&&removed.includes(x.auditor)));
      addNew.forEach((a,i)=>{if(!rapporte.some(x=>x.groupId===lg&&x.auditor===a))rapporte.push({...t,...shared,note:t.note,date:d,id:Date.now()*100+500+n*10+i,auditor:a,auditors:[a],planned:true});});
      const tm=rapporte.filter(x=>x.groupId===lg).map(x=>x.auditor);rapporte.filter(x=>x.groupId===lg).forEach(x=>x.team=tm);
      n++;
    });
  }
  close();rpeRefresh();
  const parts=[n?`${n} folgende Serientermine`:'',addNew.length?`${addNew.length} hinzugefügt`:'',removed.length?`${removed.join(', ')} abgesagt`:''].filter(Boolean).join(' · ');
  showToast('✓ Gespeichert'+(parts?' ('+parts+')':''),3000);
}
// Ganzen Termin für alle absagen (bei Serien: nur dieser oder alle folgenden geplanten)
async function cancelRapportTermin(id){
  const r=rapporte.find(x=>x.id===id);if(!r)return;
  const later=r.seriesId?[...new Set(rapporte.filter(x=>x.seriesId===r.seriesId&&x.planned&&x.date>=r.date).map(x=>x.groupId))]:[];
  if(later.length>1){
    const c=await uiDialog({msg:`Serientermin für ALLE Teilnehmenden absagen.\n\nNur diesen Termin oder auch alle folgenden geplanten Termine der Serie (${later.length})?`,ok:`Alle folgenden (${later.length})`,extra:'Nur diesen Termin'});
    if(c!==true&&c!=='extra')return;
    if(c===true){
      undoPoint('Serie ab '+fd(r.date)+' abgesagt',rpeRefresh);
      rapporte=rapporte.filter(x=>!(x.seriesId===r.seriesId&&x.planned&&x.date>=r.date));rpeRefresh();showToast('✕ Serie ab '+fd(r.date)+' abgesagt');return;
    }
  }
  undoPoint(`Termin ${r.type} vom ${fd(r.date)} abgesagt`,rpeRefresh);
  rapporte=rapporte.filter(x=>x.groupId!==r.groupId);rpeRefresh();showToast('✕ Termin abgesagt');
}
function moveRapportTo(id,ds){
  const r=rapporte.find(x=>x.id===id);if(!r||r.date===ds)return;
  rpGroup(r).forEach(x=>{x.date=ds;});rpeRefresh();showToast('📅 Termin verschoben auf '+fd(ds));
}
function confirmRapport(id){
  const r=rapporte.find(x=>x.id===id);if(!r)return;
  r.planned=false;
  saveNow();renderRapporte();renderOverview();renderDeptTable();
  if(typeof renderKW==='function'&&curView==='cal')renderKW();
  if(typeof renderMobPlan==='function'&&document.getElementById('mob-plan-list'))renderMobPlan();
  showToast('✓ Teilnahme bestätigt: '+r.type);
}

async function rmRapport(id){
  const r=rapporte.find(x=>x.id===id);if(!r)return;
  const sib=r.seriesId?rapporte.filter(x=>x.seriesId===r.seriesId&&x.planned&&x.auditor===r.auditor):[];
  if(r.planned&&sib.length>1){
    const c=await uiDialog({msg:`Absage für ${r.auditor}.\nDieser Termin gehört zu einer Serie (${sib.length} geplante Termine).\n\n(Andere Teilnehmende sind nicht betroffen.)`,ok:`Alle Serientermine (${sib.length})`,extra:'Nur diesen Termin'});
    if(c!==true&&c!=='extra')return;
    undoPoint(`Rapport für ${r.auditor} abgesagt`,rpeRefresh);
    if(c===true)rapporte=rapporte.filter(x=>!(x.seriesId===r.seriesId&&x.planned&&x.auditor===r.auditor));
    else rapporte=rapporte.filter(x=>x.id!==id);
  }else{
    const others=rpGroup(r).length-1;
    undoPoint(r.planned?`Rapport für ${r.auditor} abgesagt${others?` (${others} weitere bleiben eingetragen)`:''}`:`Teilnahme von ${r.auditor} gelöscht`,rpeRefresh);
    rapporte=rapporte.filter(x=>x.id!==id);
  }
  saveNow();renderRapporte();renderOverview();renderDeptTable();
  if(typeof renderKW==='function'&&curView==='cal')renderKW();
  if(typeof renderMobPlan==='function'&&document.getElementById('mob-plan-list'))renderMobPlan();
}
function renderDeptTable(){
  const tb=document.getElementById('dept-tb');if(!tb)return;
  const fEl=document.getElementById('dept-from'),tEl=document.getElementById('dept-to');
  const now=new Date();
  if(fEl&&!fEl.value)fEl.value=now.getFullYear()+'-01';
  if(tEl&&!tEl.value)tEl.value=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
  const from=fEl.value,to=tEl.value;
  const inR=ds=>{if(!ds)return false;const ym=ds.slice(0,7);return ym>=from&&ym<=to;};
  const maYear=to.slice(0,4);
  const todayYM=today().slice(0,7);
  const depts=getAllDepts();
  const personDept=p=>{
    const _fp=paPnrs(p)[0];
    const per=(typeof persons!=='undefined'?persons:[]).find(x=>_fp&&String(x.pnr)===_fp)||(typeof persons!=='undefined'?persons:[]).find(x=>((x.nachname||'')+' '+(x.vorname||'')).trim()===(p.person||'').trim());
    const m=per?mapPersonAbt(per.abt):null;
    if(m)return[m];
    const bs=p.bs?data.find(e=>e.name===p.bs):null;
    if(bs&&bs.dept)return deptParts(bs.dept);
    return[];
  };
  const tot={bs:0,a:0,p:0,b:0,ma:0,ov:0,on:0,iv:0,gs:0,gn:0};
  const rows=depts.map(d=>{
    const inD=e=>deptParts(e.dept).includes(d);
    const active=data.filter(e=>inD(e)&&e.active&&!e.paused&&e.type!=='werkhof');
    const a=data.filter(inD).reduce((s,e)=>s+(e.auditHistory||[]).filter(h=>inR(h.date)).length,0);
    const b=data.filter(inD).reduce((s,e)=>s+(e.beratungen||[]).filter(x=>inR(x.date)).length,0);
    const p=personAudits.filter(x=>!x.planned&&inR(x.date)&&personDept(x).includes(d)).length;
    // Termintreue: jeder Abstand zwischen zwei aufeinanderfolgenden Audits, dessen späteres Audit im
    // Zeitraum liegt, gilt als rechtzeitig, wenn <= Rhythmus x 1.25. Aktuell überfällige Baustellen
    // (offene Lücke) zählen zusätzlich als ein verspäteter Abstand, sofern der Zeitraum bis heute reicht.
    let onTime=0,intervals=0,gapSum=0,gapCount=0;
    data.filter(inD).forEach(e=>{
      const rh=(+e.rhythm||S('rh_baustelle'))*(1+S('tt_tol_pct')/100);
      const ds=(e.auditHistory||[]).map(h=>h.date).filter(Boolean).sort();
      for(let i=1;i<ds.length;i++){
        if(!inR(ds[i]))continue;
        const gap=Math.round((parseDate(ds[i])-parseDate(ds[i-1]))/86400000);
        if(gap<=0)continue;
        intervals++;gapSum+=gap;gapCount++;if(gap<=rh)onTime++;
      }
      if(e.active&&!e.paused&&status(e)==='overdue'&&to>=todayYM)intervals++;
    });
    const tt=intervals?Math.round(onTime/intervals*100):null;
    const avgGap=gapCount?Math.round(gapSum/gapCount):null;
    const ma=deptMA(d,maYear);
    const total=a+p+b;
    const per100=ma?(total/ma*100).toFixed(1):null;
    const ov=active.filter(e=>status(e)==='overdue').length;
    const rp=rpTermine(rapporte.filter(r=>!r.planned&&r.dept===d&&inR(r.date)));
    tot.bs+=active.length;tot.a+=a;tot.p+=p;tot.b+=b;tot.ma+=ma;tot.ov+=ov;tot.on+=onTime;tot.iv+=intervals;tot.gs+=gapSum;tot.gn+=gapCount;
    if(!active.length&&!total&&!rp)return'';
    const covCol=tt===null?'var(--tx3)':tt>=S('tt_green')?'#10B981':tt>=S('tt_orange')?'#F59E0B':'#EF4444';
    return`<tr><td><strong>${d}</strong></td><td>${active.length}</td><td>${a}</td><td>${p}</td><td>${b}</td>
      <td style="font-weight:700">${total}</td>
      <td style="font-weight:600;color:${covCol}">${tt===null?'—':tt+'%'}</td>
      <td style="color:var(--tx2)">${avgGap===null?'—':avgGap+' T'}</td>
      <td style="color:var(--tx2)">${ma||'—'}</td><td style="font-weight:600">${per100??'—'}</td>
      <td style="color:${ov?'#EF4444':'var(--tx3)'};font-weight:${ov?600:400}">${ov}</td>
      <td style="color:var(--tx2)">${rp||'—'}</td></tr>`;
  }).join('');
  const paUn=personAudits.filter(x=>!x.planned&&inR(x.date)&&!personDept(x).length).length;
  const unRow=paUn?`<tr style="background:#FFFBEB"><td><strong>Personen-Audits ohne Abteilung</strong><div style="font-size:10px;color:#92400E">Zuordnung ergänzen: Admin-Menü → Abteilungen verwalten</div></td><td>—</td><td>—</td><td style="font-weight:600;color:#B45309">${paUn}</td><td>—</td><td style="font-weight:700">${paUn}</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>`:'';
  tot.p+=paUn;
  const tAll=tot.a+tot.p+tot.b;
  const tCov=tot.iv?Math.round(tot.on/tot.iv*100)+'%':'—';
  const tGap=tot.gn?Math.round(tot.gs/tot.gn)+' T':'—';
  tb.innerHTML=(rows||'<tr><td colspan="12" style="padding:10px;color:var(--tx3);text-align:center">Keine Daten im Zeitraum.</td></tr>')+unRow+
    `<tr style="border-top:2px solid var(--bd);background:var(--sf2)"><td><strong>Total</strong></td><td>${tot.bs}</td><td>${tot.a}</td><td>${tot.p}</td><td>${tot.b}</td><td style="font-weight:800">${tAll}</td><td style="font-weight:700">${tCov}</td><td>${tGap}</td><td>${tot.ma||'—'}</td><td style="font-weight:700">${tot.ma?(tAll/tot.ma*100).toFixed(1):'—'}</td><td>${tot.ov}</td><td>${rpTermine(rapporte.filter(r=>!r.planned&&inR(r.date)))||'—'}</td></tr>`;
}
function renderAuditors(){
  initOverviewDefaults();
  renderOverview();
  renderAudTags();
  const depts=getAllDepts();
  renderDeptTable();
  document.getElementById('agrid').innerHTML=auditors.filter(a=>{
    const m=auditorMeta[a]||{};
    return !m.hidden;
  }).map(a=>{
    const c=aC(a),ini=a.split(' ').map(w=>w[0]).join('');
    const ghosts=(window._ghostAudits||[]).filter(h=>h.auditor===a);
    const audYr=String(getSelectedYear('aud-year')||new Date().getFullYear());
    const paCount=personAudits.filter(p=>p.auditor&&p.auditor.trim()===a.trim()&&p.date&&p.date.startsWith(audYr)).length;
    const beratCount=data.reduce((s,e)=>s+(e.beratungen||[]).filter(b=>b.auditor===a&&b.date&&b.date.startsWith(audYr)).length,0);
    const hc=data.reduce((s,e)=>s+(e.auditHistory||[]).filter(h=>h.auditor===a&&h.date&&h.date.startsWith(audYr)).length,0)
             +ghosts.length+paCount;
    const pln=plans.filter(p=>p.auditor===a);
    const _kwS=kwToDate(dateToKW(today()));const nextP=pln.filter(p=>p.date>=_kwS).sort((x,y)=>x.date.localeCompare(y.date))[0];
    const dCC={};
    data.forEach(e=>(e.auditHistory||[]).filter(h=>h.auditor===a).forEach(()=>{if(e.dept){const k=e.dept.split(' + ')[0];dCC[k]=(dCC[k]||0)+1;}}));
    // Ghost audits grouped by their sheet name (stored as dept)
    ghosts.forEach(h=>{if(h.dept){const k=h.dept.split(' + ')[0];dCC[k]=(dCC[k]||0)+1;}});
    // Personen-Audits grouped by Abteilung
    personAudits.filter(p=>p.auditor&&p.auditor.trim()===a.trim()&&p.date&&p.date.startsWith(audYr)).forEach(p=>{
      const k=p.kat||p.firma||'Personen-Audit';
      dCC[k]=(dCC[k]||0)+1;
    });
    const now=new Date();
    const mC=data.reduce((s,e)=>s+(e.auditHistory||[]).filter(h=>h.auditor===a&&h.date&&parseDate(h.date).getMonth()===now.getMonth()&&parseDate(h.date).getFullYear()===now.getFullYear()).length,0)
             +ghosts.filter(h=>h.date&&parseDate(h.date).getMonth()===now.getMonth()&&parseDate(h.date).getFullYear()===now.getFullYear()).length
             +personAudits.filter(p=>p.auditor===a&&p.date&&parseDate(p.date).getMonth()===now.getMonth()&&parseDate(p.date).getFullYear()===now.getFullYear()).length;
    const kwC=pln.filter(p=>{const d2=new Date(p.date);return d2>=now&&d2<=new Date(now.getTime()+7*86400000);}).length;
    const recAll=[];
    data.forEach(e=>(e.auditHistory||[]).filter(h=>h.auditor===a).forEach(h=>recAll.push({name:e.name,date:h.date})));
    // Add Personen-Audits to recent list
    personAudits.filter(p=>p.auditor&&p.auditor.trim()===a.trim()).forEach(p=>recAll.push({name:`${p.kat}${p.bs?' – '+p.bs:''}`,date:p.date}));
    recAll.sort((a2,b)=>b.date.localeCompare(a2.date));
    const ferA=ferien.filter(f=>f.auditor===a);
    const meta=auditorMeta[a]||{};
    const title=meta.title||'Auditor';
    const soll=meta.soll||0;
    const qms=meta.qms||0,ums=meta.ums||0,ams=meta.ams||0;
    const pct=qms+ums+ams;
    const isAdmin=document.body.classList.contains('admin-mode');
    const isSecAdmin=document.body.classList.contains('secondary-admin');
    // Pie chart SVG for QMS/UMS/AMS
    function pieSlice(pct1,pct2,col2){
      if(pct2<=0)return'';
      const r=28,cx=32,cy=32;
      // Handle 100% case - draw full circle
      if(pct2>=100)return`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col2}"/>`;
      const a1=(pct1/100)*2*Math.PI-Math.PI/2;
      const a2=((pct1+pct2)/100)*2*Math.PI-Math.PI/2;
      const x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
      const x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2);
      const large=pct2>50?1:0;
      return`<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z" fill="${col2}"/>`;
    }
    const pieHTML=pct>0?`<svg width="64" height="64" viewBox="0 0 64 64" style="flex-shrink:0">
      <circle cx="32" cy="32" r="28" fill="#e5e7eb"/>
      ${pieSlice(0,qms,'#6366F1')}${pieSlice(qms,ums,'#10B981')}${pieSlice(qms+ums,ams,'#F59E0B')}
      <circle cx="32" cy="32" r="16" fill="var(--sf)"/>
    </svg>
    <div style="font-size:9px;line-height:1.6;color:var(--tx2)">
      ${qms?`<span style="color:#6366F1">■ QMS ${qms}%</span><br>`:''}${ums?`<span style="color:#10B981">■ UMS ${ums}%</span><br>`:''}${ams?`<span style="color:#F59E0B">■ AMS ${ams}%</span>`:''}
    </div>`:'';
    const canSeeSoll=document.body.classList.contains('admin-mode')||document.body.classList.contains('secondary-admin');
    const sollBar=soll>0&&canSeeSoll?`<div style="margin-bottom:7px">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--tx2);margin-bottom:3px"><span>Fortschritt</span><span>${hc}/${soll}</span></div>
      <div style="height:5px;background:var(--sf2);border-radius:3px"><div style="height:100%;width:${Math.min(100,Math.round(hc/soll*100))}%;background:${c};border-radius:3px"></div></div>
    </div>`:'';
    return`<div class="acard"><div class="ach"><div class="aav" style="background:${c}">${ini}</div><div><div class="an2">${a}</div><div class="at2">${title}</div></div></div>
      <div class="anums">
        <div class="anb"><div class="anv" style="color:${c}">${hc}</div><div class="anl">${audYr}</div></div>
        <div class="anb"><div class="anv" style="color:#6366F1">${pln.length}</div><div class="anl">Geplant</div></div>
        <div class="anb"><div class="anv" style="color:#8B5CF6">${beratCount}</div><div class="anl">Beratungen</div></div>
        <div class="anb"><div class="anv" style="color:#0EA5E9">${rapporte.filter(r=>!r.planned&&r.auditor===a&&(r.date||'').startsWith(String(audYr))).length}</div><div class="anl">Rapporte</div></div>
      </div>
      ${sollBar}
      ${nextP?`<div style="background:#EFF6FF;border-radius:5px;padding:6px 9px;font-size:10px;color:#1D4ED8;margin-bottom:7px"><i class="ti ti-calendar"></i> KW ${dateToKW(nextP.date)} · ${fd(nextP.date)}</div>`:'<div style="background:var(--sf2);border-radius:5px;padding:6px 9px;font-size:10px;color:var(--tx3);margin-bottom:7px">Kein Audit geplant</div>'}
      ${(isAdmin||isSecAdmin)&&pct>0?`<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--sf2);border-radius:8px;margin-bottom:7px">${pieHTML}</div>`:''}
      ${Object.keys(dCC).length?`<div class="arec">Nach Abteilung</div>${Object.entries(dCC).sort((a2,b)=>b[1]-a2[1]).map(([d2,n])=>`<div class="aritem"><span class="arname">${d2}</span><span style="font-weight:600;color:${c}">${n}</span></div>`).join('')}`:''}
      ${recAll.length?`<div class="arec" style="margin-top:5px">Letzte Audits</div>${recAll.slice(0,5).map(r=>`<div class="aritem"><span class="arname">${r.name}</span><span style="color:var(--tx3)">${fd(r.date)}</span></div>`).join('')}`:'<div style="font-size:10px;color:var(--tx3);text-align:center;padding:5px">Keine Audits</div>'}
    </div>`;
  }).join('');
}
// ═══ KW CALENDAR ═══
function getKWs(){
  const cur=dateToKW(today());
  const yr=new Date().getFullYear();
  const maxKW=dateToKW(yr+'-12-28')>52?53:52;
  // kwOff moves 4 KWs at a time (one block)
  return[0,1,2,3].map(i=>{
    let kw=cur+kwOff*4+i;
    if(kw<1)kw+=maxKW;
    if(kw>maxKW)kw-=maxKW;
    return kw;
  });
}
// Untere Zeile der KW-Karten: BC + Personal der KW, in der die Baustelle geplant ist
function kwPersBadge(e,kw){
  if(!e||e.type==='werkhof')return'';
  const yr=pmYearFor(kw);
  const h=persForKW(e,kw,yr);
  if(h)return`<span title="Personal KW ${kw}: ${h.count} (${h.manual?'manuell':'Import'})" style="font-weight:700;color:${h.count?'var(--tx2)':'#DC2626'}">👷 ${h.count}</span>`;
  if(e.lastPersonalKW!==undefined&&e.lastPersonalCount!==undefined)return`<span title="Kein Wert für KW ${kw} – zuletzt KW ${e.lastPersonalKW}: ${e.lastPersonalCount}" style="opacity:.65;font-style:italic">👷 ${e.lastPersonalCount} <span style="font-size:9px">(KW ${e.lastPersonalKW})</span></span>`;
  return`<span title="Keine Personalangabe" style="opacity:.55">👷 –</span>`;
}
function kwMetaLine(e,kw,pad){
  if(!e)return'';
  const bc=e.bc?`BC: ${e.bc}`:'',pb=kwPersBadge(e,kw);
  if(!bc&&!pb)return'';
  return`<div style="font-size:10px;color:var(--tx3);padding:${pad}">${bc}${bc&&pb?' · ':''}${pb}</div>`;
}
function renderKW(){
  if(calViewMode==='week'){
    const curKW=dateToKW(today());
    const displayKW=Math.max(1,Math.min(52,curKW+weekOff));
    document.getElementById('cal-ti').textContent=`KW ${displayKW} – Wochenansicht`;
    // Auditor row
    const ks=kwToDate(displayKW),ke=kwToDate(displayKW+1);
    const pP=plans.filter(p=>p.date>=ks&&p.date<ke);
    const aC2={};auditors.forEach(a=>aC2[a]=pP.filter(p=>p.auditor===a).length);
    document.getElementById('audrow').style.gridTemplateColumns=`repeat(${Math.min(auditors.length,4)},1fr)`;
    document.getElementById('audrow').innerHTML=auditors.map(a=>{const col=aC(a),ini=a.split(' ').map(w=>w[0]).join('');return`<div class="ac2"><div class="ac2av" style="background:${col}">${ini}</div><div><div class="ac2n">${a.split(' ')[0]}</div><div style="font-size:10px;color:var(--tx3)">Geplant</div></div><div class="ac2c" style="color:${col}">${aC2[a]||0}</div></div>`;}).join('');
    document.getElementById('kwgrid').style.width='100%';
    document.getElementById('kwgrid').innerHTML=renderWeekView(displayKW);
    return;
  }
  // KW 4-week view (default)
  // Table layout – no CSS grid needed
  document.getElementById('kwgrid').style.width='100%';
  const kws=getKWs(),curKW=dateToKW(today());
  document.getElementById('cal-ti').textContent=`KW ${kws[0]} – KW ${kws[3]}`;
  const ks=kwToDate(kws[0]),ke=kwToDate(kws[3]+1);
  const pP=plans.filter(p=>p.date>=ks&&p.date<ke);
  const aC2={};auditors.forEach(a=>aC2[a]=pP.filter(p=>p.auditor===a).length);
  document.getElementById('audrow').style.gridTemplateColumns=`repeat(${Math.min(auditors.length,4)},1fr)`;
  document.getElementById('audrow').innerHTML=auditors.map(a=>{const c=aC(a),ini=a.split(' ').map(w=>w[0]).join('');const hasFer=ferien.some(f=>f.auditor===a&&f.bis>=ks&&f.von<ke);return`<div class="ac2"><div class="ac2av" style="background:${c}">${ini}</div><div><div class="ac2n">${a.split(' ')[0]}</div><div style="font-size:10px;color:var(--tx3)">${hasFer?'🌴 Ferien':'Geplant'}</div></div><div class="ac2c" style="color:${c}">${aC2[a]||0}</div></div>`;}).join('');
  document.getElementById('kwgrid').innerHTML='<tr>'+kws.map(kw=>{
    const isCur=kw===curKW,ks2=kwToDate(kw),ke2=kwToDate(kw+1);
    const kwP=plans.map((p,i)=>({...p,_i:i})).filter(p=>p.date>=ks2&&p.date<ke2).sort((a,b)=>a.date.localeCompare(b.date));
    const fer=ferien.filter(f=>f.bis>=ks2&&f.von<ke2);
    return`<td class="kwcol">
      <div class="kwh ${isCur?'kwcur':'kwnorm'}">
        <span>KW ${kw}</span>
        ${kwP.length?`<div style="display:flex;gap:3px"><button onclick="kwRoute(${kw})"><i class="ti ti-map-2"></i></button><button onclick="kwPrint(${kw})"><i class="ti ti-printer"></i></button></div>`:''}
      </div>
      ${fer.map(f=>`<div class="kwfer">🌴 ${f.auditor.split(' ').pop()}: ${f.label}</div>`).join('')}
      ${kwP.length?kwP.map(p=>{const e=data.find(x=>x.id===p.bsId);const c=p.auditor&&p.auditor!=='Unbekannt'?aC(p.auditor):'#9CA3AF';const dn=['So','Mo','Di','Mi','Do','Fr','Sa'][parseDate(p.date).getDay()];return`<div class="kwe" onclick="openCalPop(${p._i})"><div class="kwen">${e?((e.type==='werkhof'?'🏠 ':'')+e.name):'(gel.)'}</div>${kwMetaLine(e,kw,'1px 0')}<span class="kwea" style="background:${c}">${p.auditor==='Unbekannt'?'? Zuteilen':p.auditor.split(' ').pop()}</span><div class="kwed">${dn} ${fd(p.date)}</div></div>`;}).join(''):`<div class="kwemp">Keine Planungen</div>`}
    </div>`;
  }).join('');
}
function kwRoute(kw){const ks=kwToDate(kw),ke=kwToDate(kw+1);const kwP=plans.filter(p=>p.date>=ks&&p.date<ke&&(!currentUser||p.auditor===currentUser));if(!kwP.length){showToast('Keine Planungen KW '+kw+(currentUser?' für '+currentUser:''));return;}openMaps(kwP.map(p=>data.find(e=>e.id===p.bsId)).filter(e=>e&&e.addr));}
function kwPrint(kw){
  const ks=kwToDate(kw),ke=kwToDate(kw+1);
  const kwP=plans.filter(p=>p.date>=ks&&p.date<ke);
  if(!kwP.length){showToast('Keine Planungen KW '+kw);return;}
  let ents=kwP.map(p=>({p,e:data.find(x=>x.id===p.bsId)})).filter(x=>x.e).sort((a,b)=>a.p.date.localeCompare(b.p.date));
  document.getElementById('pv-ti').textContent=`KW ${kw} – Auditplan`;
  document.getElementById('pv-da').textContent=`${fd(ks)} – ${fd(ke)}`;
  document.getElementById('pv-hd').innerHTML='<tr><th>#</th><th>Baustelle</th><th>Adresse</th><th>Abteilung</th><th>Tag</th><th>Auditor</th><th>Notiz</th></tr>';
  document.getElementById('pv-bd').innerHTML=ents.map(({p,e},i)=>{const c=aC(p.auditor);const dn=['So','Mo','Di','Mi','Do','Fr','Sa'][parseDate(p.date).getDay()];return`<tr><td style="color:var(--tx3)">${i+1}</td><td style="font-weight:600">${e.type==='werkhof'?'🏠 ':''}${e.name}</td><td>${e.addr||'—'}</td><td>${e.dept||'—'}</td><td>${dn} ${fd(p.date)}</td><td><span style="background:${c};color:#fff;padding:2px 7px;border-radius:20px;font-size:11px">${p.auditor}</span></td><td style="color:var(--tx3);font-style:italic">${e.note||''}</td></tr>`;}).join('');
  document.getElementById('pv').style.display='block';
}
// ── CALENDAR VIEW MODE ──
let calViewMode='week';
let weekOff=0; // separate offset for week view (in weeks)

function calBack(){if(calViewMode==='week'){weekOff--;renderKW();}else{kwOff--;renderKW();}}
function calForward(){if(calViewMode==='week'){weekOff++;renderKW();}else{kwOff++;renderKW();}}
function calToday(){weekOff=0;kwOff=0;renderKW();}

function setCalView(mode){
  calViewMode=mode;
  renderKW();
}

function renderWeekView(kw){
  const ks=kwToDate(kw),ke=kwToDate(kw+1);
  const audFilter=document.getElementById('kw-aud-filter')?.value||'';
  const days=['Mo','Di','Mi','Do','Fr']; // Sa+So weggelassen
  const cols=days.map((_,di)=>{
    const d=parseDate(ks);d.setDate(d.getDate()+di);
    const ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    const dayP=plans.map((p,i)=>({...p,_i:i})).filter(p=>p.date===ds&&(!audFilter||p.auditor===audFilter)).sort((a,b)=>a.date.localeCompare(b.date));
    // Also show completed audits for this day
    const dayAudits=data.flatMap(e=>(e.auditHistory||[]).filter(h=>h.date===ds&&(!audFilter||h.auditor===audFilter)).map(h=>({...h,eName:e.name,ePsp:e.psp,eType:e.type,eDept:e.dept,eId:e.id})));
    const isT=ds===today();
    const fer=ferien.filter(f=>f.bis>=ds&&f.von<=ds);
    return`<td class="kwcol">
      <div class="kwh ${isT?'kwcur':'kwnorm'}">
        <span>${days[di]} ${d.getDate()}.${d.getMonth()+1}.</span>
        ${dayP.length?`<div style="display:flex;gap:3px"><button onclick="kwRoute_day('${ds}')"><i class="ti ti-map-2"></i></button><button onclick="kwPrint_day('${ds}')"><i class="ti ti-printer"></i></button></div>`:''}
      </div>
      ${fer.map(f=>`<div class="kwfer">🌴 ${f.auditor.split(' ').pop()}: ${f.label}</div>`).join('')}
      ${(()=>{const gids=[...new Set(rapporte.filter(r=>r.date===ds&&(!audFilter||r.auditor===audFilter)).map(r=>r.groupId))];const gs=gids.map(g=>rapporte.filter(x=>x.groupId===g&&x.date===ds)).filter(m=>m.length).sort((a,b)=>(a[0].time||'').localeCompare(b[0].time||''));return gs.map(mem=>{const r=mem[0];const anyPlan=mem.some(m=>m.planned);return`<div class="kwe" style="border-left:3px solid #0EA5E9;${anyPlan?'':'background:#F0F9FF'}"><div class="kwe-top" onclick="openRapportEdit(${r.id})" style="cursor:pointer"><div class="kwen" style="color:#0369A1">${anyPlan?'':'✓ '}📋 ${r.type}${r.seriesId?' 🔁':''}${r.time?' '+r.time:''}${(r.dept||r.ort)?`<div style="font-size:10px;font-weight:400;color:var(--tx3)">${[r.dept,r.ort].filter(Boolean).join(' · ')}</div>`:''}</div><span style="display:flex;gap:3px;flex-wrap:wrap;margin-top:2px">${mem.map(m=>m.planned?`<span class="kwea" title="${m.auditor}: geplant" style="background:transparent;border:1.5px solid ${aC(m.auditor)};color:${aC(m.auditor)}">${m.auditor.split(' ').pop()}</span>`:`<span class="kwea" title="${m.auditor}: teilgenommen" style="background:${aC(m.auditor)}">✓ ${m.auditor.split(' ').pop()}</span>`).join('')}</span></div>${anyPlan?`<div class="kwe-move" style="display:flex;gap:2px;padding:2px 6px 3px;border-top:1px solid var(--bd)"><button onclick="moveRapportTo(${r.id},'${rpAddDays(kwToDate(kw),-3)}')" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4">←</button>${days.map((day,dj)=>`<button onclick="moveRapportTo(${r.id},'${rpAddDays(kwToDate(kw),dj)}')" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:${rpAddDays(kwToDate(kw),dj)===ds?'#0EA5E9':'var(--sf2)'};color:${rpAddDays(kwToDate(kw),dj)===ds?'#fff':'var(--tx2)'};font-size:9px;cursor:pointer;line-height:1.4">${day}</button>`).join('')}<button onclick="moveRapportTo(${r.id},'${kwToDate(kw+1)}')" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4">→</button></div>`:''}</div>`;}).join('');})()}
      ${(()=>{const bp=beratPlan.filter(p=>p.date===ds&&(!audFilter||p.auditor===audFilter));return bp.map(p=>{const e=data.find(x=>x.id===p.bsId);const audCol=aC(p.auditor||'');return`<div class="kwe" style="border-left:3px solid #8B5CF6"><div class="kwe-top" onclick="openBeratPlanPop(${p.id})" style="cursor:pointer"><div class="kwen">💬 ${e?pspPre(e.psp)+e.name:'(gel.)'}</div>${kwMetaLine(e,kw,'0 0 1px')}<span class="kwea" style="background:${audCol}">${(p.auditor||'?').split(' ').pop()}</span></div>${p.note?`<div style="font-size:10px;color:#7C3AED;padding:2px 6px 3px">${p.note}</div>`:''}<div class="kwe-move" style="display:flex;gap:2px;padding:2px 6px 3px;border-top:1px solid var(--bd)"><button onclick="moveBeratPlan(${p.id},'${kwToDate(kw-1)}',4)" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4">←</button>${days.map((day,dj)=>`<button onclick="moveBeratPlan(${p.id},'${kwToDate(kw)}',${dj})" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:${dj===di?'var(--blue)':'var(--sf2)'};color:${dj===di?'#fff':'var(--tx2)'};font-size:9px;cursor:pointer;line-height:1.4">${day}</button>`).join('')}<button onclick="moveBeratPlan(${p.id},'${kwToDate(kw+1)}',0)" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4">→</button></div></div>`;}).join('');})()}
      ${(()=>{const done=data.flatMap(e=>(e.beratungen||[]).filter(b=>b.date===ds).map(b=>({...b,eName:e.name,ePsp:e.psp,eId:e.id})));return done.map(b=>{const bAudCol=aC(b.auditor||'');return`<div class="kwe" style="background:#F5F3FF;border-left:3px solid #8B5CF6;cursor:pointer" onclick="openBeratDoneUndo(${b.eId},${b.id})"><div class="kwe-top"><div class="kwen" style="color:#7C3AED">✓ 💬 ${pspPre(b.ePsp)}${b.eName}</div>${kwMetaLine(data.find(x=>x.id===b.eId),kw,'0 0 1px')}<span class="kwea" style="background:${bAudCol}">${(b.auditor||'?').split(' ').pop()}</span></div>${b.note?`<div style="font-size:10px;color:#7C3AED;padding:2px 6px 3px">${b.note}</div>`:''}</div>`;}).join('');})()}
      ${dayAudits.map(h=>{const e=data.find(x=>x.id===h.eId);return`<div class="kwe" style="background:#F0FDF4;border-left:3px solid #10B981;cursor:pointer" onclick="openAuditUndo(${h.eId},'${h.date}')"><div class="kwe-top"><div class="kwen" style="color:#065F46">✓ ${e&&e.type==='werkhof'?'🏠 ':''}${pspPre(h.ePsp)}${h.eName}</div>${kwMetaLine(e,kw,'0 0 1px')}<span class="kwea" style="background:${aC(h.auditor||'')}">${(h.auditor||'?').split(' ').pop()}</span></div></div>`;}).join('')}
      ${(()=>{const paP=personAudits.filter(p=>p.planned&&p.date===ds&&(!audFilter||p.auditor===audFilter));return paP.map(p=>{const col=p.auditor?aC(p.auditor):'#9CA3AF';return`<div class="kwe"><div class="kwe-top" onclick="openPersonAuditPop(${p.id})" style="cursor:pointer"><div class="kwen">👤 ${p.person}${p.bs?' · '+p.bs:''}</div><span class="kwea" style="background:${col}">${p.auditor?p.auditor.split(' ').pop():'? Zuteilen'}</span></div><div class="kwe-move" style="display:flex;gap:2px;padding:2px 6px 3px;border-top:1px solid var(--bd)"><button onclick="movePersonAudit(${p.id},'${kwToDate(kw-1)}',4)" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4">←</button>${days.map((day,dj)=>`<button onclick="movePersonAudit(${p.id},'${kwToDate(kw)}',${dj})" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:${dj===di?'var(--blue)':'var(--sf2)'};color:${dj===di?'#fff':'var(--tx2)'};font-size:9px;cursor:pointer;line-height:1.4">${day}</button>`).join('')}<button onclick="movePersonAudit(${p.id},'${kwToDate(kw+1)}',0)" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4">→</button></div></div>`;}).join('');})()}
      ${(()=>{const paDone=personAudits.filter(p=>!p.planned&&p.date===ds&&(!audFilter||p.auditor===audFilter));return paDone.map(p=>{const audCol=aC(p.auditor||'');return`<div class="kwe" style="background:#FFFBEB;border-left:3px solid #F59E0B;cursor:pointer" onclick="openPersonAuditDoneUndo(${p.id})"><div class="kwe-top"><div class="kwen" style="color:#B45309">✓ 👤 ${p.person}${p.bs?' · '+p.bs:''}</div><span class="kwea" style="background:${audCol}">${(p.auditor||'?').split(' ').pop()}</span></div></div>`;}).join('');})()}
      ${dayP.length?dayP.map(p=>{const e=data.find(x=>x.id===p.bsId);const col=p.auditor&&p.auditor!=='Unbekannt'?aC(p.auditor):'#9CA3AF';const isSel=multiAuditMode&&planned.has(p.bsId);return`<div class="kwe" style="${isSel?'background:#EFF6FF;border-left:3px solid var(--blue)':''}"><div class="kwe-top" onclick="${multiAuditMode?`toggleKWAuditSel(${p.bsId})`:`openCalPop(${p._i})`}" style="cursor:pointer"><div class="kwen">${isSel?'☑ ':''}${e?((e.type==='werkhof'?'🏠 ':'')+pspPre(e.psp)+e.name):'(gel.)'}</div>${kwMetaLine(e,kw,'0 0 1px')}<span class="kwea" style="background:${col}">${p.auditor==='Unbekannt'||!p.auditor?'? Zuteilen':p.auditor.split(' ').pop()}</span></div>${!multiAuditMode?`<div class="kwe-move" style="display:flex;gap:2px;padding:2px 6px 3px;border-top:1px solid var(--bd)"><button onclick="movePlan(${p._i},'${kwToDate(kw-1)}',4)" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4" title="Vorwoche Fr">←</button>${days.map((day,dj)=>`<button onclick="movePlan(${p._i},'${kwToDate(kw)}',${dj})" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:${dj===di?'var(--blue)':'var(--sf2)'};color:${dj===di?'#fff':'var(--tx2)'};font-size:9px;cursor:pointer;line-height:1.4">${day}</button>`).join('')}<button onclick="movePlan(${p._i},'${kwToDate(kw+1)}',0)" style="padding:1px 4px;border-radius:3px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx2);font-size:9px;cursor:pointer;line-height:1.4" title="Nächste Woche Mo">→</button></div>`:''}
</div>`;}).join(''):`<div class="kwemp">Frei</div>`}
    </td>`;
  });
  return '<tr>'+cols.join('')+'</tr>';
}

function movePersonAudit(id,ks,dayOffset){
  const p=personAudits.find(x=>x.id===id);
  if(!p)return;
  const d=parseDate(ks);d.setDate(d.getDate()+dayOffset);
  const newDate=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  p.date=newDate;p.kw=dateToKW(newDate);
  saveNow();renderKW();renderPA2();
  showToast('📅 Personen-Audit verschoben auf '+fd(newDate),2000);
}
function openPersonAuditDoneUndo(id){
  const p=personAudits.find(x=>x.id===id);
  if(!p)return;
  if(p.planned){
    undoPoint(`«${p.person}» als erledigt markiert`,()=>{renderKW();renderPA2();renderAuditors();});
    p.planned=false;
  }else{
    undoPoint(`«${p.person}» wieder als geplant markiert`,()=>{renderKW();renderPA2();renderAuditors();});
    p.planned=true;
  }
  saveNow();renderKW();renderPA2();renderAuditors();
}
function movePlan(planIdx,ks,dayOffset){
  if(planIdx<0||planIdx>=plans.length)return;
  const d=parseDate(ks);d.setDate(d.getDate()+dayOffset);
  const newDate=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  plans[planIdx].date=newDate;
  saveNow();renderKW();renderCalSB();updateStats();
  showToast('📅 Verschoben auf '+fd(newDate),2000);
}
function kwRoute_day(ds){
  const aud=currentUser||'';
  const dP=plans.filter(p=>p.date===ds&&(!aud||p.auditor===aud));
  if(!dP.length){
    // Try all if no match for current user
    const all=plans.filter(p=>p.date===ds);
    if(!all.length){showToast('Keine Planungen für diesen Tag');return;}
    if(!aud){openMaps(all.map(p=>data.find(e=>e.id===p.bsId)).filter(e=>e&&e.addr));return;}
    showToast('Keine Planungen für '+aud+' an diesem Tag');return;
  }
  openMaps(dP.map(p=>data.find(e=>e.id===p.bsId)).filter(e=>e&&e.addr));
}
function kwPrint_day(ds){const kw=dateToKW(ds);kwPrint(kw);}

function renderCalSB(){
  document.getElementById('cal-pl').innerHTML=plans.length?plans.slice().reverse().map((p,ri)=>{const i=plans.length-1-ri;const e=data.find(x=>x.id===p.bsId);const c=aC(p.auditor);return`<div class="cpi"><button class="cpid2" onclick="delPlanIdx(${i})"><i class="ti ti-trash"></i></button><div class="cpin">${e?((e.type==='werkhof'?'🏠 ':'')+e.name):'(gel.)'}</div><div class="cpim">${e?e.dept||'':''}</div><div class="cpit"><span class="cpia" style="background:${c}">${p.auditor.split(' ').pop()}</span><span class="cpid">KW ${dateToKW(p.date)} · ${fd(p.date)}</span></div></div>`;}).join(''):`<div style="padding:12px;font-size:11px;color:var(--tx3);text-align:center">Keine Planungen.</div>`;
}

// ═══ Personen-Audits Panel (Kartenansicht) - reine Übersichtsliste, verändert die Karte nicht ═══
let _paPinsLayer=null;
function togglePAPanel(){
  const p=document.getElementById('pa-panel');
  const opening=p.style.display==='none';
  p.style.display=opening?'block':'none';
  if(opening){
    const dEl=document.getElementById('pa-panel-date');
    if(!dEl.value)dEl.value=today();
    const audSel=document.getElementById('pa-panel-aud');
    if(audSel&&!audSel.dataset.filled){
      audSel.innerHTML=`<option value="__me__">👤 Nur ich (${currentUser||'—'})</option>`+
        `<option value="">Alle Auditoren</option>`+
        auditors.map(a=>`<option value="${a}">${a}</option>`).join('');
      audSel.value='__me__';
      audSel.dataset.filled='1';
    }
    renderPAPanel();
  }
}
function renderPAPanel(){
  const dEl=document.getElementById('pa-panel-date');
  const ds=dEl.value||today();
  const audSel=document.getElementById('pa-panel-aud');
  const audFilterVal=audSel?audSel.value:'__me__';
  const audFilter=audFilterVal==='__me__'?currentUser:(audFilterVal||null);
  const list=personAudits.filter(p=>p.planned&&p.date===ds&&(!audFilter||p.auditor===audFilter)).sort((a,b)=>(a.auditor||'').localeCompare(b.auditor||'')||a.person.localeCompare(b.person));
  const badge=document.getElementById('pa-panel-badge');
  if(badge)badge.textContent=list.length||'';
  const el=document.getElementById('pa-panel-list');
  if(!list.length){el.innerHTML='<div style="font-size:12px;color:var(--tx3);padding:8px 0">Keine geplanten Personen-Audits an diesem Tag.</div>';}
  else{
    el.innerHTML=list.map((p,pi)=>{
      const col=aC(p.auditor||'');
      return`<div onclick="${p.lat&&p.lng?`map.setView([${p.lat},${p.lng}],15)`:''}" style="padding:8px 10px;background:var(--sf2);border-radius:8px;margin-bottom:6px;border-left:3px solid ${col};${p.lat&&p.lng?'cursor:pointer':''}">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:2px">
          <span style="font-size:12px;font-weight:700;color:var(--tx)">${p.lat&&p.lng?'📍 ':''}${p.person}</span>
          <span style="font-size:9px;font-weight:700;color:#fff;background:${col};padding:2px 6px;border-radius:6px;flex-shrink:0">${(p.auditor||'?').split(' ').pop()}</span>
        </div>
        ${(p.addr||p.bs)?`<div style="font-size:11px;color:var(--tx2)">${p.addr||p.bs}</div>`:''}
        ${p.kat?`<div style="font-size:10px;color:var(--tx3)">${p.kat}</div>`:''}
      </div>`;
    }).join('');
  }
  renderPAPins(list);
}
// Eigene Pin-Ebene für geplante Personen-Audits - klassische Tropfen-Pin-Form, damit sie sich
// klar von den Baustellen-Icons unterscheiden. Verändert die bestehende Baustellen-Karte nicht.
function renderPAPins(list){
  if(!map)return;
  if(_paPinsLayer){map.removeLayer(_paPinsLayer);_paPinsLayer=null;}
  const withCoords=list.filter(p=>p.lat&&p.lng);
  if(!withCoords.length)return;
  _paPinsLayer=L.layerGroup();
  withCoords.forEach(p=>{
    const col=aC(p.auditor||'')||'#F59E0B';
    const icon=L.divIcon({
      className:'',
      html:`<div style="position:relative;width:26px;height:34px">
        <svg width="26" height="34" viewBox="0 0 26 34" style="position:absolute;top:0;left:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))">
          <path d="M13 0C5.8 0 0 5.8 0 13c0 9.5 13 21 13 21s13-11.5 13-21C26 5.8 20.2 0 13 0z" fill="${col}"/>
          <circle cx="13" cy="13" r="6.5" fill="#fff"/>
        </svg>
        <div style="position:absolute;top:5px;left:0;width:26px;text-align:center;font-size:11px">👤</div>
      </div>`,
      iconSize:[26,34],iconAnchor:[13,34],popupAnchor:[0,-30]
    });
    L.marker([p.lat,p.lng],{icon}).bindPopup(`<b>👤 ${p.person}</b><br>${p.addr||p.bs||''}<br><span style="color:${col}">${p.auditor||''}</span>`).addTo(_paPinsLayer);
  });
  _paPinsLayer.addTo(map);
}

function toggleDayPlanMode(){
  window._dayPlanMode=!window._dayPlanMode;
  const btn=document.getElementById('dayplan-toggle');
  const panel=document.getElementById('dayplan-panel');
  const dateEl=document.getElementById('dayplan-date');
  if(dateEl&&!dateEl.value)dateEl.value=today();
  if(window._dayPlanMode){
    btn.style.background='var(--blue)';btn.style.color='#fff';btn.style.borderColor='var(--blue)';
    panel.style.display='block';
  }else{
    btn.style.background='var(--sf)';btn.style.color='var(--tx)';btn.style.borderColor='var(--bd)';
    panel.style.display='none';
  }
  renderMarkers();
}
function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  const btn=document.getElementById('sb-toggle');
  const collapsed=sb.classList.toggle('collapsed');
  btn.textContent=collapsed?'›':'‹';
  btn.style.left=collapsed?'0px':'275px';
  setTimeout(()=>map.invalidateSize(),280);
}


function delPlanIdx(i){plans.splice(i,1);renderCalSB();renderKW();updateStats();saveNow();}
let _undoBsId=null, _undoDate=null;
function openAuditUndo(bsId,date){
  const e=data.find(x=>x.id===bsId);if(!e)return;
  _undoBsId=bsId;_undoDate=date;
  document.getElementById('audit-undo-title').textContent=e.name;
  const h=(e.auditHistory||[]).find(x=>x.date===date)||{};
  document.getElementById('audit-undo-info').textContent=
    `Auditiert am ${fd(date)}${h.auditor?' von '+h.auditor:''}
Audit rückgängig machen?`;
  document.getElementById('audit-undo-bg').style.display='flex';
}
function closeAuditUndo(){
  document.getElementById('audit-undo-bg').style.display='none';
  _undoBsId=null;_undoDate=null;
}
function undoAudit(){
  if(!_undoBsId||!_undoDate)return;
  const e=data.find(x=>x.id===_undoBsId);if(!e)return;
  e.auditHistory=(e.auditHistory||[]).filter(h=>h.date!==_undoDate);
  const sorted=[...(e.auditHistory||[])].sort((a,b)=>b.date.localeCompare(a.date));
  const prevAuditor=e.auditor||currentUser;
  e.lastAudit=sorted[0]?.date||null;
  e.lastKW=sorted[0]?.kw||null;
  e.auditor=sorted[0]?.auditor||null;
  // Restore as planned on the same date
  if(!plans.some(p=>p.bsId===_undoBsId&&p.date===_undoDate)){
    plans.push({bsId:_undoBsId,auditor:prevAuditor,date:_undoDate,id:Date.now()+Math.random()});
  }
  log('Audit rückgängig 🗑',e.name,'#6B7280','');
  closeAuditUndo();
  saveNow();renderAll();renderKW();
  showToast('✓ Audit rückgängig – wieder als Geplant',2000);
}
function openCalPop(idx){
  popMode='site';popPersonId=null;
  popIdx=idx;const p=plans[idx];if(!p)return;
  const e=data.find(x=>x.id===p.bsId);
  document.getElementById('pop-n').textContent=e?((e.type==='werkhof'?'🏠 ':'')+e.name):'(gel.)';
  const kwNum=dateToKW(p.date);
  document.getElementById('pop-m').textContent=`${e?e.dept||'—':'—'} · KW ${kwNum} · ${fd(p.date)}`;
  // Populate auditor dropdown - always visible for reassignment
  const audSel=document.getElementById('pop-aud-sel');
  if(audSel){
    audSel.innerHTML='<option value="">— Auditor wählen —</option>'+auditors.map(a=>`<option value="${a}"${a===p.auditor?' selected':''}>${a}</option>`).join('');
  }
  // Date picker
  document.getElementById('pop-ai').innerHTML=`<label style="font-size:11px;color:var(--tx2);display:block;margin-bottom:3px">Datum Audit:</label><input type="date" id="pop-date" value="${p.date}" style="width:100%;padding:6px 8px;border:1px solid var(--bd);border-radius:6px;background:var(--sf2);color:var(--tx);font-size:12px">`;
  document.getElementById('calpop').style.display='block';
  document.getElementById('calpop-bg').style.display='block';
}
// Personen-Audits nutzen dasselbe Popup wie Baustellen-Audits (Auditiert/Nicht besucht/Zuteilen),
// nur an personAudits statt plans gekoppelt (per id statt Array-Index).
function openPersonAuditPop(id){
  popMode='person';popIdx=null;
  popPersonId=id;const p=personAudits.find(x=>x.id===id);if(!p)return;
  document.getElementById('pop-n').textContent='👤 '+p.person+(p.bs?' – '+p.bs:'');
  const kwNum=dateToKW(p.date);
  document.getElementById('pop-m').textContent=`${p.kat||'—'} · KW ${kwNum} · ${fd(p.date)}`;
  const audSel=document.getElementById('pop-aud-sel');
  if(audSel){
    audSel.innerHTML='<option value="">— Auditor wählen —</option>'+auditors.map(a=>`<option value="${a}"${a===p.auditor?' selected':''}>${a}</option>`).join('');
  }
  document.getElementById('pop-ai').innerHTML=`
    <label style="font-size:11px;color:var(--tx2);display:block;margin-bottom:3px">Datum Audit:</label>
    <input type="date" id="pop-date" value="${p.date}" style="width:100%;padding:6px 8px;border:1px solid var(--bd);border-radius:6px;background:var(--sf2);color:var(--tx);font-size:12px;margin-bottom:8px">
    <div style="position:relative">
      <label style="font-size:11px;color:var(--tx2);display:block;margin-bottom:3px">Adresse <span id="pop-addr-hint" style="font-weight:400;font-size:10px;color:var(--blue)"></span></label>
      <input type="text" id="pop-addr" value="${(p.addr||'').replace(/"/g,'&quot;')}" placeholder="Strasse Nr, PLZ Ort" oninput="addrAutocomplete(this.value,'pop')" autocomplete="off" style="width:100%;padding:6px 8px;border:1px solid var(--bd);border-radius:6px;background:var(--sf2);color:var(--tx);font-size:12px">
      <div id="pop-addr-suggestions" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--sf);border:1px solid var(--bd);border-radius:var(--rs);z-index:999;max-height:180px;overflow-y:auto;box-shadow:0 4px 12px rgba(0,0,0,.15)"></div>
    </div>`;
  window._popPendingLat=p.lat||null;window._popPendingLng=p.lng||null;
  document.getElementById('calpop').style.display='block';
  document.getElementById('calpop-bg').style.display='block';
}
function popChangeAud(val){
  if(popMode==='person'){if(popPersonId!==null){const p=personAudits.find(x=>x.id===popPersonId);if(p)p.auditor=val;}return;}
  if(popIdx!==null&&plans[popIdx])plans[popIdx].auditor=val;
}
function closeCalPop(){document.getElementById('calpop').style.display='none';document.getElementById('calpop-bg').style.display='none';popIdx=null;popPersonId=null;popMode='site';}
function popAct(action){
  if(popMode==='person'){
    if(popPersonId===null)return;
    const p=personAudits.find(x=>x.id===popPersonId);if(!p)return;
    const selEl=document.getElementById('pop-aud-sel');
    if(selEl&&selEl.value)p.auditor=selEl.value;
    const dateEl=document.getElementById('pop-date');
    const useDate=dateEl?dateEl.value:p.date;
    // Adresse übernehmen, falls im Popup geändert - unabhängig davon, welche der drei
    // Aktionen (Zuteilen/Auditiert/Nicht besucht) gewählt wird.
    const addrEl=document.getElementById('pop-addr');
    if(addrEl){
      p.addr=addrEl.value.trim();
      if(window._popPendingLat!==undefined){p.lat=window._popPendingLat;p.lng=window._popPendingLng;}
    }
    if(action==='assign'){
      if(!p.auditor){showToast('Bitte Auditor wählen');return;}
      if(useDate){p.date=useDate;p.kw=dateToKW(useDate);}
      log('Zugeteilt (Personen-Audit)',p.person,'#6366F1',p.auditor);
      closeCalPop();renderKW();renderPA2();saveNow();return;
    }
    if(action==='done'){
      if(!p.auditor){showToast('Bitte zuerst Auditor zuteilen');return;}
      if(useDate){p.date=useDate;p.kw=dateToKW(useDate);}
      p.planned=false;
      log('Auditiert ✓ (Personen-Audit)',p.person,'#10B981',p.auditor);
    }else{
      log('Nicht besucht ✗ (Personen-Audit)',p.person,'#EF4444',p.auditor||'—');
      personAudits=personAudits.filter(x=>x.id!==popPersonId);
    }
    closeCalPop();renderKW();renderPA2();renderAuditors();saveNow();return;
  }
  if(popIdx===null)return;const p=plans[popIdx];if(!p)return;const e=data.find(x=>x.id===p.bsId);if(!e)return;
  // Get selected auditor if Unbekannt
  const selEl=document.getElementById('pop-aud-sel');
  if(selEl&&selEl.value)p.auditor=selEl.value;
  // Get precise date from picker (user may have changed it)
  const dateEl=document.getElementById('pop-date');
  const useDate=dateEl?dateEl.value:p.date;
  if(action==='assign'){
    if(!p.auditor||p.auditor==='Unbekannt'){showToast('Bitte Auditor wählen');return;}
    if(useDate)p.date=useDate;
    log('Zugeteilt',e.name,'#6366F1',p.auditor);
    closeCalPop();renderAll();saveNow();if(curView==='cal'){renderCalSB();renderKW();}return;
  }
  if(action==='done'){
    if(!p.auditor||p.auditor==='Unbekannt'){showToast('Bitte zuerst Auditor zuteilen');return;}
    const auditDate=useDate||p.date;
    e.lastAudit=auditDate;e.lastKW=dateToKW(auditDate);e.auditor=p.auditor;
    // Add to auditHistory so it appears in detail panel and can be deleted
    if(!e.auditHistory)e.auditHistory=[];
    const exists=e.auditHistory.some(h=>h.date===auditDate&&h.auditor===p.auditor);
    if(!exists)e.auditHistory.push({date:auditDate,kw:dateToKW(auditDate),auditor:p.auditor});
    log('Auditiert ✓',e.name,'#10B981',p.auditor);
  }else log('Nicht besucht ✗',e.name,'#EF4444',p.auditor||'—');
  plans.splice(popIdx,1);closeCalPop();saveNow();renderAll();
  if(curView==='cal'){renderCalSB();renderKW();}
}
// ═══ QUICK AUDIT ═══
function showQA(id,x,y){const e=data.find(x=>x.id===id);if(!e||e.paused||!e.active)return;qaId=id;document.getElementById('qa-n').textContent=e.name;document.getElementById('qa-auds').innerHTML=auditors.map(a=>{const c=aC(a),ini=a.split(' ').map(w=>w[0]).join('');return`<button class="qaub" onclick="qaConf('${a.replace(/'/g,"\\'")}')"><span style="width:18px;height:18px;border-radius:50%;background:${c};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0">${ini}</span>${a}</button>`;}).join('');const qa=document.getElementById('qa');qa.style.display='block';const vw=window.innerWidth,vh=window.innerHeight;qa.style.left=Math.min(x,vw-200)+'px';qa.style.top=Math.min(y,vh-190)+'px';}
function qaConf(aud){
  const e=data.find(x=>x.id===qaId);if(!e)return;
  const dt=today();
  e.lastAudit=dt;e.lastKW=dateToKW(dt);e.auditor=aud;
  // Add to auditHistory so it can be deleted later
  if(!e.auditHistory)e.auditHistory=[];
  const exists=e.auditHistory.some(h=>h.date===dt&&h.auditor===aud);
  if(!exists)e.auditHistory.push({date:dt,kw:dateToKW(dt),auditor:aud});
  plans=plans.filter(p=>!(p.bsId===e.id&&p.date<=dt));
  log('Auditiert ✓',e.name,'#10B981',aud);
  saveNow();closeQA();renderAll();selEntry(qaId);
  showToast('✓ Audit erfasst',2000);
}
function closeQA(){document.getElementById('qa').style.display='none';qaId=null;}
// ═══ MORE MENU ═══
function toggleMore(ev){
  const m=document.getElementById('more-m');
  const badge=document.getElementById('sb-count-badge');
  if(badge){const n=(window._piCollectBox||[]).length;badge.textContent=n?`(${n})`:'';}
  updateTempWorkersBadge();
  if(m.style.display!=='none'){m.style.display='none';return;}
  // Move menu to body to escape any overflow/z-index stacking context
  if(m.parentElement!==document.body)document.body.appendChild(m);
  const btn=ev?ev.currentTarget:document.getElementById('more-w').querySelector('button');
  if(btn){
    const r=btn.getBoundingClientRect();
    m.style.position='fixed';
    m.style.top=(r.bottom+4)+'px';
    m.style.right=(window.innerWidth-r.right)+'px';
    m.style.left='auto';
    m.style.zIndex='99999';
  }
  m.style.display='block';
}
function toggleDark(){document.body.classList.toggle('dark');localStorage.setItem('audit_dark',document.body.classList.contains('dark')?'1':'0');}
// ═══ PRINT ═══
function openKWPrintDialog(){
  // Populate auditor dropdown
  const audSel=document.getElementById('kw-print-aud');
  audSel.innerHTML='<option value="">Alle Auditoren</option>'+auditors.map(a=>`<option value="${a}">${a}</option>`).join('');
  // Populate KW dropdown (current KW ± 8 weeks)
  const curKW=dateToKW(today());
  const kwSel=document.getElementById('kw-print-kw');
  kwSel.innerHTML='';
  for(let i=-2;i<=10;i++){
    const kw=Math.max(1,Math.min(52,curKW+i));
    const ks=kwToDate(kw);
    const ke=kwToDate(kw+1);
    const d=parseDate(ks);
    const label=`KW ${kw} (${d.getDate()}.${d.getMonth()+1}. – ${parseDate(ke).getDate()-1}.${parseDate(ke).getMonth()+1}.)${i===0?' ← aktuell':''}`;
    const opt=document.createElement('option');opt.value=kw;opt.textContent=label;if(i===0)opt.selected=true;
    kwSel.appendChild(opt);
  }
  document.getElementById('kw-print-bg').style.display='flex';
}

function doKWPrint(){
  const aud=document.getElementById('kw-print-aud').value;
  const kw=+document.getElementById('kw-print-kw').value;
  document.getElementById('kw-print-bg').style.display='none';
  const ks=kwToDate(kw);
  const days=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag'];
  const audLabel=aud||'Alle Auditoren';
  const title=`KW ${kw} – ${audLabel}`;
  document.getElementById('pv-ti').textContent=title;
  document.getElementById('pv-da').textContent=`${parseDate(ks).toLocaleDateString('de-CH',{day:'2-digit',month:'2-digit',year:'numeric'})}`;
  const ts=document.getElementById('pv-ts');if(ts)ts.textContent=new Date().toLocaleString('de-CH',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});

  // Build 5-column week view like the calendar
  let cols='';
  for(let di=0;di<5;di++){
    const d=parseDate(ks);d.setDate(d.getDate()+di);
    const ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    let dayP=plans.filter(p=>p.date===ds);
    if(aud)dayP=dayP.filter(p=>p.auditor===aud);
    // Also show completed audits
    let dayAud=data.flatMap(e=>(e.auditHistory||[]).filter(h=>h.date===ds).map(h=>({...h,eName:e.name,eAddr:e.addr,eDept:e.dept})));
    if(aud)dayAud=dayAud.filter(h=>h.auditor===aud);

    const isToday2=ds===today();
    cols+=`<td style="border:1px solid #e5e7eb;padding:0;vertical-align:top;width:20%">
      <div style="background:${isToday2?'#E24B4A':'#1A1D2E'};color:#fff;padding:8px 10px;font-weight:700;font-size:13px">${days[di]}<span style="font-weight:400;font-size:11px;opacity:.8;margin-left:6px">${d.getDate()}.${d.getMonth()+1}.</span></div>
      ${dayAud.map(h=>`<div style="padding:6px 10px;border-bottom:1px solid #e5e7eb;background:#F0FDF4;display:flex;align-items:flex-start;gap:6px">
        <span style="color:#10B981;font-size:13px;flex-shrink:0;margin-top:1px">✓</span>
        <div>
          <div style="font-size:14px;font-weight:600;color:#065F46">${h.eName}</div>
          <div style="font-size:12px;color:#6B7280">${h.eAddr||''}</div>
          <div style="font-size:10px;color:#10B981;font-weight:500">${h.auditor||''}</div>
        </div>
      </div>`).join('')}
      ${dayP.map(p=>{const e=data.find(x=>x.id===p.bsId);return`<div style="padding:6px 10px;border-bottom:1px solid #e5e7eb;display:flex;align-items:flex-start;gap:6px">
        <span style="color:#6366F1;font-size:13px;flex-shrink:0;margin-top:1px">●</span>
        <div>
          <div style="font-size:14px;font-weight:600">${e?(e.type==='werkhof'?'🏠 ':'')+e.name:'(gel.)'}</div>
          <div style="font-size:10px;color:#6B7280">${e?e.addr||'':''}</div>
          <div style="font-size:10px;color:#6366F1;font-weight:500">${p.auditor||''}</div>
        </div>
      </div>`;}).join('')}
      ${!dayP.length&&!dayAud.length?'<div style="padding:16px 8px;font-size:11px;color:#D1D5DB;text-align:center;font-style:italic">— frei —</div>':''}
    </td>`;
  }

  document.getElementById('pv-hd').innerHTML='';
  document.getElementById('pv-bd').innerHTML=`<tr style="vertical-align:top">${cols}</tr>`;
  document.getElementById('pv').style.display='block';
}


function openPrintSel(){if(!planned.size)return;let sel=nnSort(data.filter(e=>planned.has(e.id)));document.getElementById('pv-ti').textContent='Route / Ausgewählte Baustellen';document.getElementById('pv-da').textContent=new Date().toLocaleDateString('de-CH',{weekday:'long',year:'numeric',month:'long',day:'numeric'});document.getElementById('pv-hd').innerHTML='<tr><th>#</th><th>Baustelle</th><th>Adresse</th><th>Abteilung</th><th>Auditor</th><th>Notiz</th></tr>';document.getElementById('pv-bd').innerHTML=sel.map((e,i)=>`<tr><td style="color:var(--tx3)">${i+1}</td><td style="font-weight:600">${e.type==='werkhof'?'🏠 ':''}${e.name}</td><td>${e.addr||'—'}</td><td>${e.dept||'—'}</td><td>${e.auditor||'—'}</td><td style="color:var(--tx3);font-style:italic">${e.note||''}</td></tr>`).join('');document.getElementById('pv').style.display='block';}
function closePrint(){document.getElementById('pv').style.display='none';}
// ═══ MODAL ═══
function openAudAdmin(){
  renderAudAdminList();
  document.getElementById('aud-admin-bg').style.display='flex';
}
function addAudAdmin(){
  const v=document.getElementById('new-aud-admin').value.trim();
  if(!v||auditors.includes(v)){showToast('Name bereits vorhanden oder leer');return;}
  auditors.push(v);
  document.getElementById('new-aud-admin').value='';
  buildAudSels();renderAudTags();renderAuditors();saveNow();
  renderAudAdminList();
  showToast('✓ Auditor hinzugefügt');
}
// Auditor umbenennen: ALLE Verweise mitziehen (Planungen, Audits, Beratungen, Personen-Audits,
// Ferien, Wunschferien, Ghost-Audits, Log, Farben, Kürzel, Metadaten). Der alte Name wird als
// Login-Alias gespeichert, damit der Supabase-Login (Anzeigename) weiterhin zugeordnet wird.
function doRenameAuditor(oldName,newName){
  newName=(newName||'').trim();
  if(!newName||newName===oldName)return false;
  if(auditors.includes(newName)){showToast('Name bereits vorhanden',2500);return false;}
  let n=0;
  const fix=o=>{
    if(!o||typeof o!=='object')return;
    if(Array.isArray(o)){o.forEach(fix);return;}
    for(const k of Object.keys(o)){
      const v=o[k];
      if(typeof v==='string'&&v===oldName&&(/auditor/i.test(k)||k==='who'||k==='by')){o[k]=newName;n++;}
      else if(v&&typeof v==='object')fix(v);
    }
  };
  [data,plans,beratPlan,personAudits,ferien,ferienWunsch,window._ghostAudits||[],tlog].forEach(fix);
  auditors=auditors.map(a=>a===oldName?newName:a);
  const meta=auditorMeta[oldName]||{};
  meta.loginAliases=[...new Set([...(meta.loginAliases||[]),oldName])];
  delete auditorMeta[oldName];auditorMeta[newName]=meta;
  if(auditorColors[oldName]){auditorColors[newName]=auditorColors[oldName];delete auditorColors[oldName];try{localStorage.setItem('auditorColors',JSON.stringify(auditorColors));}catch(e){}}
  if(AUD_CODES[oldName]){AUD_CODES[newName]=AUD_CODES[oldName];delete AUD_CODES[oldName];saveAudCodes();}
  if(currentUser===oldName){currentUser=newName;try{localStorage.setItem(USER_KEY,newName);}catch(e){}}
  saveAudMeta();
  buildAudSels();renderAudTags();renderAuditors();renderAll();saveNow();
  renderAudAdminList();
  showToast(`✓ Umbenannt: ${oldName} → ${newName} (${n} Einträge angepasst)`,3500);
  return true;
}
function removeAudAdmin(name){
  undoPoint('Auditor «'+name+'» gelöscht (Audits bleiben erhalten)',()=>{renderAudTags();renderAuditors();renderAudAdminList();});
  auditors=auditors.filter(a=>a!==name);
  buildAudSels();renderAudTags();renderAuditors();saveNow();
  renderAudAdminList();
  showToast('🗑 Auditor gelöscht');
}
function saveAudMeta2(name){
  const meta=auditorMeta[name]||{};
  meta.title=document.getElementById('am-title-'+name.replace(/ /g,'_'))?.value||'';
  meta.soll=+document.getElementById('am-soll-'+name.replace(/ /g,'_'))?.value||0;
  meta.qms=+document.getElementById('am-qms-'+name.replace(/ /g,'_'))?.value||0;
  meta.ums=+document.getElementById('am-ums-'+name.replace(/ /g,'_'))?.value||0;
  meta.ams=+document.getElementById('am-ams-'+name.replace(/ /g,'_'))?.value||0;
  const visEl=document.getElementById('am-vis-'+name.replace(/ /g,'_'));
  meta.hidden=visEl?!visEl.checked:false;
  const roleEl=document.getElementById('am-role-'+name.replace(/ /g,'_'));
  const role=roleEl?roleEl.value:'normal';
  meta.secondaryAdmin=role==='secondary';
  delete meta.fullAdmin; // Voll-Admin wird nur noch in der Datenbank vergeben
  const code=document.getElementById('am-code-'+name.replace(/ /g,'_'))?.value||'';
  if(code){AUD_CODES[name]=code.toUpperCase().slice(0,4);saveAudCodes();}
  const col=document.getElementById('am-col-'+name.replace(/ /g,'_'))?.value||'';
  if(col){auditorColors[name]=col;localStorage.setItem('auditorColors',JSON.stringify(auditorColors));}
  // Tourguide: Startadresse + Abteilungs-Präferenzen
  const id_=name.replace(/ /g,'_');
  const homeV=(document.getElementById('am-home-'+id_)?.value||'').trim();
  if(homeV!==(meta.home||'')){meta.home=homeV;meta.homeLat=null;meta.homeLng=null;if(homeV)tgGeocodeHome(name,homeV);}
  const chips=[...document.querySelectorAll('#am-depts-'+id_+' span[data-d]')];
  if(chips.length){meta.prefDepts=chips.filter(x=>x.dataset.st==='pref').map(x=>x.dataset.d);meta.exclDepts=chips.filter(x=>x.dataset.st==='excl').map(x=>x.dataset.d);}
  auditorMeta[name]=meta;
  saveAudMeta();
  const newName=(document.getElementById('am-name-'+name.replace(/ /g,'_'))?.value||'').trim();
  if(newName&&newName!==name){doRenameAuditor(name,newName);return;}
  renderAuditors();
  showToast('✓ Gespeichert',1500);
}
function renderAudAdminList(){
  const el=document.getElementById('aud-admin-list');if(!el)return;
  el.innerHTML=auditors.map(a=>{
    const meta=auditorMeta[a]||{};
    const col=aC(a);
    const code=AUD_CODES[a]||a.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    const id=a.replace(/ /g,'_');
    return`<div style="border:1px solid var(--bd);border-radius:10px;padding:14px;margin-bottom:10px;background:var(--sf2)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:32px;height:32px;border-radius:50%;background:${col};display:flex;align-items:center;justify-content:center;font-size:${code.length>3?9:12}px;font-weight:700;color:#fff">${code}</div>
          <span style="font-size:13px;font-weight:600;color:var(--tx)">${a}</span>
        </div>
        <button onclick="removeAudAdmin('${a}')" style="background:none;border:none;cursor:pointer;color:#EF4444;font-size:13px">🗑</button>
      </div>
      <div style="display:grid;grid-template-columns:1.4fr 1.2fr .6fr .6fr;gap:8px;margin-bottom:8px">
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">Name</label>
          <input id="am-name-${id}" value="${a.replace(/"/g,'&quot;')}" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:11px;font-weight:600"></div>
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">Stellenbezeichnung</label>
          <input id="am-title-${id}" value="${meta.title||''}" placeholder="z.B. Leitender Auditor" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:11px"></div>
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">Kürzel</label>
          <input id="am-code-${id}" value="${code}" maxlength="4" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:11px;text-transform:uppercase"></div>
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">Farbe</label>
          <input id="am-col-${id}" type="color" value="${col}" style="width:100%;height:30px;border:1px solid var(--bd);border-radius:5px;padding:2px;cursor:pointer;background:var(--sf)"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-bottom:10px">
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">Soll-Audits/Jahr</label>
          <input id="am-soll-${id}" type="number" value="${meta.soll||''}" placeholder="120" min="0" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:11px"></div>
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">QMS %</label>
          <input id="am-qms-${id}" type="number" value="${meta.qms||''}" placeholder="40" min="0" max="100" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:11px"></div>
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">UMS %</label>
          <input id="am-ums-${id}" type="number" value="${meta.ums||''}" placeholder="40" min="0" max="100" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:11px"></div>
        <div><label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">AMS %</label>
          <input id="am-ams-${id}" type="number" value="${meta.ams||''}" placeholder="20" min="0" max="100" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:11px"></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:8px">
        <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--tx);cursor:pointer">
          <input type="checkbox" id="am-vis-${id}" ${(auditorMeta[a]||{}).hidden?'':'checked'} style="width:14px;height:14px;cursor:pointer">
          Karte im Auditoren-Tab anzeigen
        </label>
        <div>
          <label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:4px">Berechtigungsstufe</label>
          <select id="am-role-${id}" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px">
            <option value="normal" ${!(auditorMeta[a]||{}).secondaryAdmin?'selected':''}>⚪ Normal</option>
            <option value="secondary" ${(auditorMeta[a]||{}).secondaryAdmin?'selected':''}>🔵 Sekundär-Admin (Statistiken)</option>
          </select>
          <div style="font-size:10px;color:var(--tx3);margin-top:3px">🔴 Voll-Admin wird in der Datenbank vergeben: Admin → Anleitung & SQL → Abschnitt 7</div>
        </div>
      </div>
      <div style="border-top:1px solid var(--bd);padding-top:10px;margin-bottom:10px">
        <div style="font-size:11px;font-weight:700;color:var(--tx);margin-bottom:6px"><i class="ti ti-compass" style="color:var(--blue)"></i> Tourguide</div>
        <label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:2px">Startadresse (Rundtour ab/bis hier)</label>
        <input id="am-home-${id}" value="${escH(meta.home||'')}" placeholder="Strasse Nr, PLZ Ort" style="width:100%;padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px;margin-bottom:8px">
        <label style="font-size:10px;color:var(--tx2);display:block;margin-bottom:4px">Abteilungen – antippen zum Wechseln: neutral → <b style="color:#10B981">★ bevorzugt</b> → <b style="color:#EF4444">⛔ ausgeschlossen</b></label>
        <div id="am-depts-${id}" style="display:flex;flex-wrap:wrap;gap:4px">${getAllDepts().map(d=>{const st=(meta.prefDepts||[]).includes(d)?'pref':(meta.exclDepts||[]).includes(d)?'excl':'';return`<span data-d="${escH(d)}" data-st="${st}" onclick="tgCycleDept(this)" style="${tgChipStyle(st)}">${tgChipLbl(st)}${escH(d)}</span>`;}).join('')}</div>
      </div>
      <button onclick="saveAudMeta2('${a}')" style="width:100%;padding:7px;border-radius:var(--rs);border:none;background:var(--blue);color:#fff;cursor:pointer;font-size:12px;font-weight:600">✓ Speichern</button>
    </div>`;
  }).join('');
}

function openAdd(){editId=null;window._pendingLat=null;window._pendingLng=null;{const z=document.getElementById('f-zb');if(z)z.value='';}{const la=document.getElementById('f-lat'),ln=document.getElementById('f-lng');if(la)la.value='';if(ln)ln.value='';}document.getElementById('m-title').textContent='Neue Baustelle';document.getElementById('form-s').style.display='block';(document.getElementById('imp-s')||{style:{},classList:{remove(){}}}).style.display='none';(document.getElementById('json-s')||{style:{},classList:{remove(){}}}).style.display='none';document.getElementById('m-save').style.display='';['f-name','f-addr','f-psp','f-sap','f-prv','f-bc','f-note'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});fillFDept('');setDefaultRhythm('baustelle');document.getElementById('f-last').value='';document.getElementById('f-type').value='baustelle';document.getElementById('addr-suggestions').style.display='none';const hint=document.getElementById('f-addr-hint');if(hint)hint.textContent='';document.getElementById('mbg').classList.add('open');}
function openEdit(id){
  // Reset manual marker
  const latEl=document.getElementById('f-lat');
  const lngEl=document.getElementById('f-lng');
  if(latEl)latEl.value='';
  if(lngEl)lngEl.value='';
  document.getElementById('f-addr-hint').textContent='';
  const e=data.find(x=>x.id===id);if(!e)return;
  editId=id;window._pendingLat=null;window._pendingLng=null;
  document.getElementById('m-title').textContent='Bearbeiten';
  document.getElementById('form-s').style.display='block';
  (document.getElementById('imp-s')||{style:{},classList:{remove(){}}}).style.display='none';
  (document.getElementById('json-s')||{style:{},classList:{remove(){}}}).style.display='none';
  document.getElementById('m-save').style.display='';
  document.getElementById('f-name').value=e.name||'';
  document.getElementById('f-addr').value=e.addr||'';
  document.getElementById('f-psp').value=e.psp||'';
  const fsap=document.getElementById('f-sap');if(fsap)fsap.value=e.sap||'';
  document.getElementById('f-prv').value=e.prv||'';
  document.getElementById('f-bc').value=e.bc||'';
  fillFDept(e.dept||'');
  document.getElementById('f-rh').value=e.rhythm||28;
  document.getElementById('f-zb').value=e.zeitbedarf||'';
  document.getElementById('f-last').value=e.lastAudit||'';
  document.getElementById('f-note').value=e.note||'';
  document.getElementById('f-type').value=e.type||'baustelle';
  const sug=document.getElementById('addr-suggestions');if(sug)sug.style.display='none';
  const hint=document.getElementById('f-addr-hint');if(hint)hint.textContent='';
  document.getElementById('mbg').classList.add('open');
}
function closeModal(){document.getElementById('mbg').classList.remove('open');editId=null;}
async function saveEntry(){
  const name=document.getElementById('f-name').value.trim(),addr=document.getElementById('f-addr').value.trim();
  const manLat=parseFloat(document.getElementById('f-lat')?.value||0);
  const manLng=parseFloat(document.getElementById('f-lng')?.value||0);
  if(!name||(!addr&&!manLat)){showToast('Name und Adresse (oder Marker-Position) erforderlich');return;}
  const btn=document.getElementById('m-save');btn.textContent='…';btn.disabled=true;
  const dept=document.getElementById('f-dept').value,type=document.getElementById('f-type').value;
  let lat=null,lng=null;
  // Manual marker coords have highest priority
  if(manLat&&manLng){
    lat=manLat;lng=manLng;
  } else if(window._pendingLat&&window._pendingLng){
    lat=window._pendingLat;lng=window._pendingLng;
    window._pendingLat=null;window._pendingLng=null;
  } else {
    // Try PLZ-based fast geocode first
    const gFast=geocode(addr,dept);if(gFast){lat=gFast.lat;lng=gFast.lng;}
    // Then try Swisstopo for precision
    try{const gPrecise=await nominatimGeocode(addr);if(gPrecise){lat=gPrecise.lat;lng=gPrecise.lng;}}catch(ex){}
  }
  btn.textContent='Speichern';btn.disabled=false;
  let rh=+document.getElementById('f-rh').value;if(type==='werkhof'&&rh===S('rh_baustelle'))rh=S('rh_werkhof');
  const _zb=+document.getElementById('f-zb').value||0;
  const entry={id:editId||Date.now(),name,addr,zeitbedarf:_zb>0?_zb:undefined,psp:document.getElementById('f-psp').value.trim(),sap:name,prv:document.getElementById('f-prv').value.trim(),bc:document.getElementById('f-bc').value.trim(),dept,rhythm:rh,type,lastAudit:document.getElementById('f-last').value||null,lastKW:null,note:document.getElementById('f-note').value.trim(),auditor:editId?data.find(e=>e.id===editId)?.auditor:null,active:true,paused:false,auditHistory:[],plannedKW:[],lat,lng};
  if(editId){const old=data.find(e=>e.id===editId);if(old){entry.active=old.active!==false;entry.lastKW=old.lastKW??null;entry.auditor=old.auditor;entry.paused=old.paused;entry.pauseReason=old.pauseReason;entry.auditHistory=old.auditHistory||[];entry.plannedKW=old.plannedKW||[];}data[data.findIndex(e=>e.id===editId)]={...old,...entry};}
  else{entry.createdAt=today();data.push(entry);}
  log(editId?'Bearbeitet':'Hinzugefügt',name,editId?'#F59E0B':'#3B82F6','');
  closeModal();renderAll();buildCalBS();buildDF();if(entry.lat)selEntry(entry.id);saveNow();
}
// ═══ ONBOARDING GUIDE ═══
const GUIDE_KEY='anliker_guide_seen';
let _guideStep=0;
const GUIDE_STEPS=[
  {icon:'👋',title:'Willkommen beim Audit Planer!',text:'<p style="font-size:14px;color:var(--tx2);line-height:1.8;margin-bottom:20px">Der <strong>Anliker Audit Planer</strong> hilft dem Audit-Team, Baustellenaudits und Personen-Audits zu planen, erfassen und überwachen – für alle Auditoren gemeinsam und in Echtzeit.</p><div style="padding:12px 16px;background:#EFF6FF;border-radius:10px;font-size:13px;color:#1D4ED8;line-height:1.6">💡 Diese Anleitung ist jederzeit über den <strong>❓</strong> Button oben rechts abrufbar.</div>'},
  {icon:'🏗️',title:'Neue Baustelle erfassen',menuHint:'Button: + Neu',text:'<div style="display:flex;flex-direction:column;gap:14px"><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:10px">So findest du den Button:</div><div style="background:#1A1D2E;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:6px"><span style="padding:5px 10px;background:#10B981;border-radius:6px;font-size:12px;font-weight:600;color:#fff">✦ Neu</span><span style="color:rgba(255,255,255,.4);font-size:12px">← oben im Header</span></div></div><div style="padding:14px;background:#FEF3C7;border-radius:10px;border-left:3px solid #F59E0B"><div style="font-weight:700;font-size:13px;margin-bottom:8px;color:#92400E">⚠️ Wichtig: Korrekte Adresse</div><div style="font-size:12px;color:#92400E;line-height:1.7">Die Adresse wird für Kartenpositionierung und Google Maps verwendet.<br><br><span style="background:#fff;border-radius:4px;padding:2px 6px">✓ Richtig:</span> <strong>«Bahnhofstrasse 12, 6000 Luzern»</strong><br><span style="background:#fff;border-radius:4px;padding:2px 6px">✗ Falsch:</span> «Bahnhofstrasse» oder «12-14»<br><br>Falls keine genaue Adresse bekannt: <strong>nächste Nachbaradresse</strong> verwenden.</div></div><div style="padding:10px 14px;background:var(--sf2);border-radius:8px;font-size:12px;color:var(--tx2)">💡 PSP, PrV und BC sind wichtig für Suche und Übersicht.</div></div>'},
  {icon:'🗺️',title:'Karte – Ampelsystem & Zeichen',menuHint:'Reiter: Karte',text:(function(){var r=[['#EF4444','🔴 Überfällig','&gt;10 Tage über dem Rhythmus'],['#F97316','🟠 Fällig','0–10 Tage über dem Rhythmus'],['#EAB308','🟡 Bald fällig','≤10 Tage bis zur Fälligkeit'],['#10B981','🟢 OK','&gt;10 Tage bis zur Fälligkeit'],['#6366F1','🔵 Geplant','Audit-Termin vorhanden'],['#8B5CF6','🟣 Beratung','Beratungstermin geplant'],['#7C3AED','★ Neu','Noch nie auditiert'],['#94A3B8','⏸ Pausiert','Rhythmus unterbrochen'],['#6B7280','◼ Inaktiv','Baustelle abgeschlossen'],['#EA580C','🏠 Werkhof','Werkhof-Standort'],['#7C3AED','◆ GU','Generalunternehmung']];return '<p style="font-size:12px;color:var(--tx2);margin-bottom:8px">Jede Baustelle hat einen <strong>Audit-Rhythmus</strong> (Standard: 4 Wochen):</p><div style="display:flex;flex-direction:column;gap:4px">'+r.map(function(x){return '<div style="display:flex;align-items:center;gap:10px;padding:5px 8px;background:var(--sf2);border-radius:6px"><div style="width:12px;height:12px;border-radius:50%;background:'+x[0]+';flex-shrink:0"></div><div style="font-weight:600;font-size:11px;min-width:100px">'+x[1]+'</div><div style="font-size:11px;color:var(--tx2)">'+x[2]+'</div></div>';}).join('')+'</div>';})()},
  {icon:'🔍',title:'Filter & Suche',menuHint:'Filter oben links',text:'<div style="display:flex;flex-direction:column;gap:12px"><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:8px">📂 Abteilungs-Filter</div><div style="font-size:13px;color:var(--tx2);line-height:1.6">Dropdown direkt unter dem Header (oben links) → Abteilung wählen → Karte und Liste zeigen nur diese Abteilung. Kombinierbar mit Statusfilter.</div></div><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:8px">🚦 Status-Filter</div><div style="font-size:13px;color:var(--tx2);line-height:1.6">Zweites Dropdown oben links → Überfällig / Fällig / OK etc. → kombinierbar mit Abteilungs-Filter.</div></div><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:6px">🔎 Suche</div><div style="font-size:13px;color:var(--tx2)">Suchfeld oben links – sucht in Name, Adresse, PSP, PrV, BC. Bei aktiver Suche auch pausierte und inaktive Baustellen sichtbar.</div></div></div>'},
  {icon:'📋',title:'Detail-Panel – Buttons erklärt',menuHint:'Klick auf Baustelle',text:(function(){var b=[['#10B981','✓ Auditiert','Audit als erledigt erfassen'],['#8B5CF6','💬 Beratung','Beratungstermin erfassen oder planen'],['#6366F1','📅 Planen','Audit-Termin planen (KW oder Datum)'],['#6B7280','📝 Notiz','Interne Notiz zur Baustelle'],['#3B82F6','✏️ Bearbeiten','Baustellen-Daten bearbeiten'],['#94A3B8','⏸ Pausieren','Baustelle pausieren (optional bis KW)'],['#6B7280','Inaktiv','Als abgeschlossen markieren']];return '<p style="font-size:12px;color:var(--tx2);margin-bottom:8px">Baustelle anklicken → Detail-Panel öffnet sich rechts:</p><div style="display:flex;flex-direction:column;gap:6px">'+b.map(function(x){return '<div style="display:flex;align-items:center;gap:10px;padding:7px 10px;background:var(--sf2);border-radius:8px"><span style="padding:3px 8px;background:'+x[0]+';color:#fff;border-radius:5px;font-size:11px;font-weight:600;white-space:nowrap">'+x[1]+'</span><span style="font-size:12px;color:var(--tx2)">'+x[2]+'</span></div>';}).join('')+'</div><div style="padding:8px 12px;background:#FEF3C7;border-radius:8px;font-size:11px;color:#92400E;margin-top:6px">⚠️ Löschen ist nur im Admin-Modus sichtbar.</div>';})()},
  {icon:'📅',title:'KW-Planung',menuHint:'Reiter: KW-Planung',text:'<div style="display:flex;flex-direction:column;gap:12px"><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:6px">📋 Wochenübersicht</div><div style="font-size:13px;color:var(--tx2);line-height:1.6">Mo–Fr mit allen geplanten Audits. <span style="background:#F0FDF4;color:#065F46;padding:1px 5px;border-radius:3px;font-size:11px">✓ Grün = erledigt</span> Auditor-Badge in seiner Farbe = geplant. BC des Baustellenleiters wird angezeigt.</div></div><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:6px">↔️ Termine verschieben</div><div style="font-size:13px;color:var(--tx2)">Auf geplanten Eintrag klicken → Tages-Buttons Mo/Di/Mi/Do/Fr → Termin verschiebt. ← → für andere Woche.</div></div><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:6px">📧 Outlook & 🖨️ Drucken</div><div style="font-size:13px;color:var(--tx2)">Buttons neben «Heute» → Auditor + KW wählen → .ics Export für Outlook (07:00–17:00) oder PDF-Druck.</div></div></div>'},
  {icon:'🧑',title:'Personen-Audits',menuHint:'Reiter: Personen-Audits',text:'<div style="display:flex;flex-direction:column;gap:12px"><div style="padding:10px 14px;background:#FEF3C7;border-radius:8px;border-left:3px solid #F59E0B;font-size:12px;color:#92400E"><strong>📌 Wichtig:</strong> Import aller Mitarbeitenden per <strong>Juli 2026</strong>. Neue ab diesem Datum müssen <strong>manuell erfasst</strong> werden: Register-Tab → «+ Hinzufügen».</div><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:8px">✅ Personen-Audit erfassen</div><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:12px;color:var(--tx2);margin-bottom:6px"><span style="padding:3px 8px;background:var(--sf);border:1px solid var(--bd);border-radius:4px">Person suchen</span><span>→</span><span style="padding:3px 8px;background:var(--sf);border:1px solid var(--bd);border-radius:4px">Datum + Auditor</span><span>→</span><span style="padding:3px 8px;background:#7C3AED;color:#fff;border-radius:4px">Erfassen</span></div><div style="font-size:11px;color:var(--tx3)">Suche nach Name oder Personalnummer. Optional: PSP, Baustelle, Notiz.</div></div><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:6px">👥 Register & 📊 Jahresmatrix</div><div style="font-size:13px;color:var(--tx2);line-height:1.6"><strong>Register:</strong> Alle Personen – Spezialität (Bodenbeläge / Brandschutz / Asbest) direkt editierbar.<br><strong>Jahresmatrix:</strong> KW1–52 pro Person, filterbar nach Firma, Abteilung, Spezialität, Ort.</div></div></div>'},
  {icon:'📊',title:'Jahresübersicht',menuHint:'Reiter: Übersicht',text:'<div style="display:flex;flex-direction:column;gap:12px"><div style="padding:14px;background:var(--sf2);border-radius:10px"><div style="font-weight:700;font-size:13px;margin-bottom:6px">📊 Tabellarische Jahresübersicht</div><div style="font-size:13px;color:var(--tx2);line-height:1.6">Alle Baustellen mit KW1–52 Spalten – wann welcher Auditor auditiert hat. Filterbar nach Jahr und Abteilung.</div></div><div style="padding:10px 14px;background:var(--sf2);border-radius:8px;font-size:12px;color:var(--tx2)"><strong>Admin:</strong> «Excel Export» erstellt Jahresbericht als Excel (Jahresübersicht + Baustellen-Liste).</div><div style="padding:10px 14px;background:#EFF6FF;border-radius:8px;font-size:12px;color:#1D4ED8">💡 Dient als Archiv und Nachweis – ideal für Jahresberichte und Controlling.</div></div>'}
];

function openGuide(force=false){
  _guideStep=0;
  renderGuideStep();
  document.getElementById('guide-bg').style.display='flex';
}
function closeGuide(){
  document.getElementById('guide-bg').style.display='none';
  localStorage.setItem(GUIDE_KEY,'1');
}
function guideStep(dir){
  _guideStep=Math.max(0,Math.min(GUIDE_STEPS.length-1,_guideStep+dir));
  renderGuideStep();
}
function renderGuideStep(){
  const s=GUIDE_STEPS[_guideStep];
  const total=GUIDE_STEPS.length;
  document.getElementById('guide-step-lbl').textContent=`Schritt ${_guideStep+1} von ${total}`;
  document.getElementById('guide-progress').style.width=`${(_guideStep+1)/total*100}%`;
  document.getElementById('guide-content').innerHTML=
    '<div style="text-align:center;font-size:36px;margin-bottom:8px">'+s.icon+'</div>'+
    (s.menuHint?'<div style="text-align:center;margin-bottom:10px"><span style="padding:3px 12px;background:var(--blue);color:#fff;border-radius:20px;font-size:11px;font-weight:600">'+s.menuHint+'</span></div>':'')+
    '<h3 style="font-size:16px;font-weight:700;color:var(--tx);text-align:center;margin-bottom:16px">'+s.title+'</h3>'+
    s.text;
  document.getElementById('guide-dots').innerHTML=GUIDE_STEPS.map((_,i)=>
    `<div style="width:8px;height:8px;border-radius:50%;background:${i===_guideStep?'var(--blue)':'var(--bd)'}"></div>`).join('');
  document.getElementById('guide-back').style.visibility=_guideStep===0?'hidden':'visible';
  const nextBtn=document.getElementById('guide-next');
  if(_guideStep===total-1){nextBtn.textContent='✓ Fertig';nextBtn.onclick=closeGuide;}
  else{nextBtn.textContent='Weiter →';nextBtn.onclick=()=>guideStep(1);}
}

// ═══ MOBILE VIEW ═══
let _mobDate=today();
let _mobMap=null;
let _mobSelId=null;

let _beratPopId=null;
function openBeratPlanPop(id){
  const p=beratPlan.find(x=>x.id===id);if(!p)return;
  _beratPopId=id;
  const e=data.find(x=>x.id===p.bsId);
  document.getElementById('berat-pop-info').textContent=(e?e.name:'')+(p.auditor?' · '+p.auditor:'')+' · '+fd(p.date);
  document.getElementById('berat-pop-note').value=p.note||'';
  document.getElementById('berat-pop-bg').style.display='flex';
}
function saveBeratPlanNote(){
  const p=beratPlan.find(x=>x.id===_beratPopId);if(!p)return;
  p.note=document.getElementById('berat-pop-note').value.trim();
  saveNow();renderKW();
  document.getElementById('berat-pop-bg').style.display='none';
  showToast('✓ Notiz gespeichert',1500);
}
function deleteBeratPlanPop(){
  undoPoint('Beratungs-Planung gelöscht',()=>renderKW());
  beratPlan=beratPlan.filter(x=>x.id!==_beratPopId);
  saveNow();renderKW();
  document.getElementById('berat-pop-bg').style.display='none';
  showToast('🗑 Gelöscht',1500);
}
function confirmBeratPlanDone(){
  const p=beratPlan.find(x=>x.id===_beratPopId);if(!p)return;
  const e=data.find(x=>x.id===p.bsId);if(!e)return;
  const note=document.getElementById('berat-pop-note').value.trim()||p.note||'';
  // Add to beratungen
  if(!e.beratungen)e.beratungen=[];
  e.beratungen.push({id:Date.now()+Math.random(),date:p.date,kw:p.kw||dateToKW(p.date),auditor:p.auditor,note});
  // Remove from beratPlan
  beratPlan=beratPlan.filter(x=>x.id!==_beratPopId);
  log('Beratung ✓',e.name,'#8B5CF6',p.auditor);
  saveNow();renderKW();renderAuditors();
  document.getElementById('berat-pop-bg').style.display='none';
  showToast('💬 Beratung erfasst – '+e.name,2500);
}
let _beratDoneUndoBsId=null, _beratDoneUndoId=null;
function openBeratDoneUndo(bsId,beratId){
  const e=data.find(x=>x.id===bsId);if(!e)return;
  const b=(e.beratungen||[]).find(x=>x.id===beratId);if(!b)return;
  _beratDoneUndoBsId=bsId;_beratDoneUndoId=beratId;
  document.getElementById('berat-done-undo-info').textContent=
    e.name+' · Beratung am '+fd(b.date)+(b.auditor?' von '+b.auditor:'')+(b.note?' · '+b.note:'');
  document.getElementById('berat-done-undo-bg').style.display='flex';
}
function undoBeratDone(){
  const e=data.find(x=>x.id===_beratDoneUndoBsId);if(!e)return;
  const b=(e.beratungen||[]).find(x=>x.id===_beratDoneUndoId);if(!b)return;
  // Move back to beratPlan
  beratPlan.push({id:Date.now()+Math.random(),bsId:_beratDoneUndoBsId,date:b.date,kw:b.kw,auditor:b.auditor,note:b.note});
  e.beratungen=e.beratungen.filter(x=>x.id!==_beratDoneUndoId);
  saveNow();renderKW();renderAll();
  document.getElementById('berat-done-undo-bg').style.display='none';
  showToast('↩ Beratung wieder geplant',2000);
}
function moveBeratPlan(id,ks,dayOffset){
  const p=beratPlan.find(x=>x.id===id);if(!p)return;
  const d=parseDate(ks);d.setDate(d.getDate()+dayOffset);
  p.date=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  p.kw=dateToKW(p.date);
  saveNow();renderKW();
  showToast('💬 Beratung verschoben auf '+fd(p.date),2000);
}
let _adjMap=null,_adjMarker=null,_adjLat=null,_adjLng=null;

let _distResult=null;

function openDistribute(){
  // Populate auditor dropdown
  const audSel=document.getElementById('dist-aud');
  const isAdmin=document.body.classList.contains('admin-mode');
  if(isAdmin){
    audSel.innerHTML=auditors.map(a=>`<option value="${a}"${a===currentUser?' selected':''}>${a}</option>`).join('');
  } else {
    audSel.innerHTML=`<option value="${currentUser}">${currentUser}</option>`;
  }
  // Populate KW dropdown
  const kwSel=document.getElementById('dist-kw');
  const curKW=dateToKW(today());
  kwSel.innerHTML=Array.from({length:20},(_,i)=>{
    const kw=curKW+i-1;
    if(kw<1||kw>52)return'';
    return`<option value="${kw}"${kw===curKW?' selected':''}>KW ${kw}</option>`;
  }).filter(Boolean).join('');
  // Reset
  _distResult=null;
  document.getElementById('dist-preview').style.display='none';
  document.getElementById('dist-confirm-btn').style.display='none';
  document.getElementById('dist-info').textContent='Auditor und KW wählen um Vorschau zu sehen...';
  document.getElementById('dist-bg').style.display='flex';
  updateDistInfo();
  kwSel.onchange=updateDistInfo;
  audSel.onchange=updateDistInfo;
  const amEl=document.getElementById('dist-auditmin');if(amEl)amEl.onchange=updateDistInfo;
}

function distDayDate(kw,di){return rpAddDays(kwToDate(kw),di);}
// Fixe Zeit pro Tag (min): Rapporte mit Dauer, geplante Personen-Audits/Beratungen mit Audit-Dauer
function distFixedMin(aud,ds,auditMin){
  const rp=rapporte.filter(r=>r.date===ds&&r.auditor===aud).reduce((s,r)=>s+(r.dur||60),0);
  const pa=personAudits.filter(p=>p.planned&&p.date===ds&&p.auditor===aud).length*auditMin;
  const bp=beratPlan.filter(p=>p.date===ds&&p.auditor===aud).length*auditMin;
  return rp+pa+bp;
}
function distIsFerien(aud,ds){return ferien.some(f=>f.auditor===aud&&f.von<=ds&&f.bis>=ds);}
function updateDistInfo(){
  const aud=document.getElementById('dist-aud').value;
  const kw=+document.getElementById('dist-kw').value;
  const amEl=document.getElementById('dist-auditmin');
  if(amEl&&!amEl.value)amEl.value=localStorage.getItem('dist_audit_min_v3')||String(S('dist_audit_min'));
  const ks=kwToDate(kw),ke=kwToDate(kw+1);
  const kwPlans=plans.filter(p=>p.date>=ks&&p.date<ke&&p.auditor===aud);
  const withCoords=kwPlans.filter(p=>{const e=data.find(x=>x.id===p.bsId);return e&&e.lat&&e.lng;});
  // Ferientage automatisch abwählen und markieren
  const names=['Mo','Di','Mi','Do','Fr'];const notes=[];
  document.querySelectorAll('#dist-days input').forEach(cb=>{
    const di=+cb.value,ds=distDayDate(kw,di);
    const fer=distIsFerien(aud,ds);
    if(fer){cb.checked=false;cb.disabled=true;}else cb.disabled=false;
    cb.parentElement.style.opacity=fer?'.45':'1';
    const sp=cb.parentElement.querySelector('.dd-lbl');if(sp)sp.textContent=names[di]+(fer?' 🌴 Ferien':'');
    const fx=distFixedMin(aud,ds,+amEl.value||S('dist_audit_min'));
    if(!fer&&fx)notes.push(`${names[di]}: ${Math.round(fx)} min belegt`);
  });
  document.getElementById('dist-info').innerHTML=
    `${kwPlans.length} Baustellen in KW ${kw} für ${aud} – ${withCoords.length} mit Koordinaten`+
    (notes.length?`<div style="margin-top:4px;font-size:11px;color:var(--tx3)">Bereits geplant: ${notes.join(' · ')}</div>`:'');
  document.getElementById('dist-preview').style.display='none';
  document.getElementById('dist-confirm-btn').style.display='none';
}
function getCheckedDays(){
  return Array.from(document.getElementById('dist-days').querySelectorAll('input:checked'))
    .map(cb=>+cb.value).sort();
}

// Schnelle Tour-Schätzung (Nearest-Neighbour + 2-Opt) für die Suche; exakte Reihenfolge danach per solveRoute
function distTourSec(D,set){
  if(!set.length)return 0;
  let rem=set.slice(),seq=[],cur=0;
  while(rem.length){let bi=0;rem.forEach((j,i)=>{if(D[cur][j]<D[cur][rem[bi]])bi=i;});cur=rem.splice(bi,1)[0];seq.push(cur);}
  const cost=s=>{let c=0,p=0;s.forEach(j=>{c+=D[p][j];p=j;});return c+D[p][0];};
  let best=cost(seq),imp=true;
  while(imp){imp=false;for(let i=0;i<seq.length-1;i++)for(let k=i+1;k<seq.length;k++){const cand=seq.slice(0,i).concat(seq.slice(i,k+1).reverse(),seq.slice(k+1));const cc=cost(cand);if(cc<best-1){seq=cand;best=cc;imp=true;}}}
  return best;
}
async function previewDistribute(){
  const aud=document.getElementById('dist-aud').value;
  const kw=+document.getElementById('dist-kw').value;
  const days=getCheckedDays();
  const auditMin=Math.max(5,+document.getElementById('dist-auditmin').value||S('dist_audit_min'));
  try{localStorage.setItem('dist_audit_min_v3',String(auditMin));}catch(e){}
  if(!days.length){showToast('Bitte mindestens einen Tag wählen');return;}
  const ks=kwToDate(kw),ke=kwToDate(kw+1);
  const kwPlans=plans.filter(p=>p.date>=ks&&p.date<ke&&p.auditor===aud);
  if(!kwPlans.length){showToast('Keine Planungen für diese KW und Auditor');return;}
  const entries=kwPlans.map(p=>({plan:p,e:data.find(x=>x.id===p.bsId)})).filter(x=>x.e);
  const withCoords=entries.filter(x=>x.e.lat&&x.e.lng);
  const withoutCoords=entries.filter(x=>!x.e.lat||!x.e.lng);
  const info=document.getElementById('dist-info');const oldInfo=info.innerHTML;
  info.innerHTML='⏳ Berechne Fahrzeiten und beste Verteilung…';
  await new Promise(r=>setTimeout(r,30));
  const home=(await getHomeCoords())||(withCoords.length?{lat:withCoords.reduce((s,x)=>s+x.e.lat,0)/withCoords.length,lng:withCoords.reduce((s,x)=>s+x.e.lng,0)/withCoords.length}:{lat:47,lng:8});
  const pts=[home,...withCoords.map(x=>({lat:x.e.lat,lng:x.e.lng}))];
  const{D,src}=await getDurationMatrix(pts);
  const k=days.length,N=withCoords.length;
  const fixed=days.map(di=>distFixedMin(aud,distDayDate(kw,di),auditMin));
  // Zielanzahl pro Tag: gleichmässig; bei ungleich belegten Tagen anteilig nach freier Zeit (±1)
  const DAYMIN=S('dist_day_hours')*60;
  const free=fixed.map(f=>Math.max(60,DAYMIN-f));
  const hasFixed=fixed.some(f=>f>0);
  let target=hasFixed?free.map(f=>N*f/free.reduce((a,b)=>a+b,0)):days.map(()=>N/k);
  let base=target.map(t=>Math.floor(t));let rest=N-base.reduce((a,b)=>a+b,0);
  target.map((t,i)=>[t-Math.floor(t),i]).sort((a,b)=>b[0]-a[0]).slice(0,rest).forEach(([,i])=>base[i]++);
  const lo=base.map(b=>hasFixed?Math.max(0,b-1):Math.floor(N/k)),hi=base.map(b=>hasFixed?b+1:Math.ceil(N/k));
  // Startlösung: Sektoren rund um die Startadresse (nach Winkel), in Zielgrössen geschnitten
  const idx=withCoords.map((x,i)=>({i:i+1,a:Math.atan2(x.e.lat-home.lat,x.e.lng-home.lng)})).sort((p,q)=>p.a-q.a).map(p=>p.i);
  // besten Startwinkel wählen (Schnitt zwischen den am weitesten entfernten Nachbarn)
  let bestRot=0,bestGap=-1;
  for(let r=0;r<idx.length;r++){const a=pts[idx[r]],b=pts[idx[(r+idx.length-1)%idx.length]];const g=haversine(a.lat,a.lng,b.lat,b.lng);if(g>bestGap){bestGap=g;bestRot=r;}}
  const ring=idx.slice(bestRot).concat(idx.slice(0,bestRot));
  let groups=[],pos=0;base.forEach(n=>{groups.push(ring.slice(pos,pos+n));pos+=n;});
  // Lokale Suche: Verschieben/Tauschen, Ziel = längster Tag möglichst kurz + Gesamtzeit
  const cache={};
  const dayCost=(d,set)=>{const key=d+':'+set.slice().sort((a,b)=>a-b).join(',');if(key in cache)return cache[key];return cache[key]=distTourSec(D,set)+set.length*auditMin*60+fixed[d]*60;};
  const total=gs=>{const cs=gs.map((s,d)=>dayCost(d,s));return Math.max(...cs)*3+cs.reduce((a,b)=>a+b,0);};
  let cur=total(groups),t0=Date.now(),improved=true;
  while(improved&&Date.now()-t0<6000){
    improved=false;
    for(let a=0;a<k&&!improved;a++)for(let b=0;b<k&&!improved;b++){if(a===b)continue;
      // verschieben a->b
      if(groups[a].length>lo[a]&&groups[b].length<hi[b])for(let x=0;x<groups[a].length;x++){
        const ga=groups[a].filter((_,j)=>j!==x),gb=groups[b].concat(groups[a][x]);
        const g2=groups.slice();g2[a]=ga;g2[b]=gb;const v=total(g2);
        if(v<cur-1){groups=g2;cur=v;improved=true;break;}
      }
      // tauschen
      if(!improved)for(let x=0;x<groups[a].length&&!improved;x++)for(let y=0;y<groups[b].length;y++){
        const ga=groups[a].slice(),gb=groups[b].slice();const t=ga[x];ga[x]=gb[y];gb[y]=t;
        const g2=groups.slice();g2[a]=ga;g2[b]=gb;const v=total(g2);
        if(v<cur-1){groups=g2;cur=v;improved=true;break;}
      }
    }
  }
  info.innerHTML=oldInfo;
  _distResult={aud,kw,days,auditMin,fixed,D,src,withCoords,withoutCoords,groups};
  renderDistPreview();
}
function distDayStats(d){
  const R=_distResult,set=R.groups[d];
  const order=set.length?solveRoute(R.D,0,set,0):[];
  let drive=0,p=0;order.forEach(j=>{drive+=R.D[p][j];p=j;});if(order.length)drive+=R.D[p][0];
  const auditT=set.length*R.auditMin,fx=R.fixed[d];
  return{order,drive:drive/60,auditT,fx,total:drive/60+auditT+fx};
}
function renderDistPreview(){
  const R=_distResult;const names=['Mo','Di','Mi','Do','Fr'];
  const fmt=m=>{m=Math.round(m);return Math.floor(m/60)+':'+String(m%60).padStart(2,'0')+' h';};
  const st=R.groups.map((_,d)=>distDayStats(d));
  const maxT=Math.max(...st.map(s=>s.total),1);
  document.getElementById('dist-preview-content').innerHTML=
    `<div style="font-size:10px;color:${R.src==='ors'?'#10B981':'#F59E0B'};margin-bottom:8px">${R.src==='ors'?'✓ Fahrzeiten über Strassennetz':'⚠ Fahrzeiten geschätzt (Luftlinie)'} · Rundtour ab/bis Startadresse</div>`+
    st.map((s,d)=>`<div style="margin-bottom:8px;padding:8px 10px;background:var(--sf2);border-radius:8px;border-left:3px solid var(--blue)">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px">
        <span style="font-size:12px;font-weight:700;color:var(--blue)">${names[R.days[d]]} ${fd(distDayDate(R.kw,R.days[d]))} – ${s.order.length} Baustellen</span>
        <span style="font-size:11px;font-weight:700;color:var(--tx)">≈ ${fmt(s.total)}</span>
      </div>
      <div style="height:6px;background:var(--bd);border-radius:3px;overflow:hidden;display:flex;margin-bottom:4px">
        <div title="Fahrzeit" style="width:${s.drive/maxT*100}%;background:#F59E0B"></div><div title="Audits" style="width:${s.auditT/maxT*100}%;background:#3B82F6"></div><div title="Termine" style="width:${s.fx/maxT*100}%;background:#0EA5E9"></div>
      </div>
      <div style="font-size:10px;color:var(--tx3);margin-bottom:4px">🚗 ${fmt(s.drive)} · 🏗️ ${fmt(s.auditT)}${s.fx?` · 📋 ${fmt(s.fx)} Termine`:''}</div>
      ${s.order.map(j=>{const x=R.withCoords[j-1];return`<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:11px;color:var(--tx2);padding:1px 0">• ${x.e.name}
        <select onchange="distMoveItem(${j},+this.value)" style="font-size:10px;padding:1px 3px;border:1px solid var(--bd);border-radius:4px;background:var(--sf);color:var(--tx2)">${R.days.map((di,dd)=>`<option value="${dd}"${dd===d?' selected':''}>${names[di]}</option>`).join('')}</select></div>`;}).join('')}
    </div>`).join('')+
    (R.withoutCoords.length?`<div style="padding:8px 10px;background:#FEF3C7;border-radius:8px;font-size:11px;color:#92400E">⚠️ ${R.withoutCoords.length} Baustelle(n) ohne Koordinaten werden auf die Tage mit den wenigsten Baustellen verteilt.</div>`:'');
  document.getElementById('dist-preview').style.display='block';
  document.getElementById('dist-confirm-btn').style.display='inline-block';
}
function distMoveItem(j,toD){
  const R=_distResult;
  R.groups=R.groups.map(g=>g.filter(x=>x!==j));R.groups[toD].push(j);
  renderDistPreview();
}
function confirmDistribute(){
  const R=_distResult;if(!R||!R.groups)return;
  const counts=R.groups.map(g=>g.length);
  R.groups.forEach((g,d)=>{const ds=distDayDate(R.kw,R.days[d]);g.forEach(j=>{R.withCoords[j-1].plan.date=ds;});});
  // ohne Koordinaten: jeweils auf den Tag mit den wenigsten Baustellen
  R.withoutCoords.forEach(x=>{const d=counts.indexOf(Math.min(...counts));x.plan.date=distDayDate(R.kw,R.days[d]);counts[d]++;});
  saveNow();renderKW();renderAll();
  document.getElementById('dist-bg').style.display='none';
  showToast('✓ Baustellen verteilt: '+counts.join(' / '),3000);
}












// ═══ MARKER SETZEN / VERSCHIEBEN ═══
// Adresse suchen -> Marker springt dorthin und ist sofort sichtbar/ziehbar. Karte wird bei jedem Öffnen
// neu auf die aktuelle Baustelle (bzw. das Formular) ausgerichtet. Nur Ziehen oder Doppelklick setzen um,
// ein einfacher Klick verschiebt nichts mehr versehentlich.
let _adjTimer=null;
function adjSetMarker(lat,lng,zoom){
  _adjLat=lat;_adjLng=lng;
  if(_adjMarker){_adjMarker.setLatLng([lat,lng]);}
  else{
    _adjMarker=L.marker([lat,lng],{draggable:true,autoPan:true}).addTo(_adjMap);
    _adjMarker.on('dragend',ev=>{const p=ev.target.getLatLng();_adjLat=p.lat;_adjLng=p.lng;updAdjCoords();});
  }
  if(zoom)_adjMap.setView([lat,lng],zoom);
  updAdjCoords();
}
function openMarkerAdjust(){
  document.getElementById('marker-adj-bg').style.display='flex';
  const e=editId?data.find(x=>x.id===editId):null;
  const fLat=parseFloat(document.getElementById('f-lat')?.value),fLng=parseFloat(document.getElementById('f-lng')?.value);
  const pendLat=window._pendingLat,pendLng=window._pendingLng;
  // Reihenfolge: manuell im Formular gesetzt > per Adresse gefunden > gespeicherte Baustelle
  let cur=null;
  if(fLat&&fLng)cur=[fLat,fLng];
  else if(pendLat&&pendLng)cur=[pendLat,pendLng];
  else if(e&&e.lat&&e.lng)cur=[e.lat,e.lng];
  const name=(document.getElementById('f-name')?.value||'').trim()||(e?e.name:'Neue Baustelle');
  const addr=(document.getElementById('f-addr')?.value||'').trim()||(e?e.addr||'':'');
  document.getElementById('marker-adj-name').textContent=[name,addr].filter(Boolean).join(' · ');
  const search=document.getElementById('marker-adj-search');
  search.value=addr;document.getElementById('marker-adj-sugg').style.display='none';
  setTimeout(()=>{
    if(!_adjMap){
      _adjMap=L.map('marker-adj-map',{doubleClickZoom:false}).setView([46.85,8.2],8);
      const base=L.tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',{attribution:'© swisstopo',maxZoom:19});
      const air=L.tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',{attribution:'© swisstopo',maxZoom:19});
      base.addTo(_adjMap);
      L.control.layers({'Karte':base,'Luftbild':air},null,{position:'bottomright'}).addTo(_adjMap);
      _adjMap.on('dblclick',ev=>adjSetMarker(ev.latlng.lat,ev.latlng.lng));
    }
    _adjMap.invalidateSize();
    if(_adjMarker){_adjMap.removeLayer(_adjMarker);_adjMarker=null;}
    _adjLat=_adjLng=null;
    if(cur){adjSetMarker(cur[0],cur[1],17);}
    else{_adjMap.setView([46.85,8.2],8);updAdjCoords();
      if(addr.length>4)adjGeocodeFirst(addr);}
    search.focus();search.select();
  },150);
}
async function adjGeocodeFirst(q){
  try{
    const r=await fetch(`https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(q)}&type=locations&limit=1&sr=4326&lang=de`);
    const d=await r.json();const a=d.results&&d.results[0]&&d.results[0].attrs;
    if(a&&a.lat)adjSetMarker(a.lat,a.lon,17);
  }catch(e){}
}
function adjSearch(q){
  clearTimeout(_adjTimer);
  const box=document.getElementById('marker-adj-sugg');
  if(!q||q.trim().length<3){box.style.display='none';return;}
  _adjTimer=setTimeout(async()=>{
    try{
      const r=await fetch(`https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(q)}&type=locations&limit=8&sr=4326&lang=de`);
      const d=await r.json();
      const hits=(d.results||[]).filter(x=>x.attrs&&x.attrs.lat);
      if(!hits.length){box.innerHTML='<div style="padding:8px 10px;font-size:12px;color:var(--tx3)">Keine Treffer</div>';box.style.display='block';return;}
      box.innerHTML=hits.map(h=>{const lbl=(h.attrs.label||'').replace(/<[^>]+>/g,'');return`<div data-lat="${h.attrs.lat}" data-lng="${h.attrs.lon}" data-lbl="${escH(lbl)}" onmousedown="adjPick(this)" style="padding:8px 10px;font-size:12px;color:var(--tx);cursor:pointer;border-bottom:1px solid var(--bd)">${escH(lbl)}</div>`;}).join('');
      box.style.display='block';
    }catch(e){box.style.display='none';}
  },300);
}
function adjPick(el){
  document.getElementById('marker-adj-search').value=el.dataset.lbl;
  document.getElementById('marker-adj-sugg').style.display='none';
  adjSetMarker(parseFloat(el.dataset.lat),parseFloat(el.dataset.lng),18);
}
function updAdjCoords(){
  const el=document.getElementById('marker-adj-coords');
  if(el)el.textContent=(_adjLat&&_adjLng)?_adjLat.toFixed(5)+', '+_adjLng.toFixed(5):'noch kein Marker';
}
function confirmMarkerAdj(){
  if(!_adjLat||!_adjLng){showToast('Bitte zuerst eine Adresse suchen oder Doppelklick auf die Karte',3000);return;}
  let latEl=document.getElementById('f-lat');
  let lngEl=document.getElementById('f-lng');
  if(!latEl){latEl=document.createElement('input');latEl.id='f-lat';latEl.type='hidden';document.getElementById('f-addr').parentNode.appendChild(latEl);}
  if(!lngEl){lngEl=document.createElement('input');lngEl.id='f-lng';lngEl.type='hidden';document.getElementById('f-addr').parentNode.appendChild(lngEl);}
  latEl.value=_adjLat;lngEl.value=_adjLng;
  document.getElementById('marker-adj-bg').style.display='none';
  document.getElementById('f-addr-hint').textContent='📍 Koordinaten manuell gesetzt';
  showToast('✓ Marker-Position übernommen – jetzt Speichern',2500);
}

function openBeratungChoice(){
  if(!selId)return;
  const e=data.find(x=>x.id===+selId);if(!e)return;
  document.getElementById('berat-choice-name').textContent=e.name;
  document.getElementById('berat-choice-bg').style.display='flex';
}
function openBeratungPlan(){
  if(!selId)return;
  const e=data.find(x=>x.id===+selId);if(!e)return;
  document.getElementById('berat-plan-bs-name').textContent=e.name+' · '+e.addr;
  document.getElementById('berat-plan-date').value=today();
  document.getElementById('berat-plan-note').value='';
  const sel=document.getElementById('berat-plan-aud');
  sel.innerHTML=auditors.map(a=>`<option value="${a}"${a===currentUser?' selected':''}>${a}</option>`).join('');
  document.getElementById('berat-plan-bg').style.display='flex';
}
function confirmBeratungPlan(){
  if(!selId)return;
  const e=data.find(x=>x.id===+selId);if(!e)return;
  const dt=document.getElementById('berat-plan-date').value;
  const aud=document.getElementById('berat-plan-aud').value;
  const note=document.getElementById('berat-plan-note').value.trim();
  if(!dt||!aud){showToast('Datum und Auditor erforderlich');return;}
  beratPlan.push({id:Date.now()+Math.random(),bsId:+selId,date:dt,kw:dateToKW(dt),auditor:aud,note});
  document.getElementById('berat-plan-bg').style.display='none';
  saveNow();renderKW();selEntry(selId);
  showToast('💬 Beratung geplant',2000);
}
function openBeratung(){
  if(!selId)return;
  const e=data.find(x=>x.id===+selId);if(!e)return;
  document.getElementById('berat-bs-name').textContent=e.name+' · '+e.addr;
  document.getElementById('berat-date').value=today();
  document.getElementById('berat-note').value='';
  const sel=document.getElementById('berat-aud');
  sel.innerHTML=auditors.map(a=>`<option value="${a}"${a===currentUser?' selected':''}>${a}</option>`).join('');
  document.getElementById('berat-bg').style.display='flex';
}

function confirmBeratung(){
  if(!selId)return;
  const e=data.find(x=>x.id===+selId);if(!e)return;
  const dt=document.getElementById('berat-date').value;
  const aud=document.getElementById('berat-aud').value;
  const note=document.getElementById('berat-note').value.trim();
  if(!dt||!aud){showToast('Datum und Auditor erforderlich');return;}
  if(!e.beratungen)e.beratungen=[];
  e.beratungen.push({id:Date.now(),date:dt,kw:dateToKW(dt),auditor:aud,note});
  log('Beratung 💬',e.name,'#8B5CF6',aud);
  document.getElementById('berat-bg').style.display='none';
  saveNow();selEntry(selId);
  showToast('💬 Beratung erfasst',2000);
}

function toggleMobileView(){
  const mv=document.getElementById('mobile-view');
  const isOpen=mv.style.display!=='none';
  if(isOpen){
    mv.style.display='none';
    document.getElementById('mobile-btn').style.opacity='1';
    if(_mobMap){_mobMap.remove();_mobMap=null;}
  } else {
    mv.style.display='flex';
    mv.style.flexDirection='column';
    document.getElementById('mobile-btn').style.opacity='0.5';
    _mobDate=today();
    document.getElementById('mob-user').textContent=currentUser||'';
    document.getElementById('mob-audit-date').value=today();
    if(navigator.geolocation&&!_mobGPSPos){navigator.geolocation.getCurrentPosition(
      pos=>{_mobGPSPos={lat:pos.coords.latitude,lng:pos.coords.longitude};renderMobPlan();const btn=document.getElementById('mob-gps-btn');if(btn){btn.textContent='📍 ✓';btn.style.background='#D1FAE5';}},
      ()=>{},
      {timeout:8000,maximumAge:30000,enableHighAccuracy:true}
    );}
    const audSel=document.getElementById('mob-audit-aud');
    audSel.innerHTML=auditors.map(a=>`<option value="${a}"${a===currentUser?' selected':''}>${a}</option>`).join('');
    setMobTab('plan');
    renderMobPlan();
  }
}

function setMobTab(tab){
  ['plan','map'].forEach(t=>{
    document.getElementById('mob-panel-'+t).style.display=t===tab?'flex':'none';
    if(t==='plan')document.getElementById('mob-panel-'+t).style.flexDirection='column';
    const btn=document.getElementById('mob-tab-'+t);
    btn.style.color=t===tab?'var(--blue)':'var(--tx2)';
    btn.style.borderBottomColor=t===tab?'var(--blue)':'transparent';
  });
  if(tab==='map'&&!_mobMap){
    setTimeout(()=>{
      // Use same center as main map
      const mc=map.getCenter();
      const mz=map.getZoom();
      _mobMap=L.map('mob-map').setView([mc.lat,mc.lng],mz);
      L.tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',{attribution:'© swisstopo',maxZoom:19}).addTo(_mobMap);
      renderMobMapMarkers();
    },100);
  }
}

let _mobSitePinsVisible=true,_mobDayPlanMode=false;
function mobToggleSitePins(){
  _mobDayPlanMode=!_mobDayPlanMode;
  const btn=document.getElementById('mob-map-filter-btn');
  if(btn){
    btn.style.background=_mobDayPlanMode?'var(--blue)':'var(--sf)';
    btn.style.color=_mobDayPlanMode?'#fff':'var(--tx)';
    btn.style.borderColor=_mobDayPlanMode?'var(--blue)':'var(--bd)';
    btn.textContent='📅 Mein Tagesplan';
  }
  renderMobMapMarkers();
}
let _mobSiteLayer=null;
function renderMobMapMarkers(){
  if(!_mobMap)return;
  if(_mobSiteLayer){_mobMap.removeLayer(_mobSiteLayer);_mobSiteLayer=null;}
  if(_mobBeratLayer){_mobMap.removeLayer(_mobBeratLayer);_mobBeratLayer=null;}
  _mobSiteLayer=L.layerGroup();
  const siteAudPopup=e=>`<div style="min-width:180px">
      <div style="font-weight:700;font-size:13px;margin-bottom:3px">${pspPre(e.psp)}${e.name}</div>
      ${mobPersHTML(e)?`<div style="margin-bottom:4px">${mobPersHTML(e)}</div>`:''}
      <div style="font-size:11px;color:#6B7280;margin-bottom:10px">${e.addr||''}</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button onclick="_mobMap.closePopup();setMobTab('plan');mobPlanFor(${e.id})" style="padding:7px;background:#6366F1;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;width:100%">📅 Planen</button>
        <button onclick="mobOpenMaps('${(e.addr||'').replace(/'/g,'').replace(/"/g,'')}','${e.name.replace(/'/g,'').replace(/"/g,'')}');" style="padding:7px;background:#F59E0B;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;width:100%">🛣️ Route</button>
        <button onclick="_mobMap.closePopup();setMobTab('plan');mobQuickAuditFor(${e.id})" style="padding:7px;background:#10B981;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;width:100%">✓ Auditiert</button>
      </div>
    </div>`;
  if(_mobDayPlanMode){
    // "Mein Tagesplan": nur die für DIESEN Tag beim eingeloggten Nutzer geplanten Baustellen
    // zeigen (nicht alle aktiven Baustellen) - Personen-Audits und Beratungen des Tages
    // kommen unten ergänzend dazu.
    data.filter(e=>e.lat&&e.lng&&plans.some(p=>p.bsId===e.id&&p.date===_mobDate&&p.auditor===currentUser)).forEach(e=>{
      const col=statusColor(e);
      const m=L.circleMarker([e.lat,e.lng],{radius:8,fillColor:col,color:'#fff',weight:2,fillOpacity:0.9});
      m.bindPopup(siteAudPopup(e));
      m.addTo(_mobSiteLayer);
    });
    _mobSiteLayer.addTo(_mobMap);
    _mobBeratLayer=L.layerGroup();
    data.filter(e=>e.lat&&e.lng&&beratPlan.some(b=>b.bsId===e.id&&b.date===_mobDate&&b.auditor===currentUser)).forEach(e=>{
      const icon=L.divIcon({className:'',html:`<div style="position:relative;width:26px;height:34px">
          <svg width="26" height="34" viewBox="0 0 26 34" style="position:absolute;top:0;left:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))">
            <path d="M13 0C5.8 0 0 5.8 0 13c0 9.5 13 21 13 21s13-11.5 13-21C26 5.8 20.2 0 13 0z" fill="#8B5CF6"/>
            <circle cx="13" cy="13" r="6.5" fill="#fff"/>
          </svg>
          <div style="position:absolute;top:5px;left:0;width:26px;text-align:center;font-size:11px">💬</div>
        </div>`,iconSize:[26,34],iconAnchor:[13,34],popupAnchor:[0,-30]});
      L.marker([e.lat,e.lng],{icon}).addTo(_mobBeratLayer).bindPopup(`<div style="min-width:180px">
        <div style="font-weight:700;font-size:13px;margin-bottom:3px">💬 ${e.name}</div>
        <div style="font-size:11px;color:#6B7280">${e.addr||''}</div>
      </div>`);
    });
    _mobBeratLayer.addTo(_mobMap);
  }else{
    // Normalansicht: alle aktiven Baustellen nach Status eingefärbt (unverändertes bisheriges
    // Verhalten, wenn "Mein Tagesplan" nicht aktiv ist).
    data.filter(e=>e.active&&e.lat&&e.lng).forEach(e=>{
      const col=statusColor(e);
      const m=L.circleMarker([e.lat,e.lng],{radius:8,fillColor:col,color:'#fff',weight:2,fillOpacity:0.9});
      m.bindPopup(siteAudPopup(e));
      m.addTo(_mobSiteLayer);
    });
    _mobSiteLayer.addTo(_mobMap);
  }
  // Geplante Personen-Audits für den aktuell gewählten Tag - immer sichtbar (in beiden Modi),
  // da sie ohnehin schon auf den eingeloggten Nutzer + den gewählten Tag gefiltert sind.
  personAudits.filter(p=>p.planned&&p.date===_mobDate&&p.lat&&p.lng&&(!currentUser||p.auditor===currentUser)).forEach(p=>{
    const col=aC(p.auditor||'')||'#F59E0B';
    const icon=L.divIcon({
      className:'',
      html:`<div style="position:relative;width:26px;height:34px">
        <svg width="26" height="34" viewBox="0 0 26 34" style="position:absolute;top:0;left:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))">
          <path d="M13 0C5.8 0 0 5.8 0 13c0 9.5 13 21 13 21s13-11.5 13-21C26 5.8 20.2 0 13 0z" fill="${col}"/>
          <circle cx="13" cy="13" r="6.5" fill="#fff"/>
        </svg>
        <div style="position:absolute;top:5px;left:0;width:26px;text-align:center;font-size:11px">👤</div>
      </div>`,
      iconSize:[26,34],iconAnchor:[13,34],popupAnchor:[0,-30]
    });
    L.marker([p.lat,p.lng],{icon}).addTo(_mobMap).bindPopup(`<div style="min-width:180px">
      <div style="font-weight:700;font-size:13px;margin-bottom:3px">👤 ${p.person}</div>
      <div style="font-size:11px;color:#6B7280;margin-bottom:10px">${p.addr||p.bs||''}</div>
      <button onclick="_mobMap.closePopup();setMobTab('plan');mobConfirmPersonAudit(${p.id})" style="padding:7px;background:#10B981;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;width:100%">✓ Auditiert</button>
    </div>`);
  });
}
let _mobBeratLayer=null;

function statusColor(e){
  const s=status(e);
  if(s==='overdue')return'#EF4444';
  if(s==='due')return'#F97316';
  if(s==='soon')return'#EAB308';
  if(s==='ok')return'#10B981';
  if(s==='planned')return'#6366F1';
  return'#7C3AED';
}

function mobPrevDay(){
  const d=parseDate(_mobDate);d.setDate(d.getDate()-1);
  _mobDate=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  renderMobPlan();
}
function mobNextDay(){
  const d=parseDate(_mobDate);d.setDate(d.getDate()+1);
  _mobDate=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  renderMobPlan();
}
function mobToday(){_mobDate=today();renderMobPlan();}

function renderMobPlan(){
  const d=parseDate(_mobDate);
  const dayNames=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
  const isToday=_mobDate===today();
  document.getElementById('mob-date-label').textContent=`${dayNames[d.getDay()]}, ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
  // Get plans for this day for current user
  let dayPlans=plans.filter(p=>p.date===_mobDate&&(!currentUser||p.auditor===currentUser));
  const dayBeratPlans=beratPlan.filter(p=>p.date===_mobDate&&(!currentUser||p.auditor===currentUser));
  const dayPersonPlans=personAudits.filter(p=>p.planned&&p.date===_mobDate&&(!currentUser||p.auditor===currentUser));
  const dayAudits=data.filter(e=>(e.auditHistory||[]).some(h=>h.date===_mobDate&&(!currentUser||h.auditor===currentUser)));
  const dayBeratDone=data.filter(e=>(e.beratungen||[]).some(b=>b.date===_mobDate&&(!currentUser||b.auditor===currentUser)));
  const dayPersonDone=personAudits.filter(p=>!p.planned&&p.date===_mobDate&&(!currentUser||p.auditor===currentUser));
  const _dayRapp=rapporte.filter(r=>r.date===_mobDate&&(!currentUser||(r.auditors||[]).includes(currentUser))).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  const _rpPlanN=_dayRapp.filter(r=>r.planned).length,_rpDoneN=_dayRapp.length-_rpPlanN;
  document.getElementById('mob-count-label').textContent=`${dayPlans.length+dayBeratPlans.length+dayPersonPlans.length+_rpPlanN} geplant · ${dayAudits.length+dayBeratDone.length+dayPersonDone.length+_rpDoneN} erledigt`;
  const el=document.getElementById('mob-plan-list');
  if(!dayPlans.length&&!dayBeratPlans.length&&!dayPersonPlans.length&&!dayAudits.length&&!dayBeratDone.length&&!dayPersonDone.length&&!_dayRapp.length){
    el.innerHTML=`<div style="text-align:center;padding:40px 20px;color:var(--tx3)">
      <div style="font-size:40px;margin-bottom:12px">${isToday?'☀️':'📅'}</div>
      <div style="font-size:14px;font-weight:600">Keine Audits ${isToday?'heute':'an diesem Tag'}</div>
    </div>`;
    return;
  }
  let html='';
  // 1.-2b. Geplante Stopps (Baustellen-Audits, Beratungen, Personen-Audits). Mit optimierter
  // Route in Routen-Reihenfolge inkl. Fahrzeit-Etappen, sonst wie bisher nach Typ gruppiert.
  const _cardFns={
    P:p=>{
    const e=data.find(x=>x.id===p.bsId);if(!e)return'';
    const col=aC(p.auditor||'');
    return`<div style="padding:14px;background:var(--sf);border-radius:12px;margin-bottom:10px;border-left:4px solid ${col};box-shadow:0 2px 8px rgba(0,0,0,.08)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:10px;font-weight:700;color:${col}">GEPLANT</span>
        <span style="font-size:11px;color:var(--tx3)">${e.dept||''}</span>
      </div>
      <div style="font-size:16px;font-weight:700;color:var(--tx);margin-bottom:4px;line-height:1.3">${pspPre(e.psp)}${e.name}</div>
      <div style="font-size:12px;color:var(--tx2)">${e.addr||''}</div>
      ${mobPersHTML(e)?`<div style="margin-top:5px">${mobPersHTML(e)}</div>`:''}
      ${e.bc?`<div style="font-size:11px;color:var(--tx3);margin-bottom:10px">BC: ${e.bc}</div>`:'<div style="margin-bottom:10px"></div>'}
      <div style="display:flex;gap:8px">
        <button onclick="mobQuickAuditFor(${e.id})" style="flex:1;padding:9px;background:#10B981;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">✓ Auditiert</button>
        <button onclick="mobOpenMaps('${(e.addr||'').replace(/'/g,"\'")}','${(e.name||'').replace(/'/g,"\'")}');" style="padding:9px 14px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:13px">🗺️</button>
        <button onclick="openMobPlanMenu(${e.id},'${p.date}')" style="padding:9px 12px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:16px;line-height:1">⋯</button>
      </div>
    </div>`;
  },
    B:p=>{
    const e=data.find(x=>x.id===p.bsId);if(!e)return'';
    return`<div style="padding:14px;background:var(--sf);border-radius:12px;margin-bottom:10px;border-left:4px solid #8B5CF6;box-shadow:0 2px 8px rgba(0,0,0,.08)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:10px;font-weight:700;color:#8B5CF6">💬 BERATUNG GEPLANT</span>
        <span style="font-size:11px;color:var(--tx3)">${e.dept||''}</span>
      </div>
      <div style="font-size:16px;font-weight:700;color:var(--tx);margin-bottom:4px;line-height:1.3">${pspPre(e.psp)}${e.name}</div>
      ${mobPersHTML(e)?`<div style="margin-bottom:5px">${mobPersHTML(e)}</div>`:''}
      <div style="font-size:12px;color:var(--tx2);margin-bottom:${p.note?'4px':'10px'}">${e.addr||''}</div>
      ${p.note?`<div style="font-size:12px;color:#8B5CF6;margin-bottom:10px">📝 ${p.note}</div>`:''}
      <div style="display:flex;gap:8px">
        <button onclick="mobConfirmBerat(${p.id})" style="flex:1;padding:9px;background:#8B5CF6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">💬 Durchgeführt</button>
        <button onclick="mobOpenMaps('${(e.addr||'').replace(/'/g,"\'")}','${(e.name||'').replace(/'/g,"\'")}');" style="padding:9px 14px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:13px">🗺️</button>
        <button onclick="openMobBeratMenu(${p.id})" style="padding:9px 12px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:16px;line-height:1">⋯</button>
      </div>
    </div>`;
  },
    A:p=>{
    const col=aC(p.auditor||'');
    return`<div style="padding:14px;background:var(--sf);border-radius:12px;margin-bottom:10px;border-left:4px solid ${col};box-shadow:0 2px 8px rgba(0,0,0,.08)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:10px;font-weight:700;color:${col}">👤 PERSONEN-AUDIT GEPLANT</span>
        <span style="font-size:11px;color:var(--tx3)">${p.kat||''}</span>
      </div>
      <div style="font-size:16px;font-weight:700;color:var(--tx);margin-bottom:4px;line-height:1.3">${p.person}</div>
      <div style="font-size:12px;color:var(--tx2);margin-bottom:${(p.bs||p.note)?'4px':'10px'}">${p.addr||p.bs||''}</div>
      ${p.note?`<div style="font-size:12px;color:${col};margin-bottom:10px">📝 ${p.note}</div>`:''}
      <div style="display:flex;gap:8px">
        <button onclick="mobConfirmPersonAudit(${p.id})" style="flex:1;padding:9px;background:#10B981;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">✓ Auditiert</button>
        ${p.addr?`<button onclick="mobOpenMaps('${p.addr.replace(/'/g,"\'")}','${p.person.replace(/'/g,"\'")}');" style="padding:9px 14px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:13px">🗺️</button>`:''}
        <button onclick="openMobPAMenu(${p.id})" style="padding:9px 12px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:16px;line-height:1">⋯</button>
      </div>
    </div>`;
  },
  };
  const _stops=mobOrderedStops(dayPlans,dayBeratPlans,dayPersonPlans);
  // Geplante Rapporte des Tages (oben, nach Uhrzeit; nicht Teil der Fahrzeit-Route)
  _dayRapp.filter(r=>r.planned).forEach(r=>{
    const col='#0EA5E9';
    const others=(r.team||[]).filter(a=>a!==r.auditor);
    html+=`<div style="padding:14px;background:var(--sf);border-radius:12px;margin-bottom:10px;border-left:4px solid ${col};box-shadow:0 2px 8px rgba(0,0,0,.08)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:10px;font-weight:700;color:${col}">📋 RAPPORT GEPLANT${r.seriesId?' 🔁':''}</span>
        <span style="font-size:11px;color:var(--tx3)">${r.time?r.time+' Uhr':''}</span>
      </div>
      <div style="font-size:16px;font-weight:700;color:var(--tx);margin-bottom:4px;line-height:1.3">${r.type}${r.dept?' – '+r.dept:''}</div>
      <div style="font-size:12px;color:var(--tx2);margin-bottom:${(r.ort||r.note||others.length)?'4px':'10px'}">${r.addr||''}</div>
      ${r.ort?`<div style="font-size:12px;color:var(--tx2);margin-bottom:4px">🏷️ ${r.ort}</div>`:''}
      ${others.length?`<div style="font-size:11px;color:var(--tx3);margin-bottom:4px">👥 mit ${others.join(', ')}</div>`:''}
      ${r.note?`<div style="font-size:12px;color:${col};margin-bottom:10px">📝 ${r.note}</div>`:'<div style="height:6px"></div>'}
      <div style="display:flex;gap:8px">
        <button onclick="confirmRapport(${r.id})" style="flex:1;padding:9px;background:#10B981;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">✓ Teilgenommen</button>
        ${r.addr?`<button onclick="mobOpenMaps('${r.addr.replace(/'/g,"\\'")}','${r.type.replace(/'/g,"\\'")}');" style="padding:9px 14px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:13px">🗺️</button>`:''}
        <button onclick="openMobRPMenu(${r.id})" style="padding:9px 12px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:16px;line-height:1">⋯</button>
      </div>
    </div>`;
  });
  html+=mobRouteBannerHTML(_stops);
  _stops.forEach(st=>{html+=mobLegHTML(st);html+=_cardFns[st.type](st.ref);});
  html+=mobReturnLegHTML(_stops);
  // 3. Erledigte Audits (unten)
  dayAudits.forEach(e=>{
    const h=(e.auditHistory||[]).find(h=>h.date===_mobDate);
    html+=`<div style="padding:14px;background:#F0FDF4;border-radius:12px;margin-bottom:10px;border-left:4px solid #10B981">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:10px;color:#10B981;font-weight:700">✓ ERLEDIGT</span>
        <span style="font-size:10px;color:var(--tx3)">${h?h.auditor:''}</span>
      </div>
      <div style="font-size:15px;font-weight:700;color:var(--tx);margin-bottom:4px">${pspPre(e.psp)}${e.name}</div>
      <div style="font-size:12px;color:var(--tx2)">${e.addr||''}</div>
      ${e.bc?`<div style="font-size:11px;color:var(--tx3)">BC: ${e.bc}</div>`:''}
      ${mobPersHTML(e)?`<div style="margin-top:5px">${mobPersHTML(e)}</div>`:''}
    </div>`;
  });
  // 4. Erledigte Beratungen (ganz unten)
  dayBeratDone.forEach(e=>{
    const b=(e.beratungen||[]).find(b=>b.date===_mobDate);
    html+=`<div style="padding:14px;background:#F5F3FF;border-radius:12px;margin-bottom:10px;border-left:4px solid #8B5CF6">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:10px;color:#8B5CF6;font-weight:700">💬 BERATUNG</span>
        <span style="font-size:10px;color:var(--tx3)">${b?b.auditor:''}</span>
      </div>
      <div style="font-size:15px;font-weight:700;color:var(--tx);margin-bottom:4px">${pspPre(e.psp)}${e.name}</div>
      <div style="font-size:12px;color:var(--tx2)">${e.addr||''}${b&&b.note?' · '+b.note:''}</div>
      ${e.bc?`<div style="font-size:11px;color:var(--tx3)">BC: ${e.bc}</div>`:''}
      ${mobPersHTML(e)?`<div style="margin-top:5px">${mobPersHTML(e)}</div>`:''}
    </div>`;
  });
  // 4b. Erledigte Rapporte
  _dayRapp.filter(r=>!r.planned).forEach(r=>{
    html+=`<div style="padding:14px;background:#F0F9FF;border-radius:12px;margin-bottom:10px;border-left:4px solid #0EA5E9">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:10px;color:#0284C7;font-weight:700">✓ 📋 RAPPORT</span>
        <span style="font-size:10px;color:var(--tx3)">${r.auditor||''}</span>
      </div>
      <div style="font-size:15px;font-weight:700;color:var(--tx);margin-bottom:4px">${r.type}${r.dept?' – '+r.dept:''}</div>
      <div style="font-size:12px;color:var(--tx2)">${[r.addr,r.ort].filter(Boolean).join(' · ')}</div>
    </div>`;
  });
  // 5. Erledigte Personen-Audits (ganz unten)
  dayPersonDone.forEach(p=>{
    html+=`<div style="padding:14px;background:#F0FDF4;border-radius:12px;margin-bottom:10px;border-left:4px solid #10B981">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:10px;color:#10B981;font-weight:700">✓ 👤 PERSONEN-AUDIT</span>
        <span style="font-size:10px;color:var(--tx3)">${p.auditor||''}</span>
      </div>
      <div style="font-size:15px;font-weight:700;color:var(--tx);margin-bottom:4px">${p.person}</div>
      <div style="font-size:12px;color:var(--tx2)">${p.addr||p.bs||''}${p.note?' · '+p.note:''}</div>
    </div>`;
  });
    el.innerHTML=html;
  mobAutoRouteSoon();
}
function mobConfirmPersonAudit(id){
  const p=personAudits.find(x=>x.id===id);if(!p)return;
  p.planned=false;
  log('Auditiert ✓ (Personen-Audit)',p.person,'#10B981',p.auditor);
  saveNow();renderMobPlan();
  showToast('✓ '+p.person+' auditiert',2500);
}


function mobOpenMaps(addr,name){
  const start=localStorage.getItem('audit_start')||'';
  const url=start?
    `https://www.google.com/maps/dir/${encodeURIComponent(start)}/${encodeURIComponent(addr)}`:
    `https://www.google.com/maps/search/${encodeURIComponent(addr)}`;
  window.open(url,'_blank');
}

function mobPlanFor(id){
  const e=data.find(x=>x.id===id);if(!e)return;
  // Add plan for today with current user
  const dt=_mobDate;
  const aud=currentUser||auditors[0]||'';
  if(!aud){showToast('Bitte zuerst Benutzer wählen');return;}
  if(plans.some(p=>p.bsId===id&&p.date===dt)){showToast('Bereits geplant für diesen Tag');renderMobPlan();return;}
  plans.push({bsId:id,auditor:aud,date:dt,id:Date.now()+Math.random()});
  log('Geplant',e.name,'#6366F1',aud);
  saveNow();renderMobPlan();
  showToast('📅 '+e.name+' geplant',2500);
}
let _mobGPSPos=null;
function mobSortByGPS(){
  const btn=document.getElementById('mob-gps-btn');
  if(!navigator.geolocation){showToast('GPS nicht verfügbar – Route startet an der Startadresse',3000);computeMobRoute();return;}
  if(btn){btn.textContent='⏳ GPS…';btn.disabled=true;btn.style.background='#EFF6FF';}
  navigator.geolocation.getCurrentPosition(
    pos=>{
      _mobGPSPos={lat:pos.coords.latitude,lng:pos.coords.longitude};_mobGPSTime=Date.now();_mobAutoTried='';
      if(btn){btn.textContent='⏳ Route…';}
      computeMobRoute().finally(()=>{if(btn){btn.textContent='📍 ✓';btn.disabled=false;btn.style.background='#D1FAE5';}});
    },
    err=>{
      if(btn){btn.textContent='📍 Sortieren';btn.disabled=false;btn.style.background='';}
      let msg='GPS nicht verfügbar';
      if(err.code===1)msg='GPS-Berechtigung verweigert – bitte in Browser-Einstellungen erlauben';
      else if(err.code===2)msg='Standort konnte nicht ermittelt werden';
      else if(err.code===3)msg='GPS Timeout – bitte nochmals versuchen';
      showToast(msg,4000);
    },
    {timeout:10000,maximumAge:30000,enableHighAccuracy:true}
  );
}
// ═══ AUTOMATISCHE SORTIERUNG (Handy-Tagesplan) ═══
// Der Tagesplan ist immer sortiert: beim Öffnen eines Tages und sobald sich die offenen Stopps ändern
// (Audit erledigt, neu geplant, verschoben, abgesagt). Nach einem erledigten Stopp startet die Route ab
// dieser Baustelle (dort steht man gerade); sonst ab aktuellem GPS-Standort (falls frisch) bzw. Startadresse.
let _mobAutoTimer=null,_mobAutoTried='';
function mobAutoRouteSoon(){clearTimeout(_mobAutoTimer);_mobAutoTimer=setTimeout(mobAutoRoute,60);}
function mobAutoRoute(){
  if(_mobRouteBusy||!document.getElementById('mob-plan-list'))return;
  const stops=mobCurrentDayStops().filter(s=>s.lat&&s.lng);
  if(stops.length<2)return;
  const cur=stops.map(s=>s.key).sort().join('|');
  const old=_mobRoute&&_mobRoute.date===_mobDate?_mobRoute:null;
  const oldSet=old?old.keys.filter(k=>old.coords&&old.coords[k]).slice().sort().join('|'):'';
  if(old&&oldSet===cur)return;                                  // Route passt zu den offenen Stopps
  const sig=_mobDate+'#'+cur;if(_mobAutoTried===sig)return;     // gleiche Lage schon versucht (z.B. keine Startadresse)
  _mobAutoTried=sig;
  let start=null,startName=null;
  if(old&&old.coords){
    const removed=old.keys.filter(k=>old.coords[k]&&!stops.some(s=>s.key===k));
    if(removed.length){const last=removed.sort((a,b)=>old.keys.indexOf(b)-old.keys.indexOf(a))[0];start=old.coords[last];startName=(old.coords[last].name||'').replace(/^[^A-Za-zÀ-ÿ0-9]+/,'');}
  }
  if(!start&&_mobGPSPos&&_mobGPSTime&&Date.now()-_mobGPSTime<15*60000)start=null; // frischer GPS-Standort wird in computeMobRoute genutzt
  else if(!start)_mobGPSPos=null;                                // alter GPS-Standort -> Startadresse verwenden
  computeMobRoute({silent:true,start,startName});
}
let _mobGPSTime=0;
// ═══ ROUTEN-OPTIMIERUNG NACH FAHRZEIT ═══
// Start = aktueller GPS-Standort (sonst Startadresse), Ende = Startadresse (Rundtour).
// Fahrzeiten kommen als Matrix von openrouteservice (Strassennetz). Ohne Schlüssel oder ohne
// Netz: Schätzung aus Luftlinie (Umwegfaktor). Reihenfolge: bis 12 Stopps exakt optimal
// (Held-Karp), darüber Nearest-Neighbour + 2-Opt. Optional fester erster Stopp.
let _mobRoute=null;            // {date,keys:[...],legs:[sec],back:sec,total:sec,src:'ors'|'air'}
let _mobFirstPin={};           // date -> stopKey (fest gewählter erster Stopp)
const _orsMatrixCache={};
function mobDayStopList(dayPlans,dayBeratPlans,dayPersonPlans){
  const out=[];
  dayPlans.forEach(p=>{const e=data.find(x=>x.id===p.bsId);if(e)out.push({key:'P'+p.bsId,type:'P',ref:p,lat:e.lat,lng:e.lng,addr:e.addr||'',name:e.name});});
  dayBeratPlans.forEach(p=>{const e=data.find(x=>x.id===p.bsId);if(e)out.push({key:'B'+p.id,type:'B',ref:p,lat:e.lat,lng:e.lng,addr:e.addr||'',name:'💬 '+e.name});});
  dayPersonPlans.forEach(p=>out.push({key:'A'+p.id,type:'A',ref:p,lat:p.lat,lng:p.lng,addr:p.addr||'',name:'👤 '+p.person}));
  return out;
}
function mobCurrentDayStops(){
  const f=x=>x.date===_mobDate&&(!currentUser||x.auditor===currentUser);
  return mobDayStopList(plans.filter(f),beratPlan.filter(f),personAudits.filter(p=>p.planned&&f(p)));
}
// Reihenfolge für die Anzeige: gespeicherte Route (erledigte Stopps fallen raus, neue hinten an),
// sonst Standard-Gruppierung nach Typ.
function mobOrderedStops(dayPlans,dayBeratPlans,dayPersonPlans){
  const stops=mobDayStopList(dayPlans,dayBeratPlans,dayPersonPlans);
  if(!_mobRoute||_mobRoute.date!==_mobDate)return stops;
  const pos={};_mobRoute.keys.forEach((k,i)=>pos[k]=i);
  return stops.slice().sort((a,b)=>(a.key in pos?pos[a.key]:9999)-(b.key in pos?pos[b.key]:9999));
}
function fmtDur(sec){const m=Math.round(sec/60);return m<60?m+' min':Math.floor(m/60)+' h '+String(m%60).padStart(2,'0')+' min';}
function mobRouteValid(stops){return _mobRoute&&_mobRoute.date===_mobDate&&stops.length&&stops.every(s=>_mobRoute.keys.includes(s.key));}
function mobRouteBannerHTML(stops){
  const withCoords=stops.filter(s=>s.lat&&s.lng);
  if(withCoords.length<2)return'';
  const pin=_mobFirstPin[_mobDate]||'';
  const opts=`<option value="">Automatisch (optimal)</option>`+withCoords.map(s=>`<option value="${s.key}"${s.key===pin?' selected':''}>${s.name.replace(/"/g,'&quot;')}</option>`).join('');
  let info='';
  if(mobRouteValid(stops)){
    const r=_mobRoute;
    info=`<div style="font-size:13px;font-weight:700;color:var(--tx)">🚗 ${fmtDur(r.total)} Fahrzeit${r.back?' <span style="font-weight:400;color:var(--tx2);font-size:11px">(inkl. Rückfahrt)</span>':''}</div>
      <div style="font-size:10px;color:${r.src==='ors'?'#10B981':'#F59E0B'};margin-top:2px">${r.src==='ors'?'✓ Berechnet über Strassennetz':'⚠ Schätzung nach Luftlinie (kein Routen-Schlüssel oder offline)'}</div>`;
  }else{
    info=`<div style="font-size:12px;color:var(--tx2)">⏳ Reihenfolge wird automatisch berechnet… <span style="color:var(--tx3)">(📍 Sortieren = neu ab aktuellem Standort)</span></div>`;
  }
  return`<div style="padding:12px 14px;background:var(--sf);border:1px solid var(--bd);border-radius:12px;margin-bottom:10px">
    ${info}
    <div style="display:flex;align-items:center;gap:6px;margin-top:8px">
      <label style="font-size:11px;color:var(--tx2);white-space:nowrap">Erster Stopp:</label>
      <select onchange="mobSetFirstPin(this.value)" style="flex:1;min-width:0;padding:6px;border:1px solid var(--bd);border-radius:8px;background:var(--sf2);color:var(--tx);font-size:12px">${opts}</select>
    </div>
  </div>`;
}
function mobLegHTML(st){
  if(!_mobRoute||_mobRoute.date!==_mobDate)return'';
  const i=_mobRoute.keys.indexOf(st.key);if(i<0||_mobRoute.legs[i]==null)return'';
  return`<div style="display:flex;align-items:center;gap:6px;margin:-2px 0 6px 10px;font-size:11px;color:var(--tx3)"><span>↓</span><span>🚗 ${fmtDur(_mobRoute.legs[i])}${i===0?' '+(_mobRoute.fromLabel||(_mobRoute.fromGPS?'ab Standort':'ab Startadresse')):''}</span></div>`;
}
function mobReturnLegHTML(stops){
  if(!mobRouteValid(stops)||!_mobRoute.back)return'';
  return`<div style="display:flex;align-items:center;gap:6px;margin:-2px 0 12px 10px;font-size:11px;color:var(--tx3)"><span>↓</span><span>🏠 Rückfahrt zur Startadresse ${fmtDur(_mobRoute.back)}</span></div>`;
}
function mobSetFirstPin(key){
  if(key)_mobFirstPin[_mobDate]=key;else delete _mobFirstPin[_mobDate];
  computeMobRoute();
}
async function getHomeCoords(){
  const addr=(localStorage.getItem('audit_start')||'').trim();
  if(!addr)return null;
  if(localStorage.getItem('audit_start_geo_for')===addr){
    const la=+localStorage.getItem('audit_start_lat'),ln=+localStorage.getItem('audit_start_lng');
    if(la&&ln)return{lat:la,lng:ln};
  }
  try{
    const r=await fetch(`https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(addr)}&type=locations&limit=1&sr=4326&lang=de`);
    const d=await r.json();const a=d.results&&d.results[0]&&d.results[0].attrs;
    if(!a)return null;
    localStorage.setItem('audit_start_lat',a.lat);localStorage.setItem('audit_start_lng',a.lon);localStorage.setItem('audit_start_geo_for',addr);
    return{lat:a.lat,lng:a.lon};
  }catch(e){return null;}
}
async function getDurationMatrix(pts){
  const key=window._orsKey;
  const sig=pts.map(p=>p.lat.toFixed(5)+','+p.lng.toFixed(5)).join('|');
  if(key){
    if(_orsMatrixCache[sig])return{D:_orsMatrixCache[sig],src:'ors'};
    try{
      const r=await fetch('https://api.openrouteservice.org/v2/matrix/driving-car',{method:'POST',
        headers:{'Authorization':key,'Content-Type':'application/json'},
        body:JSON.stringify({locations:pts.map(p=>[p.lng,p.lat]),metrics:['duration']})});
      if(!r.ok)throw new Error('ORS '+r.status);
      const d=await r.json();
      if(d.durations&&d.durations.every(row=>row.every(v=>v!==null))){_orsMatrixCache[sig]=d.durations;return{D:d.durations,src:'ors'};}
      throw new Error('unvollständig');
    }catch(ex){console.warn('Routen-Matrix fehlgeschlagen, Luftlinie:',ex);}
  }
  // Rückfall: Luftlinie × Umwegfaktor 1.35 bei Ø 50 km/h
  const D=pts.map(a=>pts.map(b=>haversine(a.lat,a.lng,b.lat,b.lng)*1.35/50*3600));
  return{D,src:'air'};
}
// Optimale Reihenfolge der Knoten 'nodes' zwischen festem Start s und optionalem Ende e.
function solveRoute(D,s,nodes,e){
  const n=nodes.length;
  const pathCost=seq=>{let c=0,cur=s;seq.forEach(j=>{c+=D[cur][j];cur=j;});if(e!=null)c+=D[cur][e];return c;};
  if(n<=1)return nodes.slice();
  if(n<=12){
    const FULL=1<<n,INF=1e18;
    const dp=new Float64Array(FULL*n).fill(INF),par=new Int16Array(FULL*n).fill(-1);
    for(let j=0;j<n;j++)dp[(1<<j)*n+j]=D[s][nodes[j]];
    for(let m=1;m<FULL;m++)for(let j=0;j<n;j++){
      const v=dp[m*n+j];if(v>=INF||!(m&(1<<j)))continue;
      for(let k=0;k<n;k++){if(m&(1<<k))continue;const nm=m|(1<<k),nv=v+D[nodes[j]][nodes[k]];if(nv<dp[nm*n+k]){dp[nm*n+k]=nv;par[nm*n+k]=j;}}
    }
    let best=INF,bj=0;
    for(let j=0;j<n;j++){const v=dp[(FULL-1)*n+j]+(e!=null?D[nodes[j]][e]:0);if(v<best){best=v;bj=j;}}
    const seq=[];let m=FULL-1,j=bj;
    while(j>=0){seq.push(nodes[j]);const pj=par[m*n+j];m&=~(1<<j);j=pj;}
    return seq.reverse();
  }
  // Grösser: Nearest-Neighbour als Start, dann 2-Opt (Segment umdrehen) solange Verbesserung
  let rem=nodes.slice(),seq=[],cur=s;
  while(rem.length){let bi=0;rem.forEach((j,i)=>{if(D[cur][j]<D[cur][rem[bi]])bi=i;});cur=rem.splice(bi,1)[0];seq.push(cur);}
  let bestC=pathCost(seq),improved=true;
  while(improved){improved=false;
    for(let i=0;i<seq.length-1;i++)for(let k=i+1;k<seq.length;k++){
      const cand=seq.slice(0,i).concat(seq.slice(i,k+1).reverse(),seq.slice(k+1));
      const cc=pathCost(cand);if(cc<bestC-1){seq=cand;bestC=cc;improved=true;}
    }
  }
  return seq;
}
let _mobRouteBusy=false;
async function computeMobRoute(opts){
  opts=opts||{};
  if(_mobRouteBusy)return;
  const stops=mobCurrentDayStops().filter(s=>s.lat&&s.lng);
  const noCoord=mobCurrentDayStops().filter(s=>!s.lat||!s.lng);
  if(stops.length<1){renderMobPlan();return;}
  _mobRouteBusy=true;
  try{
    const home=await getHomeCoords();
    const startPt=opts.start||_mobGPSPos||home;
    const fromLabel=opts.start?('ab '+(opts.startName||'letzter Baustelle')):_mobGPSPos?'ab Standort':'ab Startadresse';
    if(!startPt){if(!opts.silent)showToast('Kein Standort und keine Startadresse – bitte GPS erlauben oder Startadresse setzen',4000);return;}
    // Punkte: [Start, Stopp1..n, (Heim)]
    const pts=[startPt,...stops,...(home?[home]:[])];
    const{D,src}=await getDurationMatrix(pts);
    const S=0,E=home?pts.length-1:null;
    let idxs=stops.map((_,i)=>i+1);
    const pinKey=_mobFirstPin[_mobDate];
    const pinIdx=pinKey?stops.findIndex(s=>s.key===pinKey):-1;
    let order;
    if(pinIdx>=0){
      const p=pinIdx+1;
      order=[p,...solveRoute(D,p,idxs.filter(i=>i!==p),E)];
    }else order=solveRoute(D,S,idxs,E);
    const legs=[];let cur=S;
    order.forEach(i=>{legs.push(D[cur][i]);cur=i;});
    const back=E!=null?D[cur][E]:0;
    _mobRoute={date:_mobDate,keys:[...order.map(i=>stops[i-1].key),...noCoord.map(s=>s.key)],
      legs:[...legs,...noCoord.map(()=>null)],back,total:legs.reduce((a,b)=>a+b,0)+back,src,fromGPS:!!_mobGPSPos,fromLabel,
      coords:Object.fromEntries(stops.map(s=>[s.key,{lat:s.lat,lng:s.lng,name:s.name}]))};
    if(opts.silent){}
    else if(src==='air'&&!window._orsKey)showToast('Sortiert nach Luftlinie – für echte Fahrzeiten Routen-Schlüssel im Admin-Menü hinterlegen',4000);
    else if(src==='air')showToast('⚠ Routen-Dienst nicht erreichbar – Schätzung nach Luftlinie',3500);
    else showToast('✓ Schnellste Route berechnet: '+fmtDur(_mobRoute.total),2500);
    if(noCoord.length&&!opts.silent)showToast(`⚠ ${noCoord.length} Stopp(s) ohne Koordinaten – ans Ende gestellt`,3500);
  }finally{_mobRouteBusy=false;renderMobPlan();}
}
// Prüft einen openrouteservice-Schlüssel mit einer kleinen Fahrzeit-Abfrage (Luzern ↔ Zürich)
async function orsTestKey(key){
  try{
    const r=await fetch('https://api.openrouteservice.org/v2/matrix/driving-car',{method:'POST',
      headers:{'Authorization':key,'Content-Type':'application/json'},
      body:JSON.stringify({locations:[[8.3093,47.0502],[8.5417,47.3769]],metrics:['duration']})});
    if(r.status===401||r.status===403)return{ok:false,msg:'Schlüssel ungültig (vollständig kopiert?)'};
    if(r.status===429)return{ok:false,msg:'Tageslimit erreicht – morgen nochmals versuchen'};
    if(!r.ok)return{ok:false,msg:'Fehler '+r.status};
    const d=await r.json();const sec=d.durations&&d.durations[0]&&d.durations[0][1];
    if(!sec)return{ok:false,msg:'unerwartete Antwort'};
    return{ok:true,msg:`Luzern → Zürich ≈ ${Math.round(sec/60)} min Fahrzeit`};
  }catch(e){return{ok:false,msg:'keine Verbindung zu openrouteservice.org'};}
}
async function setOrsKey(){
  const v=await askText(`Routen-Schlüssel für echte Fahrzeiten (statt Luftlinie)

So bekommst du ihn (kostenlos, einmalig, ca. 5 Minuten):
1. openrouteservice.org öffnen → «Sign up» → Konto anlegen und E-Mail bestätigen
2. Anmelden → Dashboard → bei «Request a token» Typ «Standard» wählen, Name z.B. «Auditplaner» → CREATE TOKEN
3. Den angezeigten Schlüssel (Key) kopieren und hier einfügen

Er gilt danach für alle Benutzer. Leer lassen = Fahrzeiten nach Luftlinie.`,window._orsKey||'');
  if(v===null)return;
  const key=v.trim();
  if(key){
    showToast('🔎 Schlüssel wird geprüft…',3000);
    const t=await orsTestKey(key);
    if(!t.ok&&!await askConfirm(`⚠ Der Schlüssel funktioniert nicht: ${t.msg}.\n\nTrotzdem speichern?`,{ok:'Trotzdem speichern',cancel:'Abbrechen'}))return;
    if(t.ok)setTimeout(()=>showToast('✓ Schlüssel funktioniert: '+t.msg,4500),50);
  }
  window._orsKey=key;
  try{localStorage.setItem('anliker_ors_key',window._orsKey);}catch(e){}
  saveNow();
  if(!key)showToast('Routen-Schlüssel entfernt – Fahrzeiten nach Luftlinie',3000);
}
function haversine(lat1,lng1,lat2,lng2){const R=6371,dLat=(lat2-lat1)*Math.PI/180,dLng=(lng2-lng1)*Math.PI/180,a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}

let _mobMenuBsId=null,_mobMenuDate=null,_mobMenuBeratId=null;

function openMobPlanMenu(bsId,date){
  const e=data.find(x=>x.id===bsId);if(!e)return;
  _mobMenuBsId=bsId;_mobMenuDate=date;
  document.getElementById('mob-plan-menu-name').textContent=e.name;
  document.getElementById('mob-plan-menu-addr').textContent=e.addr||'';
  document.getElementById('mob-plan-menu-bg').style.display='flex';
}

function mobMoveDay(offset){
  const p=plans.find(x=>x.bsId===_mobMenuBsId&&x.date===_mobMenuDate);
  if(!p)return;
  const d=parseDate(p.date);d.setDate(d.getDate()+offset);
  p.date=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  saveNow();renderMobPlan();
  document.getElementById('mob-plan-menu-bg').style.display='none';
  showToast('📅 Verschoben auf '+fd(p.date),2000);
}

function mobCancelPlan(){
  plans=plans.filter(p=>!(p.bsId===_mobMenuBsId&&p.date===_mobMenuDate));
  saveNow();renderMobPlan();renderAll();
  document.getElementById('mob-plan-menu-bg').style.display='none';
  showToast('✕ Planung abgesagt',2000);
}

function openMobBeratMenu(beratId){
  const p=beratPlan.find(x=>x.id===beratId);if(!p)return;
  const e=data.find(x=>x.id===p.bsId);
  _mobMenuBeratId=beratId;
  document.getElementById('mob-berat-menu-name').textContent=(e?e.name:'')+(p.note?' · '+p.note:'');
  document.getElementById('mob-berat-menu-bg').style.display='flex';
}

function mobBeratMoveDay(offset){
  const p=beratPlan.find(x=>x.id===_mobMenuBeratId);if(!p)return;
  const d=parseDate(p.date);d.setDate(d.getDate()+offset);
  p.date=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  p.kw=dateToKW(p.date);
  saveNow();renderMobPlan();
  document.getElementById('mob-berat-menu-bg').style.display='none';
  showToast('💬 Verschoben auf '+fd(p.date),2000);
}

function mobCancelBerat(){
  beratPlan=beratPlan.filter(x=>x.id!==_mobMenuBeratId);
  saveNow();renderMobPlan();
  document.getElementById('mob-berat-menu-bg').style.display='none';
  showToast('✕ Beratung abgesagt',2000);
}

let _mobMenuPAId=null;
function openMobPAMenu(id){
  const p=personAudits.find(x=>x.id===id);if(!p)return;
  _mobMenuPAId=id;
  document.getElementById('mob-pa-menu-name').textContent='👤 '+p.person+(p.bs?' – '+p.bs:'');
  document.getElementById('mob-pa-menu-bg').style.display='flex';
}
function mobPAMoveDay(offset){
  const p=personAudits.find(x=>x.id===_mobMenuPAId);if(!p)return;
  const d=parseDate(p.date);d.setDate(d.getDate()+offset);
  p.date=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  p.kw=dateToKW(p.date);
  saveNow();renderMobPlan();
  document.getElementById('mob-pa-menu-bg').style.display='none';
  showToast('📅 Verschoben auf '+fd(p.date),2000);
}
function mobCancelPA(){
  const p=personAudits.find(x=>x.id===_mobMenuPAId);
  personAudits=personAudits.filter(x=>x.id!==_mobMenuPAId);
  saveNow();renderMobPlan();renderAuditors();
  document.getElementById('mob-pa-menu-bg').style.display='none';
  showToast('✕ Personen-Audit abgesagt',2000);
  if(p)log('Abgesagt (Personen-Audit)',p.person,'#EF4444',p.auditor||'—');
}

let _mobMenuRPId=null;
function openMobRPMenu(id){
  const r=rapporte.find(x=>x.id===id);if(!r)return;
  _mobMenuRPId=id;
  document.getElementById('mob-rp-menu-name').textContent='📋 '+r.type+(r.time?' · '+r.time+' Uhr':'')+(r.dept?' – '+r.dept:'');
  document.getElementById('mob-rp-menu-bg').style.display='flex';
}
function mobRPMoveDay(offset){
  const r=rapporte.find(x=>x.id===_mobMenuRPId);if(!r)return;
  document.getElementById('mob-rp-menu-bg').style.display='none';
  moveRapportTo(r.id,rpAddDays(r.date,offset));
}
function mobCancelRP(){
  document.getElementById('mob-rp-menu-bg').style.display='none';
  rmRapport(_mobMenuRPId);
}
function mobConfirmBerat(id){
  const p=beratPlan.find(x=>x.id===id);if(!p)return;
  const e=data.find(x=>x.id===p.bsId);if(!e)return;
  if(!e.beratungen)e.beratungen=[];
  e.beratungen.push({id:Date.now()+Math.random(),date:p.date,kw:p.kw||dateToKW(p.date),auditor:p.auditor,note:p.note||''});
  beratPlan=beratPlan.filter(x=>x.id!==id);
  log('Beratung ✓',e.name,'#8B5CF6',p.auditor);
  saveNow();renderMobPlan();
  showToast('💬 Beratung erfasst – '+e.name,2500);
}


function mobSearch(q){
  const res=document.getElementById('mob-search-res');
  if(!q||q.length<2){res.style.display='none';return;}
  const ql=q.toLowerCase();
  const hits=data.filter(e=>e.active&&(e.name.toLowerCase().includes(ql)||(e.addr||'').toLowerCase().includes(ql))).slice(0,5);
  if(hits.length){
    res.innerHTML=hits.map(e=>`<div onclick="mobMapGo(${e.lat},${e.lng},'${e.name.replace(/'/g,'')}');document.getElementById('mob-search').value='';document.getElementById('mob-search-res').style.display='none'"
      style="padding:10px 14px;border-bottom:1px solid var(--bd);cursor:pointer;font-size:13px">
      <div style="font-weight:600">${e.name}</div><div style="font-size:11px;color:var(--tx2)">${e.addr||''}</div>
    </div>`).join('');
    res.style.display='block';
  } else res.style.display='none';
  if(q.length>=3){
    fetch(`https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(q)}&type=locations&limit=3&sr=4326&lang=de`)
      .then(r=>r.json()).then(d=>{
        if(!d.results)return;
        const extra=d.results.map(r=>`<div onclick="mobMapGo(${+r.attrs.lat||0},${+r.attrs.lon||0},'${mgSafe((r.attrs.label||'').replace(/<[^>]+>/g,''))}');document.getElementById('mob-search').value='';document.getElementById('mob-search-res').style.display='none'"
          style="padding:10px 14px;border-bottom:1px solid var(--bd);cursor:pointer;font-size:13px">
          <div style="font-weight:600;color:var(--blue)">📍 ${mgSafe((r.attrs.label||'').replace(/<[^>]+>/g,''))}</div>
        </div>`).join('');
        const cur=document.getElementById('mob-search-res');
        cur.innerHTML=(hits.length?cur.innerHTML:'')+extra;
        cur.style.display='block';
      }).catch(()=>{});
  }
}

function mobMapGo(lat,lng,label){
  if(_mobMap){_mobMap.setView([lat,lng],15);}
}


function mobQuickAuditFor(id){
  const e=data.find(x=>x.id===id);if(!e)return;
  _mobSelId=id;
  document.getElementById('mob-audit-search').value=e.name;
  document.getElementById('mob-audit-sel').textContent=e.name+' · '+e.addr;
  document.getElementById('mob-audit-sel').style.display='block';
  document.getElementById('mob-audit-date').value=_mobDate;
  document.getElementById('mob-audit-bg').style.display='flex';
}
function closeMobAudit(){document.getElementById('mob-audit-bg').style.display='none';}

function mobAuditSearch(q){
  const res=document.getElementById('mob-audit-res');
  if(!q){res.style.display='none';return;}
  const hits=data.filter(e=>e.active&&e.name.toLowerCase().includes(q.toLowerCase())).slice(0,6);
  if(!hits.length){res.style.display='none';return;}
  res.innerHTML=hits.map(e=>`<div onclick="mobSelectAuditBS(${e.id})" style="padding:10px 14px;border-bottom:1px solid var(--bd);cursor:pointer">
    <div style="font-size:13px;font-weight:600">${e.name}</div>
    <div style="font-size:11px;color:var(--tx2)">${e.addr||''}</div>
  </div>`).join('');
  res.style.display='block';
}
function mobSelectAuditBS(id){
  const e=data.find(x=>x.id===id);if(!e)return;
  _mobSelId=id;
  document.getElementById('mob-audit-search').value=e.name;
  document.getElementById('mob-audit-sel').textContent=e.name+' · '+e.addr;
  document.getElementById('mob-audit-sel').style.display='block';
  document.getElementById('mob-audit-res').style.display='none';
}
function confirmMobAudit(){
  if(!_mobSelId){showToast('Bitte Baustelle wählen');return;}
  const e=data.find(x=>x.id===_mobSelId);if(!e)return;
  const dt=document.getElementById('mob-audit-date').value;
  const aud=document.getElementById('mob-audit-aud').value;
  if(!dt||!aud){showToast('Datum und Auditor erforderlich');return;}
  e.lastAudit=dt;e.lastKW=dateToKW(dt);e.auditor=aud;
  if(!e.auditHistory)e.auditHistory=[];
  if(!e.auditHistory.some(h=>h.date===dt))e.auditHistory.push({date:dt,kw:dateToKW(dt),auditor:aud});
  plans=plans.filter(p=>!(p.bsId===_mobSelId&&p.date<=dt));
  log('Auditiert ✓',e.name,'#10B981',aud);
  closeMobAudit();saveNow();renderMobPlan();
  showToast('✓ Audit erfasst – '+e.name,3000);
}

// ═══ AUTH ═══
const ADMIN_EMAILS=['matthias.knotz@anliker.ch']; // weitere Admins hinzufügen
const ADMIN_EMAIL=ADMIN_EMAILS[0]; // Rückwärtskompatibilität
let sbAuth=null;
let _authUser=null;

async function initAuth(){
  // Init Supabase client with auth
  const url=localStorage.getItem('sb_url')||SB_DEFAULT_URL;
  const key=localStorage.getItem('sb_key')||SB_DEFAULT_KEY;
  try{
    sbAuth=window.supabase.createClient(url,key);
    // Check existing session
    const {data:{session}}=await sbAuth.auth.getSession();
    if(session){
      await onAuthSuccess(session.user);
    } else {
      showLoginModal();
    }
    // Listen for auth changes
    sbAuth.auth.onAuthStateChange(async(event,session)=>{
      if(event==='SIGNED_IN'&&session){
        await onAuthSuccess(session.user);
      } else if(event==='SIGNED_OUT'){
        showLoginModal();
      }
    });
  }catch(e){
    console.warn('Auth init failed:',e);
    showLoginModal();
  }
}

function showLoginModal(){
  document.getElementById('login-bg').style.display='flex';
  document.getElementById('app').style.display='none';
  document.getElementById('hdr').style.display='none';
  setTimeout(()=>document.getElementById('login-email').focus(),300);
}

let _mapInited=false;
function hideLoginModal(){
  document.getElementById('login-bg').style.display='none';
  document.getElementById('app').style.display='flex';
  document.getElementById('hdr').style.display='flex';
  if(!_mapInited){
    _mapInited=true;
    initMap();
  }
  setTimeout(()=>{
    if(typeof map!=='undefined'&&map)map.invalidateSize(true);
  },200);
  // Anleitung öffnet sich nicht mehr automatisch - nur noch über den ❓-Button in der Kopfzeile
}

async function onAuthSuccess(user){
  _authUser=user;
  const meta=user.user_metadata||{};
  const displayName=mgSafe(meta.display_name||meta.full_name||user.email.split('@')[0]);
  // Check if must change password
  if(meta.must_change_password){
    document.getElementById('login-bg').style.display='flex';
    document.getElementById('app').style.display='none';
    document.getElementById('hdr').style.display='none';
    document.getElementById('login-form').style.display='none';
    document.getElementById('changepw-form').style.display='block';
    return;
  }
  // Set currentUser from display name - match to auditors list
  const dn=displayName.toLowerCase();
  const matched=auditors.find(a=>a.toLowerCase()===dn)||auditors.find(a=>((auditorMeta[a]||{}).loginAliases||[]).some(x=>x.toLowerCase()===dn))||displayName;
  currentUser=matched;
  localStorage.setItem(USER_KEY,matched);
  // Set admin if email matches
  let isAdmin=ADMIN_EMAILS.includes(user.email.toLowerCase());
  if(isAdmin){
    document.body.classList.add('admin-mode');
    localStorage.setItem('anliker_admin','1');
  } else {
    document.body.classList.remove('admin-mode');
    localStorage.removeItem('anliker_admin');
  }
  // Load auditorMeta from Supabase before checking role
  try{
    const d=await sbFetch('audit_state?select=auditorMeta&limit=1');
    if(Array.isArray(d)&&d[0]?.auditorMeta){try{auditorMeta=JSON.parse(d[0].auditorMeta);localStorage.setItem('anliker_aud_meta',JSON.stringify(auditorMeta));}catch(e){}}
  }catch(e){}
  // Admins können zusätzlich in Supabase (Tabelle app_admins) hinterlegt werden
  if(!isAdmin){
    const r=await sbFetch('rpc/is_app_admin',{method:'POST',body:'{}'});
    if(r===true){isAdmin=true;document.body.classList.add('admin-mode');localStorage.setItem('anliker_admin','1');}
  }
  // Check secondary/full admin from auditorMeta
  const meta2=auditorMeta[matched]||{};
  // Voll-Admin nur über ADMIN_EMAILS oder die Datenbank-Liste app_admins (siehe oben);
  // ein alter Eintrag «fullAdmin» in den Auditor-Angaben wird ignoriert (dort änderbar für alle).
  const isSecondaryAdmin=!isAdmin&&meta2.secondaryAdmin===true;
  if(isAdmin){
    document.body.classList.remove('secondary-admin');
    localStorage.removeItem('anliker_sec_admin');
  } else if(isSecondaryAdmin){
    document.body.classList.add('secondary-admin');
    document.body.classList.remove('admin-mode');
    localStorage.setItem('anliker_sec_admin','1');
    localStorage.removeItem('anliker_admin');
  } else if(!isAdmin){
    document.body.classList.remove('secondary-admin','admin-mode');
    localStorage.removeItem('anliker_sec_admin');
    localStorage.removeItem('anliker_admin');
  }
  hideLoginModal();
  updateUserUI();updateAdminUI();prefillAuditor();
  // Wait for map to be ready, then load Supabase data
  setTimeout(async()=>{
    await sbInit();
    renderAll();
    renderMarkers();
  },500);
  showToast('👤 Angemeldet als '+matched,2500);
}

async function doLogin(){
  const email=document.getElementById('login-email').value.trim();
  const pw=document.getElementById('login-pw').value;
  const errEl=document.getElementById('login-err');
  const btn=document.getElementById('login-btn');
  if(!email||!pw){errEl.textContent='E-Mail und Passwort erforderlich';errEl.style.display='block';return;}
  btn.textContent='…';btn.disabled=true;errEl.style.display='none';
  try{
    // Wait for supabase to be ready
    let tries=0;
    while(!window.supabase&&tries<20){await new Promise(r=>setTimeout(r,200));tries++;}
    if(!window.supabase){throw new Error('Verbindung nicht möglich – bitte Seite neu laden');}
    if(!sbAuth){
      const url=localStorage.getItem('sb_url')||SB_DEFAULT_URL;
      const key=localStorage.getItem('sb_key')||SB_DEFAULT_KEY;
      sbAuth=window.supabase.createClient(url,key);
    }
    const {error}=await sbAuth.auth.signInWithPassword({email,password:pw});
    if(error)throw error;
  }catch(e){
    btn.textContent='Anmelden';btn.disabled=false;
    errEl.textContent=e.message==='Invalid login credentials'?'E-Mail oder Passwort falsch':e.message;
    errEl.style.display='block';
  }
}

async function doChangePw(){
  const pw1=document.getElementById('new-pw1').value;
  const pw2=document.getElementById('new-pw2').value;
  const errEl=document.getElementById('changepw-err');
  if(pw1.length<8){errEl.textContent='Passwort muss mindestens 8 Zeichen haben';errEl.style.display='block';return;}
  if(pw1!==pw2){errEl.textContent='Passwörter stimmen nicht überein';errEl.style.display='block';return;}
  errEl.style.display='none';
  try{
    const {error}=await sbAuth.auth.updateUser({password:pw1,data:{must_change_password:false}});
    if(error)throw error;
    document.getElementById('changepw-form').style.display='none';
    document.getElementById('login-form').style.display='block';
    const {data:{session}}=await sbAuth.auth.getSession();
    if(session)await onAuthSuccess(session.user);
  }catch(e){
    errEl.textContent=e.message;errEl.style.display='block';
  }
}

async function doLogout(){
  if(!await askConfirm('Wirklich abmelden?',{ok:'Abmelden'}))return;
  if(sbConnected&&(saveT||sbHasPending()||sbSync.state==='error')){
    saveNow();
    await new Promise(r=>setTimeout(r,1500));
    if(sbHasPending()&&!await askConfirm('Einige Änderungen konnten noch nicht gespeichert werden. Beim Abmelden gehen sie verloren. Trotzdem abmelden?',{ok:'Trotzdem abmelden',danger:true}))return;
  }
  document.getElementById('app').style.display='none';
  document.getElementById('hdr').style.display='none';
  if(sbAuth)await sbAuth.auth.signOut();
  // Daten nicht auf dem Gerät zurücklassen (nach dem nächsten Login kommen sie vom Server)
  try{LOCAL_DATA_KEYS.forEach(k=>localStorage.removeItem(k));}catch(e){}
  currentUser='';localStorage.removeItem(USER_KEY);
  localStorage.removeItem('anliker_admin');localStorage.removeItem('anliker_sec_admin');
  location.reload();
}

// ═══ PRESENCE (Online-Anzeige) ═══
let _presenceTimer=null;

async function presencePing(){
  if(!sbConnected||!currentUser)return;
  await sbFetch('presence',{method:'POST',
    body:JSON.stringify({id:currentUser,user:currentUser,seen_at:new Date().toISOString()}),
    headers:{'Prefer':'resolution=merge-duplicates'}});
}

async function presencePull(){
  if(!sbConnected)return;
  const rows=await sbFetch('presence?select=*');
  if(!rows)return;
  const now=Date.now();
  const online=rows.filter(r=>{
    const age=(now-new Date(r.seen_at).getTime())/1000;
    return age<120; // online if seen in last 2 minutes
  });
  renderPresence(online);
}

function renderPresence(online){
  const bar=document.getElementById('presence-bar');
  if(!bar)return;
  if(!online.length){bar.innerHTML='';return;}
  online=online.map(r=>({...r,user:mgSafe(String(r.user||''))}));
  bar.innerHTML=online.map(r=>{
    const isMe=r.user===currentUser;
    const col=aC(r.user);
    const ini=r.user.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    return`<div title="${r.user}${isMe?' (Du)':' (Online)'}" style="width:22px;height:22px;border-radius:50%;background:${col};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;border:2px solid ${isMe?'#fff':'rgba(255,255,255,.4)'}">
      ${ini}
    </div>`;
  }).join('');
}

function startPresence(){
  if(_presenceTimer)clearInterval(_presenceTimer);
  presencePing();
  presencePull();
  _presenceTimer=setInterval(()=>{presencePing();presencePull();},30000);
}

// ═══ USER MANAGEMENT ═══
const USER_KEY='anliker_current_user';
let currentUser=localStorage.getItem(USER_KEY)||'';

function updateUserUI(){
  const nameEl=document.getElementById('current-user-name');
  const avatarEl=document.getElementById('current-user-avatar');
  if(!nameEl||!avatarEl)return;
  if(currentUser){
    nameEl.textContent=currentUser.split(' ').pop(); // Last name only in header
    const initials=currentUser.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    avatarEl.textContent=initials;
    avatarEl.style.background=aC(currentUser);
  } else {
    nameEl.textContent='Benutzer wählen';
    avatarEl.textContent='?';
    avatarEl.style.background='#6B7280';
  }
}





function prefillAuditor(){
  if(!currentUser)return;
  ['aud-pick','cal-aud','mp-aud','fer-aud','pa-aud'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&el.querySelector(`option[value="${currentUser}"]`)){el.value=currentUser;}
    else if(el){[...el.options].forEach(o=>{if(o.text===currentUser)el.value=o.value;});}
  });
  // Also set mp-aud when it gets built
}

// ═══ DEPT MANAGEMENT ═══
function openDeptManager(){
  renderDeptList();
  document.getElementById('dept-bg').style.display='flex';
  setTimeout(()=>document.getElementById('dept-new').focus(),100);
}
function addDept(){
  const v=document.getElementById('dept-new').value.trim();
  if(!v)return;
  if(!customDepts.includes(v)){customDepts.push(v);customDepts.sort();saveDepts();}
  document.getElementById('dept-new').value='';
  renderDeptList();
  // Update all dept dropdowns
  const dsel=document.getElementById('f-dept');
  if(dsel)buildDF();
  showToast('✓ Abteilung hinzugefügt');
}
function removeDept(dept){
  const used=data.filter(e=>deptParts(e.dept).includes(dept)).length;
  if(used){showToast(`«${dept}» wird von ${used} Baustelle(n) verwendet – umbenennen oder dort ändern, dann löschen`,4500);return;}
  undoPoint(`Abteilung «${dept}» gelöscht`,()=>{renderDeptList();buildDF();renderAuditors();});
  customDepts=customDepts.filter(d=>d!==dept);delete deptMeta[dept];
  saveDepts();renderDeptList();buildDF();renderAuditors();
}
// Umbenennen zieht alle Baustellen mit; Umbenennen auf einen bestehenden Namen = zusammenführen
async function renameDept(oldD,newD){
  newD=(newD||'').trim();
  if(!newD||newD===oldD)return;
  const exists=getAllDepts().includes(newD);
  if(exists&&!await askConfirm(`«${newD}» existiert bereits. «${oldD}» damit zusammenführen?`,{ok:'Zusammenführen'})){renderDeptList();return;}
  let n=0;
  data.forEach(e=>{const p=deptParts(e.dept);if(p.includes(oldD)){e.dept=[...new Set(p.map(x=>x===oldD?newD:x))].join(' + ');n++;}});
  customDepts=[...new Set(customDepts.map(d=>d===oldD?newD:d))].sort();
  if(deptMeta[oldD]){deptMeta[newD]=Object.assign({},deptMeta[oldD],deptMeta[newD]||{});delete deptMeta[oldD];}
  if(deptMeta._abtMap)Object.keys(deptMeta._abtMap).forEach(k=>{if(deptMeta._abtMap[k]===oldD)deptMeta._abtMap[k]=newD;});
  saveDepts();buildDF();renderDeptList();renderAll();
  showToast(`✓ «${oldD}» → «${newD}» (${n} Baustellen angepasst)`,3000);
}
function setDeptMA(dept,val){
  const yr=document.getElementById('dept-ma-year')?.value||String(new Date().getFullYear());
  deptMeta[dept]=deptMeta[dept]||{};deptMeta[dept].ma=deptMeta[dept].ma||{};
  const v=parseInt(val);
  if(isNaN(v)||v<=0)delete deptMeta[dept].ma[yr];else deptMeta[dept].ma[yr]=v;
  saveDepts();
}
// Abteilung einer Person aus dem Personen-Register: exakter Name (ohne Gross/Klein) oder manuelle
// Zuordnung (deptMeta._abtMap), gepflegt in "Abteilungen verwalten".
function mapPersonAbt(abt){
  if(!abt)return null;
  const a=abt.trim().toLowerCase();
  const d=getAllDepts().find(x=>x.toLowerCase()===a);if(d)return d;
  const m=(deptMeta._abtMap||{})[abt.trim()];return m||null;
}
function unmappedPersonAbts(){
  const vals=[...new Set((typeof persons!=='undefined'?persons:[]).map(p=>(p.abt||'').trim()).filter(Boolean))];
  return vals.filter(v=>!getAllDepts().some(d=>d.toLowerCase()===v.toLowerCase())).sort();
}

// ═══ FIXIERTE FUSSZEILE IN FENSTERN ═══
// In langen Fenstern bleibt die Button-Leiste (Speichern/Schliessen/Übernehmen …) am unteren Rand
// sichtbar, auch beim Scrollen. Erkennt pro Fenster automatisch die letzte reine Button-Leiste.
function _isBtnBar(x){
  if(!x||!x.children.length)return false;
  return[...x.children].every(ch=>ch.tagName==='BUTTON'||((ch.tagName==='DIV'||ch.tagName==='SPAN')&&ch.children.length&&[...ch.children].every(g=>g.tagName==='BUTTON')));
}
function stickFooter(box){
  if(!box||box.dataset.stickyDone)return;
  let f=box.lastElementChild,guard=0;
  while(f&&!_isBtnBar(f)&&f.lastElementChild&&guard++<4)f=f.lastElementChild;
  if(!_isBtnBar(f))return;
  const cs=getComputedStyle(box);
  const pad=parseFloat(cs.paddingLeft)||20,padT=parseFloat(cs.paddingTop)||pad,padB=parseFloat(cs.paddingBottom)||pad;
  if(f.parentElement===box){
    // Aufteilen: Inhalt scrollt in eigenem Bereich, Button-Leiste steht fest darunter -> kann nie Inhalt verdecken
    const body=document.createElement('div');
    body.style.cssText=`flex:1;min-height:0;overflow-y:auto;padding:${padT}px ${pad}px 10px`;
    [...box.childNodes].forEach(n=>{if(n!==f)body.appendChild(n);});
    box.insertBefore(body,f);
    Object.assign(box.style,{display:'flex',flexDirection:'column',overflow:'hidden',padding:'0',maxHeight:box.style.maxHeight||'90vh'});
    Object.assign(f.style,{flexShrink:'0',margin:'0',padding:`12px ${pad}px 14px`,borderTop:'1px solid var(--bd)',background:'var(--sf)'});
  }else{
    // Button-Leiste liegt tiefer (z.B. in einer Vorschau): unten anheften
    if(cs.overflowY!=='auto'&&cs.overflowY!=='scroll'){box.style.maxHeight=box.style.maxHeight||'90vh';box.style.overflowY='auto';}
    Object.assign(f.style,{position:'sticky',bottom:'0',zIndex:'6',background:'var(--sf)',
      marginLeft:(-pad)+'px',marginRight:(-pad)+'px',marginBottom:(-padB)+'px',
      paddingLeft:pad+'px',paddingRight:pad+'px',paddingTop:'12px',paddingBottom:'14px',
      borderTop:'1px solid var(--bd)',boxShadow:'0 -8px 12px -10px rgba(0,0,0,.35)'});
  }
  box.dataset.stickyDone='1';
}
function initStickyFooters(){
  ['dist-bg','aud-admin-bg','pi-bg','pisb-bg','rpe-bg','tw-bg','dept-bg','rpt-bg','guide-bg'].forEach(id=>{
    const ov=document.getElementById(id);if(ov)stickFooter(ov.firstElementChild);
  });
  document.querySelectorAll('.mbg > .modal').forEach(stickFooter);
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(initStickyFooters,300));
// ═══ EINSTELLUNGEN (Admin → Einstellungen & Regeln) ═══
// Alle definierten Werte an einer Stelle; gespeichert in deptMeta._settings (über Supabase synchronisiert).
const SETTINGS_DEF=[
 {grp:'Fälligkeit (Ampel)',items:[
  {k:'due_soon_days',l:'«Bald fällig» (gelb) ab … Tage vor Fälligkeit',def:10,min:0,max:60,u:'Tage'},
  {k:'due_overdue_days',l:'«Überfällig» (rot) ab … Tage nach Fälligkeit',def:10,min:0,max:90,u:'Tage'}]},
 {grp:'Standard-Rhythmus beim Erfassen',items:[
  {k:'rh_baustelle',l:'Baustelle',def:28,min:7,max:365,u:'Tage'},
  {k:'rh_gu',l:'Generalunternehmung (GU)',def:42,min:7,max:365,u:'Tage'},
  {k:'rh_werkhof',l:'Werkhof',def:182,min:7,max:730,u:'Tage'}]},
 {grp:'Tourguide',items:[
  {k:'tg_day_start',l:'Tagesbeginn (Abfahrt ab Startadresse)',def:7,min:4,max:12,step:.25,u:'Uhr'},
  {k:'tg_day_hours',l:'Arbeitstag inkl. Fahrzeit (ohne Mittagspause)',def:9,min:2,max:14,step:.5,u:'Std.'},
  {k:'tg_lunch_start',l:'Mittagspause ab',def:12,min:10,max:15,step:.25,u:'Uhr'},
  {k:'tg_lunch_dur',l:'Mittagspause Dauer (0 = keine)',def:60,min:0,max:120,step:15,u:'min'},
  {k:'tg_max_per_day',l:'Max. Baustellen pro Tag',def:6,min:1,max:15,u:'Stk.'},
  {k:'tg_pers_max_age',l:'Personalangabe darf höchstens so alt sein (Wochen vor der geplanten KW)',def:3,min:0,max:26,u:'Wochen'},
  {k:'tg_min_1_3',l:'Audit-Dauer bei 1–3 Personen',def:30,min:5,max:480,u:'min'},
  {k:'tg_min_4_9',l:'Audit-Dauer bei 4–9 Personen',def:45,min:5,max:480,u:'min'},
  {k:'tg_min_10_19',l:'Audit-Dauer bei 10–19 Personen',def:60,min:5,max:480,u:'min'},
  {k:'tg_min_20',l:'Audit-Dauer bei 20+ Personen',def:75,min:5,max:480,u:'min'},
  {k:'tg_min_unknown',l:'Audit-Dauer, Personal unbekannt',def:45,min:5,max:480,u:'min'},
  {k:'tg_harvest_min',l:'Ort ausschöpfen: alle roten/orangen Baustellen im Umkreis von … Fahrzeit mitnehmen',def:15,min:0,max:60,u:'min'},
  {k:'tg_force_days',l:'Immer einplanen, wenn mehr als … Tage rot (auch allein in einer Gegend)',def:20,min:0,max:180,u:'Tage'},
  {k:'tg_tie_min',l:'Gleich weit: Umwege, die sich um höchstens … unterscheiden (dann entscheiden Grösse, ★, Fälligkeit)',def:5,min:0,max:30,u:'min'},
  {k:'tg_fixed_pa',l:'Geplantes Personen-Audit belegt',def:45,min:0,max:480,u:'min'},
  {k:'tg_fixed_berat',l:'Geplante Beratung belegt',def:45,min:0,max:480,u:'min'}]},
 {grp:'Verteilen (KW-Planung)',items:[
  {k:'dist_audit_min',l:'Ø Dauer pro Audit (Vorschlag)',def:60,min:5,max:480,u:'min'},
  {k:'dist_day_hours',l:'Tageslänge für Anteilsberechnung',def:8.5,min:2,max:14,step:.5,u:'Std.'}]},
 {grp:'Personal-Import',items:[
  {k:'pi_review_max',l:'«Prüfen» bis … Personen (darüber: läuft)',def:2,min:0,max:20,u:'Pers.'},
  {k:'pi_react_inactive_min',l:'Inaktive Baustelle: Reaktivierung vorschlagen ab',def:2,min:1,max:50,u:'Pers.'},
  {k:'pi_history_weeks',l:'Personalverlauf aufbewahren',def:52,min:4,max:260,u:'Wochen'}]},
 {grp:'Auswertung Abteilungen',items:[
  {k:'tt_tol_pct',l:'Termintreue: Toleranz auf den Rhythmus',def:25,min:0,max:200,u:'%'},
  {k:'tt_green',l:'Termintreue grün ab',def:80,min:0,max:100,u:'%'},
  {k:'tt_orange',l:'Termintreue orange ab',def:60,min:0,max:100,u:'%'}]},
 {grp:'Ferienplanung',items:[
  {k:'wf_overlap',l:'Wunschferien: Überschneidung markieren ab',def:2,min:2,max:10,u:'Pers.'}]}
];
const SETTINGS_MAP=Object.fromEntries(SETTINGS_DEF.flatMap(g=>g.items).map(i=>[i.k,i]));
function S(k){
  const s=(typeof deptMeta!=='undefined'&&deptMeta&&deptMeta._settings)||{};
  const v=s[k];
  return(v===undefined||v===null||v==='')?SETTINGS_MAP[k].def:+v;
}
function setSetting(k,v){
  const d=SETTINGS_MAP[k];deptMeta._settings=deptMeta._settings||{};
  if(v===''||v===null||v===undefined){delete deptMeta._settings[k];}
  else{let n=+v;if(isNaN(n)){showToast('Ungültiger Wert');renderSettings();return;}
    n=Math.min(d.max,Math.max(d.min,n));
    if(n===d.def)delete deptMeta._settings[k];else deptMeta._settings[k]=n;}
  saveDepts();renderSettings();renderAll();
  if(typeof renderDeptTable==='function')renderDeptTable();
}
async function resetAllSettings(){
  if(!await askConfirm('Alle Einstellungen auf die Standardwerte zurücksetzen?',{ok:'Zurücksetzen',danger:true}))return;
  undoPoint('Einstellungen zurückgesetzt',()=>renderSettings());
  deptMeta._settings={};saveDepts();renderSettings();renderAll();showToast('↺ Standardwerte wiederhergestellt');
}
function ensureRhOpt(v){
  const sel=document.getElementById('f-rh');if(!sel)return;
  if(![...sel.options].some(o=>+o.value===+v))sel.insertAdjacentHTML('beforeend',`<option value="${v}">${v} Tage</option>`);
}
function setDefaultRhythm(type){
  const v=type==='werkhof'?S('rh_werkhof'):type==='gu'?S('rh_gu'):S('rh_baustelle');
  ensureRhOpt(v);document.getElementById('f-rh').value=String(v);
}
// Regel-Beschreibung - Zahlen kommen live aus den Einstellungen, damit Text und Verhalten übereinstimmen
function rulesHTML(){
  const v=k=>`<b style="color:var(--blue)">${String(S(k)).replace('.',',')}</b>`;
  const sec=(ic,t,items)=>`<div style="margin-bottom:14px"><div style="font-size:13px;font-weight:700;color:var(--tx);margin-bottom:6px"><i class="ti ti-${ic}" style="color:var(--blue)"></i> ${t}</div><ul style="margin:0;padding-left:18px;font-size:12px;color:var(--tx2);line-height:1.55">${items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
  return`<div style="font-size:11px;color:var(--tx3);margin-bottom:12px">Übersicht der Regeln, nach denen der Planer arbeitet. Blaue Zahlen sind im Tab «Werte» einstellbar.</div>`+
  sec('traffic-lights','Status & Ampel',[
    `Fälligkeit = letztes Audit + Rhythmus der Baustelle.`,
    `<span style="color:#EAB308">●</span> Bald fällig ab ${v('due_soon_days')} Tagen vor Fälligkeit · <span style="color:#F59E0B">●</span> fällig ab Fälligkeitstag · <span style="color:#EF4444">●</span> überfällig ab ${v('due_overdue_days')} Tagen danach.`,
    `Noch nie auditierte Baustellen (★ auf der Karte): Frist läuft ab Erfassung – violett = neu, orange = fällig, rot = überfällig.`,
    `Geplante Baustellen (blau) und geplante Beratungen (violett) werden nicht als fällig gezählt; pausierte und inaktive gar nicht.`]) +
  sec('refresh','Rhythmus',[
    `Standard beim Erfassen: Baustelle ${v('rh_baustelle')} Tage, GU ${v('rh_gu')} Tage, Werkhof ${v('rh_werkhof')} Tage. Pro Baustelle individuell änderbar.`,
    `Feld «Zeitbedarf» (nur Spezialbaustellen): feste Audit-Dauer, übersteuert die Schätzung nach Personal.`]) +
  sec('user-pause','Personal-Import (Einsatzlisten)',[
    `0 Personen → «Pausieren» (vorausgewählt). 1–${v('pi_review_max')} Personen → «Prüfen» (nicht vorausgewählt; «Dauerhaft ausschliessen» möglich, z.B. Gefängnis-Baustellen). Mehr → läuft; war sie pausiert → «Reaktivieren».`,
    `Inaktive Baustelle mit mind. ${v('pi_react_inactive_min')} Personen → Reaktivierung wird vorgeschlagen (nicht vorausgewählt).`,
    `Zuordnung: PSP exakt inkl. Unternummer (4226280.13 ≠ 4226280.01); Etappen (3025325.1/.2) → Hauptnummer 3025325; Namens-Treffer nur innerhalb der Abteilung der Einsatzliste; mehrere Listen für dieselbe Baustelle werden zusammengezählt.`,
    `«Nicht auf der Liste»: aktive Baustellen einer Abteilung, deren Einsatzlisten <u>alle</u> importiert wurden, die aber auf keiner stehen → Pausieren vorgeschlagen (neu erfasste nicht vorausgewählt).`,
    `Gespeichert wird die Personalzahl bei allen erkannten Baustellen (auch dauerhaft ausgeschlossene), «nicht auf der Liste» erhält 0. Verlauf: ${v('pi_history_weeks')} Wochen.`,
    `Werkhöfe sind vom Import komplett ausgenommen. Unbekannte Einträge: zuordnen (Alias wird gemerkt), neu anlegen oder in die Sammelbox.`,
    `KW-Planung: Jede Baustellen-Karte zeigt 👷 das Personal der KW, in der sie geplant ist (Import oder manuell). Gibt es dafür keinen Wert, steht grau kursiv der zuletzt bekannte Wert mit seiner KW, ohne Angabe «–». Eine 0 ist rot. Werkhöfe zeigen nichts.`,
    `Temporäre Mitarbeitende: nur Personal-Nummern (keine Namen), pro Einheit bei jedem Import ersetzt.`,
    `Manuelle Erfassung (für Einheiten ohne brauchbare Einsatzliste): im Detail-Panel ✏️ bei «Personal» oder Admin → «Personal manuell erfassen» (mehrere Baustellen einer Abteilung). Wirkt wie ein Import-Wert (Verlauf, Trend, Tourguide), ersetzt einen vorhandenen Wert derselben KW und ändert den Status der Baustelle nicht (kein Pausieren/Reaktivieren).`]) +
  sec('compass','Tourguide',[
    `Vorschläge nur für <b>rote (überfällige) und orange (fällige)</b> Baustellen mit Koordinaten <b>und bekanntem Personal vor Ort (mehr als 0)</b>. Gelbe, neue (noch nicht fällige) und grüne Baustellen werden nie vorgeschlagen – sonst lägen Audits zu nahe beieinander. Die Personalangabe (Import oder manuell) darf höchstens ${v('tg_pers_max_age')} Wochen älter sein als die geplante KW – sonst gilt das Personal als unbekannt. Solche Baustellen werden nie vorgeschlagen, aber unter dem Vorschlag aufgelistet.`,
    `Nie: pausiert, inaktiv, ausgeschlossene Abteilungen, diese KW bereits (von irgendwem) eingeplant, 0 Personal oder keine/zu alte Personalangabe.`,
    `<b>Ort ausschöpfen:</b> Ist an einem Tag eine Baustelle oder ein Termin in einer Gegend, werden zuerst alle roten und orangen Baustellen im Umkreis von ${v('tg_harvest_min')} min Fahrzeit mitgenommen (soweit der Tag Platz hat) – damit man nicht wegen einer einzelnen Baustelle nochmals hinfahren muss. Das gilt für bereits geplante Baustellen, Termine und jede neu gewählte Baustelle.`,
    `Auswahl: zuerst rot, dann orange. Innerhalb derselben Farbe entscheidet der kleinste Umweg zur bestehenden Tagesroute. Liegen Umwege höchstens ${v('tg_tie_min')} min auseinander, gelten sie als gleich weit – dann entscheiden Personal-Grösse, bevorzugte Abteilung ★ und wie lange die Baustelle schon fällig ist.`,
    `Die Ampel gilt am <b>Audit-Tag</b>, nicht heute: Eine Baustelle, die heute gelb ist, aber am geplanten Tag orange, wird für diesen Tag berücksichtigt – für frühere Tage der Woche nicht.`,
    `Keine zweite Fahrt in dieselbe Gegend in derselben Woche: Wird eine Gegend an einem Tag schon besucht, kommen ihre Baustellen nur an diesen Tag (was keinen Platz mehr hat, erscheint im Hinweis «Ort nicht ausgeschöpft»).`,
    `Eine neue Gegend wird an einem Tag nur angefangen, wenn alle ihre roten und orangen Baustellen dort Platz haben (Ausnahmen: Gegend beim Startort; die Gegend ist ohnehin zu gross für einen Tag; oder die Baustelle ist schon mehr als ${v('tg_force_days')} Tage rot – dann wird sie auf jeden Fall eingeplant, damit nichts ewig liegen bleibt). Sonst kommt sie an einem anderen Tag oder in einer anderen Woche dran.`,
    `Hinweise im Vorschlag: «Wenig wirtschaftlich», wenn ein Tag mehr Fahrzeit als Audit-/Terminzeit hat; «👥 … ist auch in der Nähe», wenn andere Auditoren am selben Tag Baustellen im Umkreis geplant haben.`,
    `Bleiben im Umkreis eines Tages Baustellen offen (Tag voll oder Personal unbekannt), zeigt der Vorschlag unter dem Tag «⚠ Ort nicht ausgeschöpft» – mit «+ trotzdem hinzufügen». Beim Ausgleich zwischen den Tagen wird keine Baustelle von ihren Nachbarn getrennt.`,
    `Audit-Dauer: 1–3 Pers. ${v('tg_min_1_3')} · 4–9 ${v('tg_min_4_9')} · 10–19 ${v('tg_min_10_19')} · 20+ ${v('tg_min_20')} · unbekannt ${v('tg_min_unknown')} min (inkl. Schreiben/Rapportieren; Fahrzeit separat).`,
    `Tag: Abfahrt ab Startadresse um ${tgHM(S('tg_day_start')*60)}, max. ${v('tg_day_hours')} h Arbeitszeit bis zur Rückkehr (inkl. aller Fahrten und Wartezeiten, ohne Mittagspause), max. ${v('tg_max_per_day')} Baustellen.`,
    `Mittagspause ${tgHM(S('tg_lunch_start')*60)}–${tgHM(S('tg_lunch_start')*60+S('tg_lunch_dur'))} (${v('tg_lunch_dur')} min): keine Baustellen-Audits, Personen-Audits oder Beratungen – ein Audit, das nicht vor der Pause fertig wäre, beginnt nach der Pause. Fahrten werden unterbrochen. Rapporte mit fixer Uhrzeit dürfen in der Pause liegen. Endet der Tag vorher, entfällt die Pause.`,
    `Tagesablauf wird echt simuliert: Fahrt zu jedem Stopp (Baustellen <u>und</u> Termine an ihrer Adresse), Auditzeit, Fahrt zum nächsten, Rückfahrt.`,
    `Rapporte mit Uhrzeit sind fix: rechtzeitig dort sein (früher ankommen = Wartezeit). Ist ein Rapport der erste Termin des Tages und ab Tagesbeginn nicht erreichbar, wird entsprechend früher losgefahren. Baustellen werden nur so eingeplant, dass kein Termin verpasst wird.`,
    `Rapporte ohne Uhrzeit, geplante Personen-Audits (${v('tg_fixed_pa')} min) und Beratungen (${v('tg_fixed_berat')} min) sind Stopps an ihrem Ort, Reihenfolge frei optimiert. Rapporte ohne Adresse zählen nur als Zeit (keine Fahrt).`,
    `Füllt nur auf – bereits Geplantes bleibt. Reicht die Arbeit nicht für alle Tage, bleibt ein Tag frei statt überall halbe Tage.`,
    `Startadresse: auf dem eigenen Gerät gesetzte hat Vorrang, sonst die in «Auditoren verwalten».`]) +
  sec('layout-distribute-horizontal','Verteilen (KW-Planung)',[
    `Verteilt die bereits geplanten Baustellen einer KW auf die gewählten Tage: max. 1 Baustelle Unterschied pro Tag, möglichst gleich lange Tage (Fahrzeit + Ø ${v('dist_audit_min')} min pro Audit + bestehende Termine).`,
    `Ferientage werden automatisch ausgelassen. Termine (Rapporte etc.) zählen beim Verteilen nur als belegte Zeit – für einen Tagesablauf mit Uhrzeiten und Adressen den Tourguide verwenden.`]) +
  sec('route','Routen (Handy)',[
    `Der Tagesplan ist immer sortiert: automatisch beim Öffnen eines Tages und sobald sich die offenen Stopps ändern (erledigt, neu geplant, verschoben, abgesagt).`,
    `Start: nach einem erledigten Stopp ab dieser Baustelle, sonst ab aktuellem GPS-Standort (wenn höchstens 15 min alt) bzw. ab Startadresse; Ende an der Startadresse. «📍 Sortieren» berechnet neu ab dem aktuellen Standort.`,
    `Reihenfolge nach echter Fahrzeit (openrouteservice), bis 12 Stopps exakt optimal. Ohne Schlüssel/Netz: Schätzung nach Luftlinie. Navigation pro Stopp über 🗺️ auf der Karte.`]) +
  sec('clipboard-list','Rapporte',[
    `Ein Termin, Status pro Person: Absagen/Bestätigen betrifft nur die jeweilige Person; Verschieben verschiebt den Termin für alle.`,
    `Zählung: Termine (1 Rapport mit 3 Personen = 1 Termin) und Teilnahmen (= 3). Rapporte zählen nie als Audit.`]) +
  sec('chart-donut','Zählung & Auswertung',[
    `Soll/Jahr gesamt = Summe der Soll-Werte der Auditoren. Aufs Soll zählen Baustellen- und Personen-Audits; Beratungen und Rapporte separat.`,
    `Termintreue: Audit-Abstände innerhalb Rhythmus + ${v('tt_tol_pct')} % zählen als rechtzeitig; aktuell überfällige als verspätet. Grün ab ${v('tt_green')} %, orange ab ${v('tt_orange')} %.`,
    `Pro 100 MA: Audits im Zeitraum ÷ Mitarbeitende der Abteilung (Abteilungen verwalten) × 100.`,
    `Personen-Audits zählen bei der Abteilung der Person laut Personen-Register (sonst bei der Abteilung der Baustelle).`]) +
  sec('user-check','Personen-Audits & Personen-Register',[
    `Abteilung, Arbeitsort und Firma sind Auswahllisten (Admin → Personen-Listen verwalten). Neue Werte über «＋ Neuer Eintrag…» im Formular – gleiche Schreibweisen (auch anders gross/klein) werden erkannt und nicht doppelt angelegt.`,
    `Personen im Register sind bearbeitbar (✏️). Ändert man Nummer, Name, Abteilung oder Firma, ziehen bestehende Personen-Audits mit.`,
    `Mehrere Personen in einem Audit: zählt als <b>1 Audit</b> (Soll, Auswertungen); in der Jahresmatrix erhält jede genannte Person den Eintrag (Tooltip zeigt, mit wem). Die erstgenannte Person bestimmt die Abteilung in der Abteilungs-Auswertung.`,
    `Jahresmatrix: Name, Nummer und Abteilung werden hellgrün (✓), sobald die Person im gewählten Jahr <u>durchgeführt</u> auditiert wurde – geplante Audits zählen nicht (blau, 📅). Oben steht «X von Y Personen auditiert».`]) +
  sec('layout-columns','Wochenansicht (KW-Planung)',[
    `Geplante und erledigte Einträge zeigen dieselben Infos: PSP, Name, BC-Chef und Personal. Erledigte sind grün mit ✓ (Namensfeld der Auditor bleibt in seiner Farbe), ohne Verschieben-Knöpfe.`,
    `Rapporte: ein Termin mit allen Teilnehmenden – Umrandung = geplant, gefüllt mit ✓ = teilgenommen.`]) +
  sec('beach','Ferien',[
    `Wunschferien: jeder trägt eigene ein, alle sehen alle; Admins bestätigen → werden fixe Ferien.`,
    `Überschneidung wird ab ${v('wf_overlap')} Personen gleichzeitig rot markiert. Fixe Ferien sperren Tage in Tourguide und Verteilen.`]);
}
let _setTab='werte';
function openSettings(){_setTab='werte';renderSettings();document.getElementById('set-bg').style.display='flex';}
function setSettingsTab(t){_setTab=t;renderSettings();}
function renderSettings(){
  const box=document.getElementById('set-body');if(!box)return;
  ['werte','regeln'].forEach(t=>{const b=document.getElementById('set-tab-'+t);if(b){b.style.borderBottomColor=t===_setTab?'var(--blue)':'transparent';b.style.color=t===_setTab?'var(--blue)':'var(--tx2)';}});
  if(_setTab==='regeln'){box.innerHTML=rulesHTML();return;}
  const s=deptMeta._settings||{};
  box.innerHTML=SETTINGS_DEF.map(g=>`<div style="margin-bottom:16px">
    <div style="font-size:12px;font-weight:700;color:var(--tx);margin-bottom:6px">${escH(g.grp)}</div>
    <div style="border:1px solid var(--bd);border-radius:8px">${g.items.map(i=>{const changed=s[i.k]!==undefined;return`<div style="display:flex;align-items:center;gap:10px;padding:7px 10px;border-bottom:1px solid var(--bd)">
      <span style="flex:1;font-size:12px;color:var(--tx)">${escH(i.l)}${changed?` <span style="font-size:10px;color:#F59E0B">(geändert, Standard ${i.def})</span>`:''}</span>
      <input type="number" value="${S(i.k)}" min="${i.min}" max="${i.max}" step="${i.step||1}" onchange="setSetting('${i.k}',this.value)" style="width:80px;padding:5px 7px;border:1px solid ${changed?'#F59E0B':'var(--bd)'};border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px;text-align:right">
      <span style="width:46px;font-size:11px;color:var(--tx3)">${i.u==='Uhr'?tgHM(S(i.k)*60):i.u}</span>
      <button onclick="setSetting('${i.k}','')" title="Auf Standard (${i.def}) zurücksetzen" style="background:none;border:none;cursor:pointer;color:${changed?'var(--blue)':'var(--bd)'};font-size:14px" ${changed?'':'disabled'}>↺</button>
    </div>`;}).join('')}</div></div>`).join('')+
    `<div style="text-align:right"><button onclick="resetAllSettings()" style="padding:6px 12px;border:1px solid var(--bd);border-radius:var(--rs);background:var(--sf2);font-size:11px;cursor:pointer;color:var(--tx2)">↺ Alle auf Standard</button></div>`;
}
// ═══ TOURGUIDE ═══
// Schlägt für einen Auditor und die gewählten Tage einer KW passende Baustellen vor (Richtwert 4-6, max. 6
// pro Tag inkl. bereits geplanter). Tag = 9 h inkl. Fahrzeit (Rundtour ab/bis Startadresse); bereits geplante
// Baustellen, Rapporte, Personen-Audits und Beratungen werden berücksichtigt. Dringlichkeit: überfällig >
// fällig > bald fällig > neu; bevorzugte Abteilungen zuerst, ausgeschlossene nie. Füllt nur auf.
function tgAuditMin(e){
  if(e.zeitbedarf)return +e.zeitbedarf;
  const n=e.lastPersonalKW!==undefined?e.lastPersonalCount:null;
  if(n===null||n===undefined)return S('tg_min_unknown');
  if(n<=3)return S('tg_min_1_3');if(n<=9)return S('tg_min_4_9');if(n<=19)return S('tg_min_10_19');return S('tg_min_20');
}
// Personal-Klasse für die Priorität: 0 = 20+, 1 = 10-19, 2 = 4-9, 3 = 1-3, 4 = unbekannt (kein Import)
function tgPersClass(e){
  const n=e.lastPersonalKW!==undefined?e.lastPersonalCount:null;
  if(n===null||n===undefined)return 4;
  if(n>=20)return 0;if(n>=10)return 1;if(n>=4)return 2;return 3;
}
function tgUrgency(e,ds){const s=status(e,ds?parseDate(ds).getTime()+12*3600000:undefined);return{overdue:0,due:1,soon:2,new:3}[s];}
// «Personal vor Ort» für Tourguide: bekannter Wert grösser 0, und die Angabe ist nicht älter als eingestellt
// (relativ zur geplanten KW). Ohne Angabe oder mit veraltetem Wert gilt das Personal als unbekannt -> nie vorschlagen.
function tgYearForKW(kw){return pmYearFor(kw);}
function isoMonday(kw,yr){const j=new Date(yr,0,4);const sw=new Date(j.getTime()-((j.getDay()||7)-1)*86400000);return new Date(sw.getTime()+(kw-1)*7*86400000);}
function persYear(e){
  const h=(e.personalHistory||[]).find(x=>x.kw===e.lastPersonalKW&&(x.count===e.lastPersonalCount));
  if(h)return h.year;
  const y=new Date().getFullYear(),kw=e.lastPersonalKW;
  return isoMonday(kw,y).getTime()>Date.now()+60*86400000?y-1:y;   // ältere Angaben ohne Jahr: nächstliegendes Jahr
}
function tgPersonalState(e,targetKW,targetYear){
  if(e.lastPersonalKW===undefined||e.lastPersonalCount===undefined||e.lastPersonalCount===null)return'unknown';
  const wk=(isoMonday(targetKW,targetYear).getTime()-isoMonday(e.lastPersonalKW,persYear(e)).getTime())/(7*86400000);
  if(wk>S('tg_pers_max_age'))return'stale';
  return e.lastPersonalCount>0?'ok':'zero';
}
function tgCandidates(aud,kw,noPers,dayDates){
  const m=auditorMeta[aud]||{};const pref=new Set(m.prefDepts||[]),excl=new Set(m.exclDepts||[]);
  const ks=kwToDate(kw),ke=kwToDate(kw+1);
  const plannedThisKW=new Set(plans.filter(p=>p.date>=ks&&p.date<ke).map(p=>p.bsId));
  return data.filter(e=>{
    if(!e.active||e.paused||!e.lat||!e.lng)return false;
    // nur rot + orange – und zwar am Audit-Tag (was heute gelb ist, kann bis dann orange sein)
    if(!(dayDates||[null]).some(ds=>{const u=tgUrgency(e,ds);return u===0||u===1;}))return false;
    if(plannedThisKW.has(e.id))return false;                  // von irgendwem diese KW eingeplant
    if(deptParts(e.dept).some(d=>excl.has(d)))return false;   // ausgeschlossen (hart)
    // Nur mit Personal vor Ort: bekannt, > 0 und aktuell. Sonst NIE vorschlagen (unbekannt/veraltet werden aufgelistet).
    const ps=tgPersonalState(e,kw,tgYearForKW(kw));
    if(ps!=='ok'){if(noPers&&(ps==='unknown'||ps==='stale'))noPers.push({e,state:ps});return false;}
    return true;
  }).map(e=>{const isPref=deptParts(e.dept).some(d=>pref.has(d));const urgDay=(dayDates||[null]).map(ds=>{const u=tgUrgency(e,ds);return u===0||u===1?u:null;});
    return{e,isPref,urgDay,urg:Math.min(...urgDay.map(u=>u===null?9:u)),pers:tgPersClass(e),min:tgAuditMin(e)};})
    // Priorität: 1) Ampel (rot vor orange)  2) Personal-Grösse (mehr Personal = höheres Risiko)  3) bevorzugte Abteilung  4) am längsten fällig
    .sort((a,b)=>a.urg-b.urg||a.pers-b.pers||(a.isPref?0:1)-(b.isPref?0:1)||dl(a.e)-dl(b.e));
}
// ─── Tagesablauf-Simulation ───────────────────────────────────────────────────────────────
// Ein Tag = Folge von Stopps (Baustellen + Termine). Termine mit Uhrzeit (Rapporte) sind Zeitfenster:
// rechtzeitig dort sein (sonst «zu spät»), bei Frühankunft warten. Termine ohne Ort: keine Fahrt.
function tgHM(m){m=Math.round(m);const h=Math.floor(m/60),mm=((m%60)+60)%60;return String(h).padStart(2,'0')+':'+String(mm).padStart(2,'0');}
function tgDayEvents(aud,ds){
  const ev=[];
  rapporte.filter(r=>r.date===ds&&r.auditor===aud).forEach(r=>{
    const tm=r.time&&/^\d{1,2}:\d{2}$/.test(r.time)?(+r.time.split(':')[0]*60+ +r.time.split(':')[1]):null;
    ev.push({kind:'rp',icon:'📋',col:'#0EA5E9',label:r.type+(r.dept?' – '+r.dept:''),sub:r.addr||r.ort||'',time:tm,dur:+r.dur||60,lat:r.lat,lng:r.lng,addr:r.addr,ref:r});
  });
  personAudits.filter(p=>p.planned&&p.date===ds&&p.auditor===aud).forEach(p=>ev.push({kind:'pa',icon:'👤',col:'#F59E0B',label:'Personen-Audit '+p.person,sub:p.addr||p.bs||'',time:null,dur:S('tg_fixed_pa'),lat:p.lat,lng:p.lng}));
  beratPlan.filter(p=>p.date===ds&&p.auditor===aud).forEach(p=>{const e=data.find(x=>x.id===p.bsId);ev.push({kind:'bp',icon:'💬',col:'#8B5CF6',label:'Beratung '+(e?e.name:''),sub:e?e.addr||'':'',time:null,dur:S('tg_fixed_berat'),lat:e&&e.lat,lng:e&&e.lng});});
  return ev;
}
async function tgGeocodeEvents(evs){
  for(const ev of evs){
    if(ev.kind!=='rp'||(ev.lat&&ev.lng)||!ev.addr)continue;
    try{const r=await fetch(`https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(ev.addr)}&type=locations&limit=1&sr=4326&lang=de`);
      const d=await r.json();const a=d.results&&d.results[0]&&d.results[0].attrs;
      if(a){ev.lat=a.lat;ev.lng=a.lon;ev.ref.lat=a.lat;ev.ref.lng=a.lon;}}catch(e){}
  }
}
// items: [{t:'bs',node}|{t:'ev',ev}] ; liefert Zeiten, Fahrzeit, Verspätung, Gesamtdauer ab Abfahrt
function tgSim(items){
  const R=_tgCalc,D=R.D;
  // Mittagspause: keine Audits/Stopps ohne Uhrzeit darin; Fahrten werden unterbrochen. Fixe Termine (Rapporte
  // mit Uhrzeit) dürfen in der Pause liegen. Die Pause zählt nicht zur Tageslänge (Arbeitszeit).
  const LS=S('tg_lunch_start')*60,LD=S('tg_lunch_dur'),LE=LS+LD;
  const run=start=>{
    let t=start,pos=0,drive=0,wait=0,late=0,aud=0,evt=0,lunch=0,lunchAt=-1;const sched=[];
    const takeLunch=(i)=>{if(LD>0&&lunch===0){lunch=LD;lunchAt=i;}};
    items.forEach((it,ii)=>{
      const node=it.t==='bs'?it.node:it.ev.node;
      const tr=node!=null?D[pos][node]/60:0;drive+=tr;
      // Fahrt startet in der Pause -> erst nach der Pause losfahren; Fahrt läuft in die Pause -> unterwegs Pause
      if(LD>0&&tr>0&&lunch===0){if(t>=LS&&t<LE){wait+=LE-t;t=LE;takeLunch(ii);}else if(t<LS&&t+tr>LS){t+=LD;takeLunch(ii);}}
      let arr=t+tr;
      const tm=it.t==='ev'?it.ev.time:null;let st=arr;
      if(tm!=null){if(arr>tm){late+=arr-tm;st=arr;}else{wait+=tm-arr;st=tm;}}
      const du=it.t==='bs'?R.dur.get(it.node):it.ev.dur;
      // Audit / Stopp ohne Uhrzeit darf nicht in die Pause fallen -> nach der Pause beginnen
      if(LD>0&&tm==null&&st<LE&&st+du>LS){
        if(st<LS)wait+=LS-st;               // Zeit bis Pausenbeginn geht verloren (Audit hätte nicht mehr Platz)
        else if(lunch>0)wait+=LE-st;        // Pause schon genommen -> nur warten
        takeLunch(ii);st=LE;
      }
      if(it.t==='bs')aud+=du;else evt+=du;
      sched.push({arr,start:st,end:st+du,late:tm!=null&&arr>tm?arr-tm:0});
      t=st+du;if(node!=null)pos=node;
    });
    const back=items.length?D[pos][0]/60:0;drive+=back;
    if(LD>0&&lunch===0&&items.length){if(t>=LS&&t<LE){t=LE;takeLunch(items.length);}else if(t<LS&&t+back>LS){t+=LD;takeLunch(items.length);}}
    t+=back;
    return{start,end:t,total:t-start-lunch,drive,wait:Math.max(0,wait),late,aud,evt,lunch,lunchAt,sched};
  };
  const day0=S('tg_day_start')*60;let r=run(day0);
  // Nur wenn der ERSTE Stopp des Tages ein Termin mit Uhrzeit ist und ab Tagesbeginn nicht erreichbar:
  // entsprechend früher losfahren. Liegt etwas davor, gilt der Termin als verpasst (keine Mitternachts-Touren).
  if(items.length&&items[0].t==='ev'&&items[0].ev.time!=null&&r.sched[0].late>0){const r2=run(day0-r.sched[0].late);if(r2.late<r.late)r=r2;}
  return r;
}
const _tgBetter=(a,b)=>a.late<b.late-0.5||(Math.abs(a.late-b.late)<=0.5&&a.total<b.total);
// Reihenfolge für einen Tag: Termine mit Uhrzeit nach Zeit, alles andere per günstigster Einfügung + Verbesserung
function tgPlanDay(d,bsNodes){
  const R=_tgCalc;const key=d+':'+bsNodes.slice().sort((a,b)=>a-b).join(',');
  if(R.cache.has(key))return R.cache.get(key);
  const evs=R.days[d].events;
  let items=evs.filter(e=>e.time!=null).sort((a,b)=>a.time-b.time).map(ev=>({t:'ev',ev}));
  const flex=[...evs.filter(e=>e.time==null).map(ev=>({t:'ev',ev})),...bsNodes.map(node=>({t:'bs',node}))];
  const insertBest=(arr,it)=>{let best=null;for(let p=0;p<=arr.length;p++){const cand=arr.slice(0,p).concat(it,arr.slice(p));const s=tgSim(cand);if(!best||_tgBetter(s,best.s))best={cand,s};}return best;};
  flex.forEach(it=>{items=insertBest(items,it).cand;});
  // Verbesserung: flexible Stopps einzeln herausnehmen und bestmöglich wieder einfügen
  let cur=tgSim(items),imp=true,guard=0;
  while(imp&&guard++<6){imp=false;
    for(let i=0;i<items.length;i++){const it=items[i];if(it.t==='ev'&&it.ev.time!=null)continue;
      const rest=items.slice(0,i).concat(items.slice(i+1));const b=insertBest(rest,it);
      if(_tgBetter(b.s,cur)&&(cur.total-b.s.total>0.5||cur.late-b.s.late>0.5)){items=b.cand;cur=b.s;imp=true;}}
  }
  const res={items,sim:cur};R.cache.set(key,res);return res;
}
let _tg=null,_tgCalc=null;
async function tgCompute(){
  const aud=document.getElementById('tg-aud').value;
  const kw=+document.getElementById('tg-kw').value;
  const days=[...document.querySelectorAll('#tg-days input:checked')].map(x=>+x.value);
  if(!aud){showToast('Auditor wählen');return;}
  if(!days.length){showToast('Mindestens einen Tag wählen');return;}
  const box=document.getElementById('tg-result');
  box.innerHTML='<div style="padding:20px;text-align:center;color:var(--tx2);font-size:13px">🧭 Tourguide rechnet Fahrzeiten und Tagesabläufe…</div>';
  const home=await tgHomeFor(aud);
  if(!home){box.innerHTML='<div style="padding:14px;color:#B45309;font-size:12px">⚠ Keine Startadresse für '+escH(aud)+'. Bitte in «Auditoren verwalten» hinterlegen.</div>';return;}
  const ks=kwToDate(kw);const dayDates=days.map(di=>rpAddDays(ks,di));
  const fixedPlans=dayDates.map(ds=>plans.filter(p=>p.date===ds&&p.auditor===aud).map(p=>data.find(x=>x.id===p.bsId)).filter(e=>e&&e.lat&&e.lng));
  const events=dayDates.map(ds=>tgDayEvents(aud,ds));
  await tgGeocodeEvents(events.flat());
  const noPers=[];
  const cands=tgCandidates(aud,kw,noPers,dayDates);
  const fixedAll=[...new Set(fixedPlans.flat())];
  const evPts=events.flat().filter(ev=>ev.lat&&ev.lng);
  const pool=cands.slice(0,Math.max(0,54-fixedAll.length-evPts.length));
  const pts=[home,...fixedAll.map(e=>({lat:e.lat,lng:e.lng})),...pool.map(x=>({lat:x.e.lat,lng:x.e.lng})),...evPts.map(ev=>({lat:ev.lat,lng:ev.lng}))];
  const{D,src}=await getDurationMatrix(pts);
  const idxFixed=new Map(fixedAll.map((e,i)=>[e.id,i+1]));
  const idxPool=pool.map((_,i)=>i+1+fixedAll.length);
  evPts.forEach((ev,i)=>{ev.node=1+fixedAll.length+pool.length+i;});
  events.flat().forEach(ev=>{if(ev.node===undefined)ev.node=null;});
  const dur=new Map();fixedAll.forEach(e=>dur.set(idxFixed.get(e.id),tgAuditMin(e)));pool.forEach((x,i)=>dur.set(idxPool[i],x.min));
  _tgCalc={D,dur,cache:new Map(),days:dayDates.map((ds,d)=>({ds,events:events[d]}))};
  const dayLen=S('tg_day_hours')*60,maxN=S('tg_max_per_day');
  const fixedNodes=fixedPlans.map(list=>list.map(e=>idxFixed.get(e.id)));
  const base=fixedNodes.map((n,d)=>tgPlanDay(d,n).sim);
  const ok=(d,p)=>p.sim.total<=dayLen+0.5&&p.sim.late<=base[d].late+0.5;
  // Auswahl:
  // 1. Ort ausschöpfen: Rund um alles, was an einem Tag schon feststeht (geplante Baustellen, Termine), werden
  //    zuerst alle roten und orangen Baustellen im Umkreis von tg_harvest_min Minuten Fahrzeit mitgenommen.
  // 2. Danach Ampel-Stufe für Stufe (rot vor orange) die Baustelle mit dem kleinsten Umweg (eine neue Gegend nur,
  //    wenn sie an dem Tag ganz Platz hat, siehe mayOpen); liegen zwei innerhalb
  //    von tg_tie_min Minuten gleichauf, entscheiden Personal-Grösse, bevorzugte Abteilung, Fälligkeit.
  //    Nach jeder neuen Baustelle wird deren Umgebung sofort wieder ausgeschöpft (Schritt 1).
  // So muss man nicht wegen einer einzelnen Baustelle nochmals in dieselbe Gegend fahren.
  let sets=fixedNodes.map(n=>n.slice());
  const remaining=new Set(pool.map((_,i)=>i));
  const near=S('tg_harvest_min'),tie=S('tg_tie_min');
  const dayNodes=d=>[...sets[d],..._tgCalc.days[d].events.filter(ev=>ev.node!=null).map(ev=>ev.node)];
  const minDist=(j,nodes)=>nodes.reduce((m,n)=>Math.min(m,D[j][n]/60,D[n][j]/60),Infinity);
  const tryDay=(i,d)=>{const x=pool[i],j=idxPool[i];if(x.urgDay[d]===null||sets[d].length>=maxN)return null;
    const cur=tgPlanDay(d,sets[d]).sim,p=tgPlanDay(d,sets[d].concat(j));if(!ok(d,p))return null;
    return{i,d,x,score:p.sim.total-cur.total-x.min};};   // Umweg = zusätzliche Fahr-/Wartezeit ohne Auditzeit
  const better=(a,b)=>{if(!b)return true;
    if(a.score<b.score-tie)return true;if(b.score<a.score-tie)return false;   // deutlich kürzerer Umweg gewinnt
    return(a.x.pers-b.x.pers)||((a.x.isPref?0:1)-(b.x.isPref?0:1))||(dl(a.x.e)-dl(b.x.e))||(a.score-b.score)<0;};
  const harvest=d=>{
    for(;;){let best=null;const nodes=dayNodes(d);if(!nodes.length)return;
      remaining.forEach(i=>{if(minDist(idxPool[i],nodes)>near)return;const c=tryDay(i,d);if(c&&better(c,best))best=c;});
      if(!best)return;sets[d].push(idxPool[best.i]);remaining.delete(best.i);}
  };
  // Neue Gegend nur anfangen, wenn ihre roten/orangen Baustellen an diesem Tag ganz Platz haben – ausser die
  // Gegend liegt beim Startort, ist ohnehin zu gross für einen Tag, oder die Baustelle ist schon lange
  // überfällig (tg_force_days, damit nichts ewig liegen bleibt). Sonst später/an einem anderen Tag.
  const mayOpen=(i,d)=>{
    const j=idxPool[i];if(minDist(j,[0,...dayNodes(d)])<=near)return true;
    if(sets.some((_,d2)=>d2!==d&&minDist(j,dayNodes(d2))<=near))return false; // Gegend wird schon an einem anderen Tag besucht – keine 2. Fahrt
    if(-dl(pool[i].e,parseDate(_tgCalc.days[d].ds).getTime())>=S('due_overdue_days')+S('tg_force_days'))return true; // lange überfällig: immer
    const all=[j,...[...remaining].filter(k=>k!==i&&pool[k].urgDay[d]!==null&&minDist(idxPool[k],[j])<=near).map(k=>idxPool[k])];
    if(all.length===1)return true;
    if(sets[d].length+all.length<=maxN&&ok(d,tgPlanDay(d,sets[d].concat(all))))return true;
    return!(all.length<=maxN&&ok(d,tgPlanDay(d,all)));
  };
  sets.forEach((_,d)=>harvest(d));
  [0,1].forEach(cls=>{
    for(;;){
      let best=null;
      remaining.forEach(i=>{sets.forEach((_,d)=>{if(pool[i].urgDay[d]!==cls)return;const c=tryDay(i,d);if(c&&better(c,best)&&mayOpen(i,d))best=c;});});
      if(!best)break;
      sets[best.d].push(idxPool[best.i]);remaining.delete(best.i);
      harvest(best.d);
    }
  });
  const skipped=pool.filter((_,i)=>remaining.has(i));
  // Ausgleich zwischen den Tagen (neue Baustellen verschieben/tauschen), bereits geplante bleiben.
  // Eine Baustelle wird nicht von ihren Nachbarn (Umkreis) weg auf einen anderen Tag verschoben.
  const fixedSet=new Set(fixedNodes.flat());
  const cost=ss=>{let mx=0,sum=0;for(let d=0;d<ss.length;d++){if(ss[d].length>maxN)return Infinity;const p=tgPlanDay(d,ss[d]);if(!ok(d,p))return Infinity;mx=Math.max(mx,p.sim.total);sum+=p.sim.total;}return mx*3+sum;};
  const evNodes=_tgCalc.days.map(dd=>dd.events.filter(ev=>ev.node!=null).map(ev=>ev.node));
  const hasNb=(j,list,d)=>minDist(j,[...list.filter(x=>x!==j),...evNodes[d]])<=near;
  const mayMove=(j,a,b)=>!hasNb(j,sets[a],a)||hasNb(j,sets[b],b);
  let cur=cost(sets),t0=Date.now(),imp=true;
  while(imp&&Date.now()-t0<5000){imp=false;
    for(let a=0;a<sets.length&&!imp;a++)for(let b=0;b<sets.length&&!imp;b++){if(a===b)continue;
      for(const j of sets[a]){if(fixedSet.has(j)||!mayMove(j,a,b))continue;const s2=sets.slice();s2[a]=sets[a].filter(x=>x!==j);s2[b]=sets[b].concat(j);const v=cost(s2);if(v<cur-1){sets=s2;cur=v;imp=true;break;}}
      if(!imp)for(const j of sets[a]){if(fixedSet.has(j)||imp||!mayMove(j,a,b))continue;for(const k of sets[b]){if(fixedSet.has(k)||!mayMove(k,b,a))continue;
        const s2=sets.slice();s2[a]=sets[a].map(x=>x===j?k:x);s2[b]=sets[b].map(x=>x===k?j:x);const v=cost(s2);if(v<cur-1){sets=s2;cur=v;imp=true;break;}}}}}
  _tg={aud,kw,days,dayDates,src,sets,fixedIds:fixedSet,removed:new Set(),remaining:skipped,noPers,home,
    leftPool:pool.map((x,i)=>({x,j:idxPool[i]})).filter(o=>remaining.has(pool.indexOf(o.x))),
    urgOf:new Map(pool.map((x,i)=>[idxPool[i],x.urgDay])),
    nodeEntry:new Map([...fixedAll.map(e=>[idxFixed.get(e.id),e]),...pool.map((x,i)=>[idxPool[i],x.e])]),prefOf:new Map(pool.map((x,i)=>[idxPool[i],x.isPref]))};
  tgRender();
}
function tgRender(){
  const R=_tg,C=_tgCalc;const names=['Mo','Di','Mi','Do','Fr'];
  const fmt=m=>{m=Math.round(m);return Math.floor(m/60)+':'+String(m%60).padStart(2,'0')+' h';};
  const stCol={overdue:'#EF4444',due:'#F59E0B',soon:'#EAB308',new:'#7C3AED'};
  const dayLen=S('tg_day_hours')*60;
  let newCount=0;
  let h=`<div style="font-size:10px;color:${R.src==='ors'?'#10B981':'#F59E0B'};margin-bottom:8px">${R.src==='ors'?'✓ Fahrzeiten über Strassennetz':'⚠ Fahrzeiten geschätzt (Luftlinie)'} · Rundtour ab/bis Startadresse · Arbeitstag ${String(S('tg_day_hours')).replace('.',',')} h · Tagesbeginn ${tgHM(S('tg_day_start')*60)}${S('tg_lunch_dur')>0?` · Mittag ${tgHM(S('tg_lunch_start')*60)}–${tgHM(S('tg_lunch_start')*60+S('tg_lunch_dur'))}`:''}</div>`;
  R.sets.forEach((set,d)=>{
    const active=set.filter(j=>!R.removed.has(j));
    const P=tgPlanDay(d,active),sim=P.sim;
    const leftHtml=tgLeftNearHTML(d,active)+tgOthersNearHTML(d,active);
    const workMin=sim.aud+sim.evt;
    const econHtml=active.length&&sim.drive>workMin+0.5?`<div style="font-size:11px;color:#B45309;margin-bottom:6px">⚠ Wenig wirtschaftlich: ${fmt(sim.drive)} Fahrt für ${fmt(workMin)} Audits/Termine – Tag evtl. frei lassen oder anders kombinieren.</div>`:'';
    newCount+=active.filter(j=>!R.fixedIds.has(j)).length;
    const bsN=active.length;
    h+=`<div style="margin-bottom:10px;padding:10px 12px;background:var(--sf2);border-radius:10px;border-left:3px solid var(--blue)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;gap:8px;flex-wrap:wrap">
        <span style="font-size:13px;font-weight:700;color:var(--blue)">${names[R.days[d]]} ${fd(C.days[d].ds)} · ${bsN} Baustellen</span>
        <span style="font-size:12px;font-weight:700;color:${sim.total>dayLen?'#EF4444':'var(--tx)'}">${P.items.length?`🏠 ${tgHM(sim.start)} → 🏠 ${tgHM(sim.end)} · `:''}≈ ${fmt(sim.total)} / ${fmt(dayLen)}</span>
      </div>
      <div style="height:6px;background:var(--bd);border-radius:3px;overflow:hidden;display:flex;margin-bottom:3px">
        <div style="width:${sim.drive/dayLen*100}%;background:#F59E0B" title="Fahrzeit"></div><div style="width:${sim.aud/dayLen*100}%;background:#3B82F6" title="Audits"></div><div style="width:${sim.evt/dayLen*100}%;background:#0EA5E9" title="Termine"></div><div style="width:${sim.wait/dayLen*100}%;background:repeating-linear-gradient(45deg,#CBD5E1,#CBD5E1 3px,transparent 3px,transparent 6px)" title="Wartezeit"></div>
      </div>
      <div style="font-size:10px;color:var(--tx3);margin-bottom:6px">🚗 ${fmt(sim.drive)} · 🏗️ ${fmt(sim.aud)}${sim.evt?` · 📋 ${fmt(sim.evt)} Termine`:''}${sim.wait>1?` · ⏳ ${fmt(sim.wait)} Wartezeit`:''}${sim.lunch?` · 🍽 ${fmt(sim.lunch)} Mittag (nicht in der Arbeitszeit)`:''}</div>
      ${econHtml}
      ${sim.late>0.5?`<div style="font-size:11px;color:#DC2626;margin-bottom:6px">⚠ Ein Termin ist so nicht rechtzeitig erreichbar (${Math.round(sim.late)} min zu spät) – bitte Termin oder Tag prüfen.</div>`:''}
      ${P.items.map((it,ii)=>{const sc=sim.sched[ii];const lunchRow=sim.lunch>0&&sim.lunchAt===ii?tgLunchRow():'';const time=`<span style="font-size:10px;color:var(--tx3);width:74px;flex-shrink:0;font-variant-numeric:tabular-nums">${tgHM(sc.start)}–${tgHM(sc.end)}</span>`;
        if(it.t==='ev'){const ev=it.ev;return lunchRow+`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px;border-top:1px solid var(--bd)">${time}
          <span style="flex:1;min-width:0">${ev.icon} <b>${escH(ev.label)}</b>${ev.time!=null?` <span style="font-size:10px;color:${sc.late>0.5?'#DC2626':'#0369A1'}">(fix ${tgHM(ev.time)}${sc.late>0.5?', '+Math.round(sc.late)+' min zu spät':''})</span>`:''}${ev.sub?` <span style="font-size:10px;color:var(--tx3)">· ${escH(ev.sub)}</span>`:''}${ev.node==null&&ev.kind==='rp'?' <span style="font-size:10px;color:#B45309">(ohne Adresse – keine Fahrzeit)</span>':''}</span>
          <span style="font-size:10px;color:var(--tx3);white-space:nowrap">${ev.dur} min</span></div>`;}
        const j=it.node,e=R.nodeEntry.get(j),fixed=R.fixedIds.has(j),ud=(R.urgOf.get(j)||[])[d],s=ud===0?'overdue':ud===1?'due':status(e);
        return lunchRow+`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px;border-top:1px solid var(--bd)">${time}
          <span style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${fixed?'#6366F1':stCol[s]||'#10B981'}"></span>
          <span style="flex:1;min-width:0">${bsLabel(e)}${R.prefOf.get(j)?' <span style="color:#10B981" title="Bevorzugte Abteilung">★</span>':''}${fixed?' <span style="font-size:10px;color:#6366F1">(bereits geplant)</span>':''}</span>
          <span style="font-size:10px;color:var(--tx3);white-space:nowrap">${C.dur.get(j)} min${e.zeitbedarf?' fix':''}</span>
          ${fixed?'':`<select onchange="tgMove(${j},+this.value)" style="font-size:10px;padding:1px 3px;border:1px solid var(--bd);border-radius:4px;background:var(--sf);color:var(--tx2)">${R.days.map((di,dd)=>`<option value="${dd}"${dd===d?' selected':''}>${names[di]}</option>`).join('')}</select>
          <button onclick="tgToggle(${j})" title="Entfernen" style="background:none;border:none;cursor:pointer;font-size:12px;color:#EF4444">✕</button>`}
        </div>`;}).join('')+(sim.lunch>0&&sim.lunchAt===P.items.length&&P.items.length?tgLunchRow():'')||`<div style="font-size:11px;color:var(--tx3);padding:4px 0">${R.remaining.length?'Nichts eingeplant – die übrigen Baustellen passen zeitlich besser auf andere Tage.':'Tag bleibt frei – keine weiteren fälligen Baustellen. Die übrigen Tage sind so effizienter (weniger Anfahrten).'}</div>`}
      ${leftHtml}
      ${set.filter(j=>R.removed.has(j)).map(j=>`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px;border-top:1px solid var(--bd);opacity:.45"><span style="width:74px"></span><span style="flex:1;text-decoration:line-through">${bsLabel(R.nodeEntry.get(j))}</span><button onclick="tgToggle(${j})" title="Wieder aufnehmen" style="background:none;border:none;cursor:pointer;font-size:12px;color:#10B981">↺</button></div>`).join('')}
    </div>`;
  });
  if(R.remaining.length)h+=`<details style="margin-top:4px;font-size:11px;color:var(--tx2)"><summary style="cursor:pointer">Weitere rote/orange Baustellen, nicht eingeplant (${R.remaining.length}) – kein Platz mehr, oder ihre Gegend passt an keinem gewählten Tag ganz hinein</summary>
    ${R.remaining.slice(0,25).map(x=>`<div style="padding:3px 0;border-top:1px solid var(--bd)">${bsLabel(x.e)} · ${x.min} min</div>`).join('')}</details>`;
  if(R.noPers&&R.noPers.length){
    const rows=R.noPers.sort((a,b)=>tgUrgency(a.e)-tgUrgency(b.e)||dl(a.e)-dl(b.e));
    h+=`<details style="margin-top:8px;padding:8px 10px;background:#FFFBEB;border:1px solid #FCD34D;border-radius:8px;font-size:11px;color:#92400E"><summary style="cursor:pointer;font-weight:600">⚠ ${rows.length} fällige Baustelle(n) nicht berücksichtigt – kein aktuelles Personal bekannt</summary>
      <div style="margin:6px 0;color:var(--tx2)">Tourguide plant nur Baustellen mit bekanntem Personal vor Ort (Angabe höchstens ${S('tg_pers_max_age')} Wochen alt). Personal trägst du im Detail-Panel (✏️ bei «Personal») oder unter Admin → «Personal manuell erfassen» ein.</div>
      ${rows.slice(0,40).map(x=>`<div style="padding:3px 0;border-top:1px solid #FDE68A;display:flex;justify-content:space-between;gap:8px"><span>${bsLabel(x.e)}</span><span style="white-space:nowrap;color:var(--tx3)">${x.state==='stale'?'Angabe KW '+x.e.lastPersonalKW+' (zu alt)':'keine Angabe'}</span></div>`).join('')}</details>`;
  }
  document.getElementById('tg-result').innerHTML=h;
  const btn=document.getElementById('tg-apply');btn.style.display=newCount?'':'none';btn.textContent=`✓ ${newCount} Baustellen einplanen`;
}
// Hinweis unter einem Tag: Baustellen im Umkreis, die (noch) nicht eingeplant sind
function tgLeftNearHTML(d,active){
  const R=_tg,C=_tgCalc,near=S('tg_harvest_min');
  const nodes=[...active,...C.days[d].events.filter(ev=>ev.node!=null).map(ev=>ev.node)];
  if(!nodes.length)return'';
  const planned=new Set(R.sets.flat().filter(j=>!R.removed.has(j)));
  const dist=j=>nodes.reduce((m,n)=>Math.min(m,C.D[j][n]/60,C.D[n][j]/60),Infinity);
  const rows=[];
  (R.leftPool||[]).forEach(o=>{if(planned.has(o.j)||o.x.urgDay[d]===null)return;const m=dist(o.j);if(m<=near)rows.push({e:o.x.e,m,j:o.j});});
  // Ohne aktuelles Personal: nur zur Info (kein Audit ohne Personal) – Distanz geschätzt (Luftlinie)
  const pts=nodes.map(n=>n===0?R.home:(R.nodeEntry.get(n)||C.days[d].events.find(ev=>ev.node===n)||{})).filter(p=>p&&p.lat);
  const est=e=>pts.reduce((m,p)=>Math.min(m,haversine(p.lat,p.lng,e.lat,e.lng)*1.35/50*60),Infinity);
  const info=(R.noPers||[]).filter(o=>tgUrgency(o.e,C.days[d].ds)<=1&&o.e.lat&&est(o.e)<=near);
  if(!rows.length&&!info.length)return'';
  return`<div style="margin-top:6px;padding:6px 8px;background:#FFFBEB;border:1px solid #FCD34D;border-radius:6px;font-size:11px;color:#92400E">
    <b>⚠ Ort nicht ausgeschöpft</b> – im Umkreis von ${near} min bleiben offen:
    ${rows.map(r=>`<div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-top:1px solid #FDE68A"><span style="flex:1">${bsLabel(r.e)} · ${Math.round(r.m)} min entfernt · kein Platz mehr</span><button type="button" onclick="tgAddLeft(${r.j},${d})" style="font-size:10px;padding:2px 6px;border:1px solid #F59E0B;border-radius:4px;background:#fff;color:#92400E;cursor:pointer">+ trotzdem hinzufügen</button></div>`).join('')}
    ${info.map(o=>`<div style="padding:3px 0;border-top:1px solid #FDE68A">${bsLabel(o.e)} · Personal ${o.state==='stale'?'veraltet (KW '+o.e.lastPersonalKW+')':'unbekannt'} – erst Personal erfassen</div>`).join('')}
  </div>`;
}
// Hinweis: andere Auditoren sind an diesem Tag in der Nähe (geschätzt per Luftlinie)
function tgOthersNearHTML(d,active){
  const R=_tg,C=_tgCalc,near=S('tg_harvest_min'),ds=C.days[d].ds;
  const mine=active.map(j=>R.nodeEntry.get(j)).filter(e=>e&&e.lat);
  if(!mine.length)return'';
  const est=(a,b)=>haversine(a.lat,a.lng,b.lat,b.lng)*1.35/50*60;
  const hits=new Map();
  plans.filter(p=>p.date===ds&&p.auditor!==R.aud).forEach(p=>{
    const o=data.find(x=>x.id===p.bsId);if(!o||!o.lat)return;
    let best=null;mine.forEach(e=>{const m=est(e,o);if(m<=near&&(!best||m<best.m))best={m,e};});
    if(best){const l=hits.get(p.auditor)||[];l.push({o,...best});hits.set(p.auditor,l);}
  });
  if(!hits.size)return'';
  return`<div style="margin-top:6px;padding:6px 8px;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;font-size:11px;color:#1E40AF">
    ${[...hits].map(([a,l])=>`👥 <b>${escH(a)}</b> ist an diesem Tag auch in der Nähe: ${l.slice(0,3).map(h=>`${escH(h.o.name)} (ca. ${Math.round(h.m)} min von ${escH(h.e.name)})`).join(', ')}${l.length>3?` +${l.length-3}`:''}`).join('<br>')}
    <div style="color:var(--tx3);margin-top:2px">Evtl. absprechen, wer die Gegend übernimmt.</div></div>`;
}
function tgAddLeft(j,d){const R=_tg;R.sets=R.sets.map(s=>s.filter(x=>x!==j));R.sets[d].push(j);R.removed.delete(j);R.remaining=R.remaining.filter(x=>x.e!==R.nodeEntry.get(j));tgRender();}
function tgLunchRow(){const ls=S('tg_lunch_start')*60;return`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px;border-top:1px solid var(--bd);color:var(--tx3)"><span style="font-size:10px;width:74px;flex-shrink:0;font-variant-numeric:tabular-nums">${tgHM(ls)}–${tgHM(ls+S('tg_lunch_dur'))}</span><span style="flex:1">🍽 Mittagspause</span></div>`;}
function tgMove(j,toD){const R=_tg;R.sets=R.sets.map(s=>s.filter(x=>x!==j));R.sets[toD].push(j);tgRender();}
function tgToggle(j){const R=_tg;if(R.removed.has(j))R.removed.delete(j);else R.removed.add(j);tgRender();}
function tgApply(){
  const R=_tg;if(!R)return;let n=0;
  R.sets.forEach((set,d)=>set.forEach(j=>{
    if(R.fixedIds.has(j)||R.removed.has(j))return;
    const e=R.nodeEntry.get(j),ds=_tgCalc.days[d].ds;
    if(plans.some(p=>p.bsId===e.id&&p.date===ds))return;
    plans.push({bsId:e.id,auditor:R.aud,date:ds,id:Date.now()+Math.random()});n++;
  }));
  plans.sort((a,b)=>a.date.localeCompare(b.date));
  saveNow();renderAll();if(curView==='cal')renderKW();
  document.getElementById('tg-bg').style.display='none';
  log('🧭 Tourguide: '+n+' Baustellen eingeplant','KW '+R.kw,'#3B82F6','');
  showToast(`🧭 ${n} Baustellen in KW ${R.kw} eingeplant`,3000);
}
function tgUpdateDays(){
  const aud=document.getElementById('tg-aud').value,kw=+document.getElementById('tg-kw').value;
  const names=['Mo','Di','Mi','Do','Fr'];
  document.querySelectorAll('#tg-days input').forEach(cb=>{
    const ds=rpAddDays(kwToDate(kw),+cb.value);const fer=distIsFerien(aud,ds);
    if(fer){cb.checked=false;cb.disabled=true;}else cb.disabled=false;
    cb.parentElement.style.opacity=fer?'.45':'1';
    cb.parentElement.querySelector('.dd-lbl').textContent=names[+cb.value]+(fer?' 🌴':'');
  });
  const m=auditorMeta[aud]||{};
  const _inf=document.getElementById('tg-info');
  _inf.title=[`Startadresse: ${(aud===currentUser&&localStorage.getItem('audit_start'))||m.home||'–'}`,(m.prefDepts||[]).length?'★ Bevorzugt: '+m.prefDepts.join(', '):'',(m.exclDepts||[]).length?'⛔ Ausgeschlossen: '+m.exclDepts.join(', '):''].filter(Boolean).join('\n');
  _inf.innerHTML=`Startadresse: <b>${escH((aud===currentUser&&localStorage.getItem('audit_start'))||m.home||'– nicht hinterlegt –')}</b>${(m.prefDepts||[]).length?` · ★ ${m.prefDepts.map(escH).join(', ')}`:''}${(m.exclDepts||[]).length?` · ⛔ ${m.exclDepts.map(escH).join(', ')}`:''}`;
  document.getElementById('tg-result').innerHTML='';document.getElementById('tg-apply').style.display='none';
}
function openTourguide(){
  const isAdmin=document.body.classList.contains('admin-mode');
  const sel=document.getElementById('tg-aud');
  const list=isAdmin?auditors:[currentUser].filter(Boolean);
  sel.innerHTML=list.map(a=>`<option value="${escH(a)}"${a===currentUser?' selected':''}>${escH(a)}</option>`).join('');
  sel.disabled=!isAdmin;
  const kwSel=document.getElementById('tg-kw');const cur=dateToKW(today());
  kwSel.innerHTML=[0,1,2,3,4].map(i=>`<option value="${cur+i}">KW ${cur+i}${i===1?' (nächste)':''}</option>`).join('');
  kwSel.value=String(typeof getStickyPlanKW==='function'?getStickyPlanKW():cur+1);
  document.getElementById('tg-desc').textContent=`Sag mir, an welchen Tagen du Zeit hast – ich stelle dir pro Tag bis zu ${S('tg_max_per_day')} rote und orange Baustellen zusammen: Wo du schon hinfährst, nehme ich alle fälligen Baustellen im Umkreis von ${S('tg_harvest_min')} min mit. Eine neue Gegend fange ich nur an, wenn sie an dem Tag ganz Platz hat. Max. ${String(S('tg_day_hours')).replace('.',',')} h inkl. Fahrzeit. Bereits Geplantes bleibt und wird aufgefüllt.`;
  document.getElementById('tg-bg').style.display='flex';
  tgUpdateDays();initStickyFooters();
}
// ═══ TOURGUIDE: Hilfsfunktionen Auditor-Einstellungen ═══
function tgChipStyle(st){
  const base='display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:12px;font-size:11px;cursor:pointer;user-select:none;';
  return base+(st==='pref'?'background:#D1FAE5;border:1px solid #10B981;color:#065F46;font-weight:600':st==='excl'?'background:#FEE2E2;border:1px solid #EF4444;color:#991B1B;text-decoration:line-through':'background:var(--sf2);border:1px solid var(--bd);color:var(--tx2)');
}
function tgChipLbl(st){return st==='pref'?'★ ':st==='excl'?'⛔ ':'';}
function tgCycleDept(el){
  const nx={'':'pref',pref:'excl',excl:''}[el.dataset.st||''];
  el.dataset.st=nx;el.setAttribute('style',tgChipStyle(nx));
  el.textContent=tgChipLbl(nx)+el.dataset.d;
}
async function tgGeocodeHome(aud,addr){
  try{
    const r=await fetch(`https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(addr)}&type=locations&limit=1&sr=4326&lang=de`);
    const d=await r.json();const a=d.results&&d.results[0]&&d.results[0].attrs;
    if(a&&auditorMeta[aud]){auditorMeta[aud].homeLat=a.lat;auditorMeta[aud].homeLng=a.lon;saveAudMeta();}
    else showToast('⚠ Startadresse von '+aud+' nicht gefunden',3000);
  }catch(e){}
}
// Startadresse für die Planung: eigenes Gerät (falls gesetzt) hat Vorrang, sonst Einstellung beim Auditor
async function tgHomeFor(aud){
  if(aud===currentUser){const h=await getHomeCoords();if(h)return h;}
  const m=auditorMeta[aud]||{};
  if(m.homeLat&&m.homeLng)return{lat:m.homeLat,lng:m.homeLng};
  if(m.home){await tgGeocodeHome(aud,m.home);const m2=auditorMeta[aud]||{};if(m2.homeLat)return{lat:m2.homeLat,lng:m2.homeLng};}
  return null;
}
// ═══ PERSONAL MANUELL ERFASSEN ═══
// Für Einheiten ohne (brauchbare) Einsatzliste. Wirkt wie ein Import-Wert: Detail-Panel, Verlauf, Trend,
// Tourguide (Dauer, Priorität, «Personal vor Ort»). Ein Wert für dieselbe KW wird ersetzt.
// Ändert nichts am Status der Baustelle (kein Pausieren/Reaktivieren).
// Personalwert für eine bestimmte KW: aus dem Verlauf, sonst aus dem «letzten Wert», falls dieser zu genau dieser KW gehört
// (ältere Importe vor Einführung des Verlaufs haben nur letzten Wert + KW).
function persForKW(e,kw,yr){
  const h=(e.personalHistory||[]).find(x=>x.kw===kw&&x.year===yr);
  if(h)return{count:h.count,manual:!!h.manual};
  if(e.lastPersonalKW===kw&&e.lastPersonalCount!==undefined&&e.lastPersonalCount!==null&&persYear(e)===yr)return{count:e.lastPersonalCount,manual:false};
  return null;
}
// Einmalige Ergänzung: Verlauf um den «letzten Wert» ergänzen, falls dort noch nicht enthalten
function ensurePersonalHistory(){
  let n=0;
  data.forEach(e=>{
    if(e.lastPersonalKW===undefined||e.lastPersonalCount===undefined||e.lastPersonalCount===null)return;
    const yr=persYear(e);
    if((e.personalHistory||[]).some(h=>h.kw===e.lastPersonalKW&&h.year===yr))return;
    e.personalHistory=(e.personalHistory||[]);
    e.personalHistory.push({kw:e.lastPersonalKW,year:yr,count:e.lastPersonalCount});
    e.personalHistory.sort((a,b)=>a.year-b.year||a.kw-b.kw);n++;
  });
  if(n)setTimeout(()=>{try{saveNow();}catch(x){}},900);
}
function pmYearFor(kw){
  const cur=dateToKW(today()),y=new Date().getFullYear();
  if(kw-cur>40)return y-1;if(cur-kw>40)return y+1;return y;
}
function recordPersonalManual(e,kw,yr,count){
  e.personalHistory=(e.personalHistory||[]).filter(h=>!(h.kw===kw&&h.year===yr));
  e.personalHistory.push({kw,year:yr,count,manual:true});
  e.personalHistory.sort((a,b)=>a.year-b.year||a.kw-b.kw);
  const maxW=S('pi_history_weeks');
  if(e.personalHistory.length>maxW)e.personalHistory=e.personalHistory.slice(-maxW);
  const last=e.personalHistory[e.personalHistory.length-1];   // neuester Eintrag bestimmt den «letzten Wert»
  e.lastPersonalKW=last.kw;e.lastPersonalCount=last.count;
}
function pmKwOptions(sel){
  const cur=dateToKW(today());
  return[-4,-3,-2,-1,0,1,2,3,4].map(i=>{const k=cur+i;return`<option value="${k}"${k===(sel??cur)?' selected':''}>KW ${k}${i===0?' (aktuell)':i===1?' (nächste)':''}</option>`;}).join('');
}
// --- einzelne Baustelle (Detail-Panel) ---
let _pmId=null;
function openPersonalManual(id){
  const e=data.find(x=>x.id===id);if(!e)return;_pmId=id;
  document.getElementById('pm-name').innerHTML=bsLabel(e);
  document.getElementById('pm-kw').innerHTML=pmKwOptions();
  pmFill();
  document.getElementById('pm-bg').style.display='flex';
  setTimeout(()=>{const i=document.getElementById('pm-cnt');i.focus();i.select();},50);
}
function pmFill(){
  const e=data.find(x=>x.id===_pmId);if(!e)return;
  const kw=+document.getElementById('pm-kw').value,yr=pmYearFor(kw);
  const h=persForKW(e,kw,yr);
  document.getElementById('pm-cnt').value=h?h.count:'';
  document.getElementById('pm-hint').textContent=h?`Vorhandener Wert (${h.manual?'manuell':'Import'}): ${h.count} – wird ersetzt.`:'Für diese KW ist noch kein Wert vorhanden.';
}
function savePersonalManual(){
  const e=data.find(x=>x.id===_pmId);if(!e)return;
  const v=document.getElementById('pm-cnt').value.trim();
  if(v===''||isNaN(+v)||+v<0){showToast('Bitte eine Personenzahl (0 oder mehr) eingeben');return;}
  const kw=+document.getElementById('pm-kw').value,n=Math.round(+v);
  recordPersonalManual(e,kw,pmYearFor(kw),n);
  saveNow();renderAll();if(document.getElementById('dp')&&e.id===selId)selEntry(e.id);
  document.getElementById('pm-bg').style.display='none';
  showToast(n===0?`✓ KW ${kw}: 0 Personen gespeichert – Tourguide schlägt die Baustelle nicht mehr vor`:`✓ KW ${kw}: ${n} Personen gespeichert`,3200);
}
// --- mehrere Baustellen einer Abteilung (Admin-Menü) ---
function openPersonalBulk(){
  const sel=document.getElementById('pmb-dept');
  const cur=sel.value;
  sel.innerHTML=getAllDepts().map(d=>`<option value="${escH(d)}">${escH(d)}</option>`).join('');
  if(cur)sel.value=cur;
  document.getElementById('pmb-kw').innerHTML=pmKwOptions();
  renderPersonalBulk();
  document.getElementById('pmb-bg').style.display='flex';
}
function renderPersonalBulk(){
  const dept=document.getElementById('pmb-dept').value,kw=+document.getElementById('pmb-kw').value,yr=pmYearFor(kw);
  const list=data.filter(e=>e.active&&e.type!=='werkhof'&&deptParts(e.dept).includes(dept)).sort((a,b)=>(a.psp||'~').localeCompare(b.psp||'~')||a.name.localeCompare(b.name));
  document.getElementById('pmb-list').innerHTML=list.length?list.map(e=>{
    const h=persForKW(e,kw,yr);
    const lastTxt=e.lastPersonalKW!==undefined?`zuletzt KW ${e.lastPersonalKW}: ${e.lastPersonalCount}`:'noch keine Angabe';
    return`<div style="display:flex;align-items:center;gap:10px;padding:6px 10px;border-bottom:1px solid var(--bd)">
      <span style="flex:1;min-width:0;font-size:12px">${bsLabel(e)}${e.paused?'':''}<div style="font-size:10px;color:var(--tx3)">${lastTxt}${h?` · KW ${kw}: <b>${h.count}</b>${h.manual?' (manuell)':''}`:''}</div></span>
      <input type="number" min="0" step="1" data-id="${e.id}" data-old="${h?h.count:''}" value="${h?h.count:''}" placeholder="–" style="width:80px;padding:6px 8px;border:1px solid var(--bd);border-radius:6px;background:var(--sf2);color:var(--tx);font-size:13px;text-align:right">
    </div>`;}).join(''):'<div style="padding:14px;font-size:12px;color:var(--tx3)">Keine aktiven Baustellen in dieser Abteilung.</div>';
}
function savePersonalBulk(){
  const kw=+document.getElementById('pmb-kw').value,yr=pmYearFor(kw);let n=0,zeros=0;
  document.querySelectorAll('#pmb-list input[data-id]').forEach(inp=>{
    const v=inp.value.trim();if(v===''||isNaN(+v)||+v<0)return;
    if(v===inp.dataset.old)return;                       // unverändert
    const e=data.find(x=>x.id===+inp.dataset.id);if(!e)return;
    recordPersonalManual(e,kw,yr,Math.round(+v));n++;if(+v===0)zeros++;
  });
  if(!n){showToast('Keine Änderungen eingegeben');return;}
  saveNow();renderAll();
  document.getElementById('pmb-bg').style.display='none';
  showToast(`✓ Personal KW ${kw} für ${n} Baustelle(n) gespeichert${zeros?` (${zeros}× 0 Personen – nicht für Tourguide)`:''}`,3500);
}
// ═══ PERSONALVERLAUF (aus den wöchentlichen Personal-Importen) ═══
function personalTrend(e){
  const h=e.personalHistory||[];if(h.length<2)return null;
  const last=h[h.length-1].count,prev=h[h.length-2].count;
  if(last>prev)return{sym:'↗',col:'#10B981',txt:`hochfahrend (${prev} → ${last})`};
  if(last<prev)return{sym:'↘',col:'#F59E0B',txt:`abnehmend (${prev} → ${last})`};
  return{sym:'→',col:'#94A3B8',txt:`gleichbleibend (${last})`};
}
let _phistOpen=false;
function renderPersonalHistory(e){
  const el=document.getElementById('dp-phist');if(!el)return;
  const h=(e.personalHistory||[]).slice(-26);
  if(!h.length){el.style.display='none';return;}
  el.style.display='';
  const max=Math.max(1,...h.map(x=>x.count));
  const tr=personalTrend(e);
  const bars=h.map(x=>`<div title="KW ${x.kw}/${x.year}: ${x.count} Pers." style="flex:1;min-width:4px;display:flex;flex-direction:column;justify-content:flex-end;height:100%">
      <div style="height:${Math.max(2,x.count/max*100)}%;background:${x.count?'#3B82F6':'rgba(148,163,184,.5)'};border-radius:2px 2px 0 0"></div></div>`).join('');
  el.innerHTML=`<div onclick="_phistOpen=!_phistOpen;renderPersonalHistory(data.find(x=>x.id===${e.id}))" style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;cursor:pointer;font-size:11px;color:rgba(255,255,255,.75)">
      <span>📈 Personalverlauf <span style="color:rgba(255,255,255,.45)">(${h.length} Wochen)</span>${tr?` <span style="color:${tr.col};font-weight:700" title="${tr.txt}">${tr.sym}</span>`:''}</span>
      <span>${_phistOpen?'▾':'▸'}</span></div>
    ${_phistOpen?`<div style="display:flex;align-items:flex-end;gap:2px;height:70px;padding:4px 0">${bars}</div>
      <div style="display:flex;justify-content:space-between;font-size:9px;color:rgba(255,255,255,.45);padding-bottom:6px"><span>KW ${h[0].kw}</span><span>max ${max} Pers.</span><span>KW ${h[h.length-1].kw}</span></div>`:''}`;
}
// ═══ EINHEITLICHE BAUSTELLEN-BESCHRIFTUNG: PSP · Name · Abteilung ═══
function escH(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function bsLabelText(e){return[e.psp,e.name,e.dept].filter(Boolean).join(' · ');}
function bsLabel(e){
  if(!e)return'';
  return`${e.psp?`<b style="font-variant-numeric:tabular-nums">${escH(e.psp)}</b> · `:''}${escH(e.name)}${e.dept?` <span style="color:var(--tx3);font-size:11px">· ${escH(e.dept)}</span>`:''}${e.active===false?' <span style="font-size:10px;color:#94A3B8">(inaktiv)</span>':e.paused?' <span style="font-size:10px;color:#94A3B8">(pausiert)</span>':''}`;
}
// Listen-Eintrag (aus der Einsatzliste) – PSP · Name · Einheit
// Listen-Herkunft eines Import-Eintrags: bei mehreren Einsatzlisten jede Quelle mit Personenzahl,
// sonst die Listenzeile nur dann, wenn nicht eindeutig über die PSP erkannt.
function piSourcesHTML(it){
  if(!it||!it.match)return'';
  const src=it.sources||[it];
  if(src.length>1)return`<div style="font-size:10px;color:#0369A1;margin-top:2px">🔗 ${src.length} Listen zusammengezählt:</div>`+src.map(s=>`<div style="font-size:10px;color:var(--tx3);margin-left:10px">📄 ${listLabel(s)} · <b>${s.count} Pers.</b></div>`).join('');
  if(it.match.how!=='psp')return`<div style="font-size:10px;color:var(--tx3);margin-top:1px">📄 Liste: ${listLabel(it)}</div>`;
  return'';
}
// Rhythmus-Beschriftung für JEDEN Wert: 7 → «1W», 14 → «2W», 28 → «4W» … 182 → «6M»; lang: «1 Woche», «4 Wochen», «6 Monate».
// Werte, die weder ganze Wochen noch ganze Monate sind (z.B. 10), erscheinen als «10T» / «10 Tage».
function rhLabel(d,long){
  d=+d||0;if(!d)return'–';
  if(d%7===0&&d<=105){const w=d/7;return long?`${w} ${w===1?'Woche':'Wochen'}`:`${w}W`;}
  if(d>=170&&d<=190){return long?'6 Monate':'6M';}
  if(d>=28&&d%30===0){const m=d/30;return long?`${m} Monate`:`${m}M`;}
  return long?`${d} Tage`:`${d}T`;
}
// PSP-Präfix für Karten (fett, gleichbreite Ziffern) und Personal-Anzeige fürs Handy
function pspPre(psp){return psp?`<span style="font-weight:700;font-variant-numeric:tabular-nums">${escH(psp)}</span> · `:'';}
function mobPersHTML(e){
  if(!e||e.lastPersonalKW===undefined)return'';
  const t=personalTrend(e);
  return`<span style="display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:600;color:${e.lastPersonalCount?'var(--tx2)':'#B45309'};background:var(--sf2);border:1px solid var(--bd);border-radius:10px;padding:1px 7px">👷 ${e.lastPersonalCount} Pers.<span style="font-weight:400;color:var(--tx3)"> KW ${e.lastPersonalKW}</span>${t?`<span style="color:${t.col};font-weight:700" title="${t.txt}">${t.sym}</span>`:''}</span>`;
}
function listLabel(it){return`${it.psp?`<b style="font-variant-numeric:tabular-nums">${escH(it.psp)}</b> · `:''}${escH(it.name)}${it.quelle?` <span style="color:var(--tx3);font-size:11px">· ${escH(it.quelle)}</span>`:''}`;}
// Auswahlliste aller Baustellen, nach Abteilung gruppiert, Option = «PSP · Name · Abteilung»
function bsOptionsHTML(){
  const act=data.filter(e=>e.active!==false),ina=data.filter(e=>e.active===false);
  const byDept={};act.forEach(e=>{const d=e.dept||'Ohne Abteilung';(byDept[d]=byDept[d]||[]).push(e);});
  const sortE=(a,b)=>(a.psp||'~').localeCompare(b.psp||'~')||a.name.localeCompare(b.name);
  return Object.keys(byDept).sort().map(d=>`<optgroup label="${escH(d)}">${byDept[d].sort(sortE).map(e=>`<option value="${e.id}">${escH(bsLabelText(e))}${e.paused?' (pausiert)':''}</option>`).join('')}</optgroup>`).join('')+
    (ina.length?`<optgroup label="— inaktive Baustellen —">${ina.sort(sortE).map(e=>`<option value="${e.id}">${escH(bsLabelText(e))} (inaktiv)</option>`).join('')}</optgroup>`:'');
}
// Suchfeld + Auswahl: Tippen filtert (PSP, Name oder Abteilung, mehrere Wörter); bei genau 1 Treffer wird er gewählt
function bsPickerHTML(selId,extraStyle){
  return`<span style="display:inline-flex;flex-direction:column;gap:3px;${extraStyle||''}">
    <input type="text" placeholder="🔍 PSP, Name oder Abteilung…" oninput="bsFilterSel(this.value,'${selId}')" style="font-size:11px;padding:5px 7px;border:1px solid var(--bd);border-radius:6px;background:var(--sf);color:var(--tx);width:100%;box-sizing:border-box">
    <select id="${selId}" style="font-size:12px;padding:6px;border-radius:6px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);width:100%"><option value="">— Baustelle wählen —</option>${bsOptionsHTML()}</select>
  </span>`;
}
function bsFilterSel(q,selId){
  const sel=document.getElementById(selId);if(!sel)return;
  const toks=q.toLowerCase().split(/\s+/).filter(Boolean);
  let hits=[];
  sel.querySelectorAll('option').forEach(o=>{if(!o.value)return;const ok=toks.every(t=>o.textContent.toLowerCase().includes(t)||(o.parentElement.label||'').toLowerCase().includes(t));o.hidden=!ok;if(ok)hits.push(o);});
  sel.querySelectorAll('optgroup').forEach(g=>{g.hidden=![...g.children].some(o=>!o.hidden);});
  if(hits.length===1)sel.value=hits[0].value;else if(toks.length&&!hits.some(o=>o.value===sel.value))sel.value='';
}
// ═══ PERSONAL-IMPORT: Baustellen, die NICHT auf der Einsatzliste stehen ═══
// Jede Einsatzliste (quelle) ist einer Planer-Abteilung zugeordnet (automatisch per Name, änderbar).
// Eine Abteilung wird nur geprüft, wenn ALLE ihr zugeordneten Einsatzlisten im aktuellen Import sind
// (z.B. Niederlassung Basel = Basel TB + Basel EB) - so funktioniert 1 Liste genauso wie mehrere.
function autoMapQuelle(q){
  const ql=q.toLowerCase();const depts=getAllDepts();
  const ex=depts.find(d=>d.toLowerCase()===ql);if(ex)return ex;
  const cont=depts.filter(d=>ql.includes(d.toLowerCase())).sort((a,b)=>b.length-a.length)[0];
  return cont||'';
}
function piComputeMissing(){
  if(!_piPending)return;
  const b=_piPending.buckets;
  const quellen=[...new Set((_piPending.rawEntries||[]).map(r=>r.quelle).filter(Boolean))];
  deptMeta._quelleMap=deptMeta._quelleMap||{};
  const qm=deptMeta._quelleMap;let changed=false;
  quellen.forEach(q=>{if(!(q in qm)){qm[q]=autoMapQuelle(q);changed=true;}});
  if(changed)saveDepts();
  const depts=[...new Set(quellen.map(q=>qm[q]).filter(Boolean))];
  const covered=[],partial=[];
  depts.forEach(d=>{const all=Object.keys(qm).filter(q=>qm[q]===d);const miss=all.filter(q=>!quellen.includes(q));(miss.length?partial:covered).push({dept:d,miss});});
  const matched=new Set();
  ['pause','review','reactivate','noop','reactivateInactive','inactiveInfo','excluded'].forEach(k=>(b[k]||[]).forEach(it=>{if(it.match&&it.match.entry)matched.add(it.match.entry.id);}));
  const cov=new Set(covered.map(x=>x.dept));
  b.missing=data.filter(e=>e.active&&!e.paused&&e.type!=='werkhof'&&!e.excludeFromPersonalReview&&!matched.has(e.id)&&deptParts(e.dept).some(d=>cov.has(d)))
    .sort((x,y)=>(x.dept||'').localeCompare(y.dept||'')||x.name.localeCompare(y.name))
    .map(e=>({name:e.name,psp:e.psp,count:null,match:{entry:e},isNew:!e.lastAudit&&!e.resumeFrom}));
  _piPending.coverage={quellen,covered,partial,unmapped:quellen.filter(q=>!qm[q])};
}
function setQuelleMap(q,d){
  deptMeta._quelleMap=deptMeta._quelleMap||{};deptMeta._quelleMap[q]=d;saveDepts();
  piComputeMissing();piRenderPreview();
}
function piMissingHTML(){
  if(!_piPending||!_piPending.coverage)return'';
  const{quellen,covered,partial}=_piPending.coverage;const b=_piPending.buckets;
  const qm=deptMeta._quelleMap||{};const depts=getAllDepts();
  const sel=q=>`<select data-q="${q.replace(/"/g,'&quot;')}" onchange="setQuelleMap(this.dataset.q,this.value)" style="font-size:11px;padding:3px 5px;border:1px solid ${qm[q]?'var(--bd)':'#F59E0B'};border-radius:5px;background:var(--sf);color:var(--tx);max-width:220px"><option value="">— keine Abteilung (nicht prüfen) —</option>${depts.map(d=>`<option value="${d.replace(/"/g,'&quot;')}"${qm[q]===d?' selected':''}>${d}</option>`).join('')}</select>`;
  let h=`<details style="margin-bottom:12px;padding:8px 10px;background:var(--sf2);border-radius:8px;font-size:11px;color:var(--tx2)" ${(_piPending.coverage.unmapped.length||partial.length)?'open':''}>
    <summary style="cursor:pointer;font-weight:600;color:var(--tx)">🗂️ Einsatzlisten → Abteilungen (${covered.length} Abteilung(en) werden auf fehlende Baustellen geprüft)</summary>
    <div style="margin-top:6px">${quellen.map(q=>`<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:3px 0"><span>${q}</span>${sel(q)}</div>`).join('')}</div>
    ${partial.length?`<div style="margin-top:6px;color:#92400E">⚠ Nicht geprüft, weil nicht alle Listen der Abteilung importiert wurden: ${partial.map(p=>`<b>${p.dept}</b> (fehlt: ${p.miss.join(', ')})`).join(' · ')}</div>`:''}
  </details>`;
  if(b.missing&&b.missing.length){
    h+=`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:#DC2626;margin-bottom:4px">🔍 Nicht auf der Einsatzliste – pausieren? (${b.missing.length})</div>
      <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Aktive Baustellen der geprüften Abteilungen, die auf keiner importierten Liste stehen. Angehakt = wird pausiert (taucht die Baustelle später wieder mit Personal auf einer Liste auf, schlägt der Import die Reaktivierung vor). Neu erfasste, noch nie auditierte Baustellen sind nicht vorausgewählt.</div>
      ${b.missing.map((it,i)=>{const e=it.match.entry;return`<label style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--sf2);border-radius:8px;margin-bottom:4px;font-size:12px;color:var(--tx)">
        <input type="checkbox" data-key="missing" data-idx="${i}" ${it.isNew?'':'checked'}>
        <span style="flex:1;min-width:0">${bsLabel(e)}${it.isNew?' <span style="font-size:10px;color:#0284C7">(neu, noch nie auditiert)</span>':''}</span>
      </label>`;}).join('')}
    </div>`;
  }
  return h;
}
function setAbtMap(abt,dept){
  deptMeta._abtMap=deptMeta._abtMap||{};
  if(dept)deptMeta._abtMap[abt]=dept;else delete deptMeta._abtMap[abt];
  saveDepts();renderDeptTable();
}
function deptMA(dept,yr){return((deptMeta[dept]||{}).ma||{})[String(yr)]||0;}
function renderAbtMap(){
  const box=document.getElementById('dept-abtmap');if(!box)return;
  const vals=unmappedPersonAbts();
  if(!vals.length){box.innerHTML='';return;}
  const opts=getAllDepts();
  box.innerHTML=`<div style="font-size:12px;font-weight:700;color:var(--tx);margin:4px 0 4px">👤 Personen-Register → Abteilung</div>
    <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Diese Abteilungs-Bezeichnungen aus dem Personen-Register passen nicht automatisch. Einmal zuordnen – danach zählen die Personen-Audits bei der richtigen Abteilung.</div>
    <div style="max-height:220px;overflow-y:auto;border:1px solid var(--bd);border-radius:var(--rs);margin-bottom:12px">${vals.map(v=>{const cur=(deptMeta._abtMap||{})[v]||'';const n=persons.filter(p=>(p.abt||'').trim()===v).length;return`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;padding:6px 10px;border-bottom:1px solid var(--bd)">
      <span style="font-size:12px">${v} <span style="color:var(--tx3);font-size:10px">(${n} Pers.)</span></span>
      <select data-v="${v.replace(/"/g,'&quot;')}" onchange="setAbtMap(this.dataset.v,this.value)" style="padding:5px;border:1px solid ${cur?'var(--bd)':'#F59E0B'};border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px"><option value="">— nicht zugeordnet —</option>${opts.map(d=>`<option value="${d.replace(/"/g,'&quot;')}"${d===cur?' selected':''}>${d}</option>`).join('')}</select>
    </div>`;}).join('')}</div>`;
}
function renderDeptList(){
  renderAbtMap();
  const el=document.getElementById('dept-list');if(!el)return;
  const ysel=document.getElementById('dept-ma-year');
  if(ysel&&!ysel.options.length){const y=new Date().getFullYear();ysel.innerHTML=[y-1,y,y+1].map(v=>`<option${v===y?' selected':''}>${v}</option>`).join('');}
  const yr=ysel?ysel.value:new Date().getFullYear();
  const all=getAllDepts();
  if(!all.length){el.innerHTML='<div style="padding:12px;font-size:12px;color:var(--tx3)">Keine Abteilungen erfasst.</div>';return;}
  el.innerHTML=`<div style="display:grid;grid-template-columns:1fr 70px 110px 32px;gap:6px;padding:6px 10px;font-size:10px;font-weight:600;color:var(--tx2);border-bottom:1px solid var(--bd);background:var(--sf2)"><span>Abteilung</span><span style="text-align:center">Baustellen</span><span style="text-align:center">Mitarbeitende ${yr}</span><span></span></div>`+
  all.map(d=>{
    const used=data.filter(e=>deptParts(e.dept).includes(d)).length;
    const q=d.replace(/"/g,'&quot;');
    return`<div style="display:grid;grid-template-columns:1fr 70px 110px 32px;gap:6px;align-items:center;padding:6px 10px;border-bottom:1px solid var(--bd)">
      <input value="${q}" data-old="${q}" onchange="renameDept(this.dataset.old,this.value)" style="padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px">
      <span style="text-align:center;font-size:12px;color:var(--tx2)">${used}</span>
      <input type="number" min="0" value="${deptMA(d,yr)||''}" placeholder="—" data-d="${q}" onchange="setDeptMA(this.dataset.d,this.value)" style="padding:5px 7px;border:1px solid var(--bd);border-radius:5px;background:var(--sf);color:var(--tx);font-size:12px;text-align:center">
      <button onclick="removeDept(this.dataset.d)" data-d="${q}" title="${used?'In Verwendung – nicht löschbar':'Löschen'}" style="background:none;border:none;cursor:pointer;color:${used?'var(--tx3)':'#EF4444'};font-size:13px">🗑</button>
    </div>`;
  }).join('');
}

// ═══ ADMIN MODE ═══
let adminMode=sessionStorage.getItem('admin_mode')==='1';


function updateAdminUI(){
  const isAdmin=document.body.classList.contains('admin-mode');
  const els=document.querySelectorAll('.admin-only');
  els.forEach(el=>el.style.display=isAdmin?'':'none');
  const btn=document.getElementById('admin-toggle-btn');
  if(btn){btn.style.display='none';}
  // Stellenprozente-Karte: für Haupt-/Voll-Admin UND Sekundär-Admin sichtbar (zwei getrennte
  // Rollen, die sich nicht überschneiden) - deshalb per JS statt einer einzelnen CSS-Klasse.
  const totalsCard=document.getElementById('aud-totals-card');
  if(totalsCard){
    const isSecAdmin=document.body.classList.contains('secondary-admin');
    totalsCard.style.display=(isAdmin||isSecAdmin)?'':'none';
  }
}

// Kürzel → Auditor-Name mapping (reverse)


// Fuzzy name match: find person in register by name


let _ibPending=[];







// ═══════════════════════════════════════════════════════════════
// PERSONAL-IMPORT: Einsatzlisten → Baustellen pausieren/reaktivieren
// ═══════════════════════════════════════════════════════════════

// Jedes Profil beschreibt EIN Einsatzlisten-Format (eine oder mehrere Einheiten
// können dasselbe Profil teilen). markStyle bestimmt, wie "wie viele Personen
// sind in der Zielwoche zugeteilt" aus dem Rohmaterial berechnet wird.
//
// Die eigentliche Format-Auswertung (Excel/PDF -> Anzahl Personen je Baustelle) laeuft
// jetzt im separaten Einsatzlisten-Konverter (siehe Einsatzlisten_Konverter.html).
// Hier im Planer wird nur noch dessen anonymer JSON-Export eingelesen und gematcht.


let _piPending=null;

function openPersonalImport(){
  document.getElementById('pi-file').value='';
  document.getElementById('pi-preview').style.display='none';
  document.getElementById('pi-error').style.display='none';
  _piPending=null;
  document.getElementById('pi-bg').style.display='flex';
}

// --- Hilfsfunktionen: Text/PSP-Normalisierung & Matching gegen bestehende Baustellen ---
// PSP in Hauptnummer + Unternummer zerlegen: «4226280.13» -> {base:'4226280',suf:'13',full:'4226280.13'}.
// Unternummern exakt als Text (".1" und ".10" sind verschiedene Baustellen).
function pspParts(s){
  if(!s)return null;
  const str=String(s).trim();const i=str.indexOf('.');
  const digits=(i>=0?str.slice(0,i):str).replace(/[^0-9]/g,'');
  const base=digits.length>7?digits.slice(-7):digits;
  if(!base)return null;
  const suf=i>=0?str.slice(i+1).replace(/[^0-9]/g,''):'';
  return{base,suf,full:base+(suf?'.'+suf:'')};
}
function piFullPSP(s){const p=pspParts(s);return p?p.full:'';}
// Planer-Baustelle passt zu Listen-PSP P? 1) exakt inkl. Unternummer (PSP oder Alias)
// 2) Liste mit Unternummer -> Planer-Hauptbaustelle OHNE Unternummer (Etappen). Nie zwischen verschiedenen Unternummern.
function pspMatchLevel(e,P){
  const q=pspParts(e.psp),al=e.pspAliases||[];
  if((q&&q.full===P.full)||al.includes(P.full))return 1;
  if(P.suf&&((q&&!q.suf&&q.base===P.base)||al.includes(P.base)))return 2;
  return 0;
}
function piNormPSP(s){
  if(!s)return'';
  const base=String(s).split('.')[0]; // Suffixe wie .1/.2/.3 (Etappen) vor der Ziffernbereinigung abschneiden
  const digits=base.replace(/[^0-9]/g,'');
  return digits.length>7?digits.slice(-7):digits;
}
function piNormName(s){
  return(s||'').toLowerCase().replace(/[^a-z0-9äöüß]+/g,' ').trim();
}
// qDept = Abteilung der Einsatzliste (aus Zuordnung Einsatzliste→Abteilung). Unsichere Namens-Treffer
// werden nur innerhalb dieser Abteilung gesucht - sonst würde z.B. eine Terratech-Baustelle am selben
// Ort fälschlich einer Hochbau-Baustelle zugeordnet. PSP- und bewusst gesetzte Alias-Treffer gelten immer.
function piMatchBaustelle(psp,name,qDept){
  const inDept=e=>!qDept||deptParts(e.dept).includes(qDept);
  const np=piNormPSP(psp);
  const P=pspParts(psp);
  if(P){
    let hit=data.find(e=>e.active&&pspMatchLevel(e,P)===1);
    if(!hit)hit=data.find(e=>e.active&&pspMatchLevel(e,P)===2);
    if(hit)return{entry:hit,how:'psp'};
  }
  if(name){
    const nn=piNormName(name);
    const aliasHit=data.find(e=>e.active&&(e.nameAliases||[]).includes(nn));
    if(aliasHit)return{entry:aliasHit,how:'alias-name'};
    const words=nn.split(' ').filter(w=>w.length>2);
    let best=null,bestScore=0;
    data.filter(e=>e.active&&inDept(e)).forEach(e=>{
      const en=piNormName(e.name+' '+(e.addr||''));
      const m=words.filter(w=>en.includes(w)).length;
      const score=words.length?m/words.length:0;
      if(score>bestScore){bestScore=score;best=e;}
    });
    if(best&&bestScore>=0.6)return{entry:best,how:'name',score:Math.round(bestScore*100)};
  }
  // Kein Treffer unter aktiven Baustellen -> zusätzlich unter INAKTIVEN suchen. Wird nie
  // automatisch reaktiviert, sondern nur als eigene Kategorie zur Bestätigung vorgeschlagen.
  if(np){
    const P2=pspParts(psp);
    let hitInactive=P2?(data.find(e=>!e.active&&pspMatchLevel(e,P2)===1)||data.find(e=>!e.active&&pspMatchLevel(e,P2)===2)):null;
    if(hitInactive)return{entry:hitInactive,how:'psp',wasInactive:true};
  }
  if(name){
    const nn=piNormName(name);
    const words=nn.split(' ').filter(w=>w.length>2);
    let best=null,bestScore=0;
    data.filter(e=>!e.active&&inDept(e)).forEach(e=>{
      const en=piNormName(e.name+' '+(e.addr||''));
      const m=words.filter(w=>en.includes(w)).length;
      const score=words.length?m/words.length:0;
      if(score>bestScore){bestScore=score;best=e;}
    });
    if(best&&bestScore>=0.6)return{entry:best,how:'name',score:Math.round(bestScore*100),wasInactive:true};
  }
  return null;
}


// ═══ Haupteinstieg: liest die anonyme Wochenergebnis-Datei aus dem Konverter ═══
async function runPersonalImport(file){
  if(!file)return;
  document.getElementById('pi-error').style.display='none';
  document.getElementById('pi-preview').style.display='none';
  document.getElementById('pi-loading').style.display='block';
  try{
    if(!file.name.match(/\.json$/i))throw new Error('Bitte die vom Einsatzlisten-Konverter exportierte .json-Datei wählen.');
    const text=await file.text();
    const payload=JSON.parse(text);
    if(payload.type!=='anliker_personal_import'||!Array.isArray(payload.entries))throw new Error('Diese Datei sieht nicht wie ein gültiger Personal-Import-Export aus.');
    const targetKW=payload.kw;
    let raw=payload.entries;

    const dedup={};
    raw.forEach(r=>{const k=(r.psp||'')+'|'+piNormName(r.name);if(!dedup[k]||dedup[k].count<r.count)dedup[k]=r;});
    raw=Object.values(dedup);

    if(!raw.length){
      document.getElementById('pi-loading').style.display='none';
      document.getElementById('pi-error').style.display='block';
      document.getElementById('pi-error').textContent='Die Datei enthält keine Baustellen-Einträge.';
      return;
    }

    const buckets={pause:[],review:[],reactivate:[],unknown:[],noop:[],reactivateInactive:[],inactiveInfo:[],excluded:[]};
    const qDeptOf=q=>{if(!q)return null;const qm=(deptMeta._quelleMap||{});return(q in qm)?(qm[q]||null):(autoMapQuelle(q)||null);};
    // 1. Zuordnen; 2. mehrere Listen-Einträge derselben Baustelle zusammenfassen (Personen addieren),
    // damit z.B. «0 Pers.» auf der Terratech-Liste eine voll laufende Hochbau-Baustelle nicht pausiert.
    const groups=new Map();
    raw.forEach(r=>{
      const m=piMatchBaustelle(r.psp,r.name,qDeptOf(r.quelle));
      const item={...r,match:m};
      if(!m){buckets.unknown.push(item);return;}
      const k=m.entry.id;
      if(!groups.has(k))groups.set(k,[]);
      groups.get(k).push(item);
    });
    const merged=[...groups.values()].map(list=>{
      // bester Treffer (PSP vor Alias vor Name) bestimmt die Anzeige, Personen werden summiert
      const rank=it=>it.match.how==='psp'?0:(it.match.how||'').startsWith('alias')?1:2;
      const main=list.slice().sort((a,b)=>rank(a)-rank(b))[0];
      return{...main,count:list.reduce((s,x)=>s+(+x.count||0),0),sources:list};
    });
    merged.forEach(item=>{
      const r=item,m=item.match;
      const e=m.entry;
      // Werkhöfe dürfen NIE durch den Personal-Import pausiert/reaktiviert werden - komplett
      // überspringen, taucht in keinem Eimer auf (auch nicht als "ausgeschlossen"), hat schlicht
      // nichts mit dieser Prüfung zu tun.
      if(e.type==='werkhof')return;
      // Dauerhaft von der Personal-Import-Prüfung ausgeschlossen (z.B. Baustellen in Gefängnissen
      // o.ä., die nie auditiert werden) - wird nie mehr in einen Entscheidungs-Eimer gesteckt,
      // egal wie viele Personen laut Liste dort eingeteilt sind.
      if(e.excludeFromPersonalReview){buckets.excluded.push(item);return;}
      if(m.wasInactive){
        // Inaktive Baustelle taucht auf einer Einsatzliste auf -> eigene Kategorie, nie
        // automatisch reaktiviert. Nur bei mehr als 1 Person schlagen wir Reaktivierung vor.
        if(r.count>=S('pi_react_inactive_min'))buckets.reactivateInactive.push(item);
        else buckets.inactiveInfo.push(item);
        return;
      }
      if(r.count===0){
        if(!e.paused)buckets.pause.push(item);else buckets.noop.push(item);
      }else if(r.count<=S('pi_review_max')){
        buckets.review.push(item);
      }else{
        if(e.paused)buckets.reactivate.push(item);else buckets.noop.push(item);
      }
    });
    _piPending={buckets,targetKW,targetYear:+payload.year||new Date().getFullYear(),temporaere:Array.isArray(payload.temporaere)?payload.temporaere:[],rawEntries:payload.entries};
    piComputeMissing();
    piRenderPreview();
  }catch(err){
    document.getElementById('pi-error').style.display='block';
    document.getElementById('pi-error').textContent='Fehler beim Verarbeiten: '+err.message;
  }finally{
    document.getElementById('pi-loading').style.display='none';
  }
}

function piRenderPreview(){
  try{piComputeMissing();}catch(e){console.warn(e);}
  if(!_piPending)return;
  const{buckets,targetKW}=_piPending;
  document.getElementById('pi-summary').textContent=
    `KW ${targetKW}: ${buckets.pause.length} pausieren · ${buckets.review.length} prüfen · ${buckets.reactivate.length} reaktivieren · ${buckets.unknown.length} unbekannt`;
  const grp=(title,color,arr,key,showCount,defaultChecked)=>{
    if(!arr.length)return'';
    const dc=defaultChecked!==false;
    return`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:${color};margin-bottom:6px">${title} (${arr.length})</div>
      ${arr.map((it,i)=>`
        <label style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--sf2);border-radius:8px;margin-bottom:4px;font-size:12px;color:var(--tx)">
          <input type="checkbox" ${dc?'checked':''} data-key="${key}" data-idx="${i}">
          <span style="flex:1;min-width:0">${it.match?bsLabel(it.match.entry):(listLabel(it)+' — kein Match')}${it.match&&it.match.how==='name'?' <span style="color:var(--tx3);font-size:10px">('+it.match.score+'% Name-Match)</span>':''}${it.match&&it.match.how&&it.match.how.startsWith('alias')?' <span style="color:#3B82F6;font-size:10px">(Alias zugeordnet)</span>':''}${piSourcesHTML(it)}</span>
          ${showCount?`<span style="color:var(--tx3)">${it.count} Pers.</span>`:''}
        </label>`).join('')}
    </div>`;
  };
  const unknownOptions=data.filter(e=>e.active).sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${e.id}">${e.name}${e.psp?' ('+e.psp+')':''}</option>`).join('')
    +(data.some(e=>!e.active)?`<optgroup label="— inaktive Baustellen —">${data.filter(e=>!e.active).sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${e.id}">${e.name}${e.psp?' ('+e.psp+')':''} (inaktiv)</option>`).join('')}</optgroup>`:'');
  const collectBoxHtml='';
  // Mit Personal zuerst (dringlicher zum Zuordnen), 0-Personal-Fälle darunter mit eigener
  // Trennlinie - macht das Durchgehen der Liste schneller, da die wichtigeren Fälle (echte,
  // aktive Zuteilungen) zuoberst stehen. Original-Index (i) bleibt erhalten, da die
  // Zuordnen/Neue-Baustelle/Sammelbox-Buttons direkt in _piPending.buckets.unknown[i] indexieren.
  const unknownWithPeople=[];const unknownZero=[];
  buckets.unknown.forEach((it,i)=>(it.count>0?unknownWithPeople:unknownZero).push(i));
  const renderUnknownItem=i=>{
    const it=buckets.unknown[i];
    return`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--sf2);border-radius:8px;margin-bottom:4px;font-size:12px;color:var(--tx);flex-wrap:wrap">
      <span style="flex:1;min-width:200px">📄 ${listLabel(it)} <span style="color:var(--tx3)">(${it.count} Pers.)</span></span>
      ${bsPickerHTML('pi-alias-sel-'+i,'width:320px;max-width:100%;flex-shrink:0')}
      <button onclick="piResolveUnknown(${i})" style="padding:4px 10px;border-radius:6px;border:none;background:#3B82F6;color:#fff;font-size:11px;cursor:pointer">Zuordnen</button>
      <button onclick="piCreateFromUnknown(${i})" style="padding:4px 10px;border-radius:6px;border:1px solid #10B981;background:transparent;color:#10B981;font-size:11px;cursor:pointer">+ Neue Baustelle</button>
      <button onclick="piCollectUnknown(${i})" style="padding:4px 10px;border-radius:6px;border:1px solid var(--bd);background:transparent;color:var(--tx2);font-size:11px;cursor:pointer"><i class="ti ti-inbox" style="color:var(--blue)"></i> Sammelbox</button>
    </div>`;
  };
  const unknownGrp=buckets.unknown.length?`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:#EF4444;margin-bottom:6px">❓ Unbekannt – kein Match gefunden (${buckets.unknown.length})</div>
      <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Diese PSP/Namen kennt der Planer nicht. Bestehende Baustelle zuordnen (Alias), direkt neu anlegen, oder für später in die Sammelbox legen (Admin-Menü → "📥 Sammelbox").</div>
      ${unknownWithPeople.map(renderUnknownItem).join('')}
      ${unknownZero.length?`<div style="display:flex;align-items:center;gap:8px;margin:10px 0 8px"><div style="flex:1;height:1px;background:var(--bd)"></div><span style="font-size:11px;color:var(--tx3);white-space:nowrap">Baustellen mit 0 Personal</span><div style="flex:1;height:1px;background:var(--bd)"></div></div>`:''}
      ${unknownZero.map(renderUnknownItem).join('')}
    </div>`:'';
  let html='';
  html+=grp('⏸ Pausieren (0 Personen)','#94A3B8',buckets.pause,'pause',true);
  html+=piMissingHTML();
  // "Prüfen" bekommt einen eigenen Renderer statt des generischen grp() - zusätzlich zum
  // normalen Haken gibt's hier einen Button, um eine Baustelle DAUERHAFT von dieser Prüfung
  // auszuschliessen (z.B. Baustellen in Gefängnissen o.ä., die nie auditiert werden und sonst
  // jede Woche wieder in "Prüfen" auftauchen würden).
  if(buckets.review.length){
    html+=`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:#F59E0B;margin-bottom:6px">⚠️ Prüfen – anhaken um trotzdem zu pausieren (1–${S('pi_review_max')} Personen) (${buckets.review.length})</div>
      ${buckets.review.map((it,i)=>`
        <label style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--sf2);border-radius:8px;margin-bottom:4px;font-size:12px;color:var(--tx)">
          <input type="checkbox" data-key="review" data-idx="${i}">
          <span style="flex:1;min-width:0">${it.match?bsLabel(it.match.entry):(listLabel(it)+' — kein Match')}${piSourcesHTML(it)}</span>
          <span style="color:var(--tx3)">${it.count} Pers.</span>
          <button type="button" onclick="event.preventDefault();piExcludePermanently(${i})" title="Diese Baustelle nie mehr fragen, immer pausiert lassen" style="padding:3px 8px;border-radius:6px;border:1px solid var(--bd);background:transparent;color:var(--tx2);font-size:10px;cursor:pointer;white-space:nowrap">🔇 Dauerhaft ausschliessen</button>
        </label>`).join('')}
    </div>`;
  }
  html+=grp('▶ Reaktivieren (wieder Personal)','#10B981',buckets.reactivate,'reactivate',true);
  html+=grp('🔓 Inaktive Baustelle wieder aktivieren? (Personal auf Liste)','#8B5CF6',buckets.reactivateInactive,'reactivateInactive',true,false);
  if(buckets.excluded.length){
    html+=`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--tx3);margin-bottom:6px">🔇 Dauerhaft ausgeschlossen – keine Aktion (${buckets.excluded.length})</div>
      ${buckets.excluded.map(it=>`<div style="padding:6px 10px;background:var(--sf2);border-radius:8px;margin-bottom:4px;font-size:12px;color:var(--tx3);display:flex;align-items:center;justify-content:space-between">
        <span>${bsLabel(it.match.entry)} — ${it.count} Pers.</span>
        <button onclick="piUnexclude(${it.match.entry.id})" style="padding:3px 8px;border-radius:6px;border:1px solid var(--bd);background:transparent;color:var(--tx2);font-size:10px;cursor:pointer">Wieder einschliessen</button>
      </div>`).join('')}
    </div>`;
  }
  if(buckets.inactiveInfo.length){
    html+=`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--tx3);margin-bottom:6px">ℹ️ Inaktiv, nur vereinzelt Personal – keine Aktion (${buckets.inactiveInfo.length})</div>
      ${buckets.inactiveInfo.map(it=>`<div style="padding:6px 10px;background:var(--sf2);border-radius:8px;margin-bottom:4px;font-size:12px;color:var(--tx3)">${bsLabel(it.match.entry)} — ${it.count} Pers.</div>`).join('')}
    </div>`;
  }
  html=collectBoxHtml+html;
  html+=unknownGrp;
  if(!html)html='<div style="font-size:12px;color:var(--tx2)">Keine Änderungen nötig – alles bereits konsistent.</div>';
  document.getElementById('pi-groups').innerHTML=html;
  document.getElementById('pi-preview').style.display='block';
}

// Baustelle DAUERHAFT von der Personal-Import-Prüfung ausschliessen (z.B. Baustellen in
// Gefängnissen o.ä., die nie auditiert werden) - wird sofort pausiert und taucht ab sofort in
// KEINEM Import mehr in einem Entscheidungs-Eimer auf, unabhängig von der Personenzahl.
async function piExcludePermanently(idx){
  if(!_piPending)return;
  const item=_piPending.buckets.review[idx];
  if(!item||!item.match)return;
  const e=data.find(x=>x.id===item.match.entry.id);
  if(!e)return;
  if(!await askConfirm(`«${e.name}» dauerhaft von der Personal-Import-Prüfung ausschliessen?\n\nWird sofort pausiert und taucht künftig nie mehr in "Prüfen" auf, egal wie viele Personen dort laut Einsatzliste eingeteilt sind. Kann jederzeit wieder rückgängig gemacht werden.`,{ok:'Ausschliessen'}))return;
  e.excludeFromPersonalReview=true;
  e.paused=true;e.pauseReason='Dauerhaft ausgeschlossen (Personal-Import)';e.pauseUntil=null;
  log('Dauerhaft ausgeschlossen 🔇 (Personal-Import)',e.name,'#6B7280','');
  _piPending.buckets.review.splice(idx,1);
  _piPending.buckets.excluded.push(item);
  saveNow();renderAll();
  piRenderPreview();
  showToast('🔇 Dauerhaft ausgeschlossen: '+e.name,2500);
}
function piUnexclude(entryId){
  const e=data.find(x=>x.id===entryId);
  if(!e)return;
  e.excludeFromPersonalReview=false;
  log('Ausschluss aufgehoben (Personal-Import)',e.name,'#3B82F6','');
  saveNow();renderAll();
  if(_piPending){_piPending.buckets.excluded=_piPending.buckets.excluded.filter(it=>it.match.entry.id!==entryId);piRenderPreview();}
  showToast('✓ Wieder eingeschlossen: '+e.name+' – wird beim nächsten Import normal geprüft',2500);
}
function piResolveUnknown(idx){
  if(!_piPending)return;
  const sel=document.getElementById('pi-alias-sel-'+idx);
  const targetId=sel&&sel.value;
  if(!targetId)return;
  const item=_piPending.buckets.unknown[idx];
  const entry=data.find(e=>String(e.id)===String(targetId));
  if(!item||!entry)return;
  item.match={entry,how:'alias',aliasPsp:item.psp,aliasName:item.name,wasInactive:!entry.active};
  _piPending.buckets.unknown.splice(idx,1);
  if(!entry.active){
    if(item.count>1)_piPending.buckets.reactivateInactive.push(item);
    else _piPending.buckets.inactiveInfo.push(item);
  }else if(item.count===0){if(!entry.paused)_piPending.buckets.pause.push(item);else _piPending.buckets.noop.push(item);}
  else if(item.count<=S('pi_review_max')){_piPending.buckets.review.push(item);}
  else{if(entry.paused)_piPending.buckets.reactivate.push(item);else _piPending.buckets.noop.push(item);}
  piRenderPreview();
}

// Öffnet "Neue Baustelle", vorausgefüllt mit Name/PSP aus dem Import. Der Import-Eintrag
// wird aus der Unbekannt-Liste entfernt, da er ab jetzt manuell im Formular fertiggestellt wird.
function piCreateFromUnknown(idx){
  if(!_piPending)return;
  const item=_piPending.buckets.unknown[idx];
  if(!item)return;
  document.getElementById('pi-bg').style.display='none';
  openAdd();
  const nameEl=document.getElementById('f-name');
  const pspEl=document.getElementById('f-psp');
  if(nameEl)nameEl.value=item.name||'';
  if(pspEl&&item.psp)pspEl.value=item.psp;
  _piPending.buckets.unknown.splice(idx,1);
}

// Legt den Eintrag in eine einfache Sammelbox (nur für diese Session), damit man mehrere
// unbekannte Baustellen sammeln und anschliessend nacheinander in Ruhe anlegen kann.
function piCollectUnknown(idx){
  if(!_piPending)return;
  const item=_piPending.buckets.unknown[idx];
  if(!item)return;
  window._piCollectBox=window._piCollectBox||[];
  window._piCollectBox.push({psp:item.psp||'',name:item.name,count:item.count,quelle:item.quelle||''});
  _piPending.buckets.unknown.splice(idx,1);
  saveNow();
  piRenderPreview();
}
// ═══ Temporäre Mitarbeitende (aus Personal-Import) ═══
function openTempWorkers(){
  const list=window._tempWorkers||[];
  const tbody=document.getElementById('tw-list');
  if(tbody){
    tbody.innerHTML=list.length?list.map((t,i)=>{
      // Trennlinie einfügen, sobald sich die Einheit gegenüber der vorherigen Zeile ändert
      const newGroup=i===0||list[i-1].quelle!==t.quelle;
      const sep=newGroup&&i>0?'border-top:2px solid var(--tx3)':'';
      return`
      <tr style="border-bottom:1px solid var(--bd);${sep}">
        <td style="padding:6px 8px;color:var(--tx);font-weight:600">
          <span style="display:inline-flex;align-items:center;gap:6px">
            ${t.pnr}
            <button onclick="copyTempPnr('${t.pnr}',this)" title="Personal-Nr kopieren" style="border:none;background:var(--sf2);border-radius:5px;padding:2px 5px;cursor:pointer;font-size:11px;color:var(--tx2);line-height:1">📋</button>
          </span>
        </td>
        <td style="padding:6px 8px;color:var(--tx3)">${t.quelle||''}</td>
      </tr>`;
    }).join('')
      :`<tr><td colspan="2" style="padding:14px 8px;text-align:center;color:var(--tx3)">Keine temporären Mitarbeitenden importiert.</td></tr>`;
  }
  document.getElementById('tw-bg').style.display='flex';
}
function copyTempPnr(pnr,btn){
  navigator.clipboard.writeText(pnr).then(()=>{
    const orig=btn.textContent;
    btn.textContent='✓';
    setTimeout(()=>btn.textContent=orig,1200);
  });
}
function updateTempWorkersBadge(){
  const badge=document.getElementById('tw-count-badge');
  if(badge){const n=(window._tempWorkers||[]).length;badge.textContent=n?`(${n})`:'';}
}
function exportTempWorkersCSV(){
  const list=window._tempWorkers||[];
  let csv='Personal-Nr;Einheit\n';
  list.forEach(t=>{csv+=`${t.pnr};${t.quelle||''}\n`;});
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='temporaere_mitarbeitende_'+today()+'.csv';
  a.click();
}
function openSammelbox(){
  const box=window._piCollectBox||[];
  const activeOptions=data.filter(e=>e.active).sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${e.id}">${e.name}${e.psp?' ('+e.psp+')':''}</option>`).join('')
    +(data.some(e=>!e.active)?`<optgroup label="— inaktive Baustellen —">${data.filter(e=>!e.active).sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${e.id}">${e.name}${e.psp?' ('+e.psp+')':''} (inaktiv)</option>`).join('')}</optgroup>`:'');
  const list=document.getElementById('sb-list');
  if(list){
    list.innerHTML=box.length?box.map((it,ci)=>`
      <div style="padding:8px 10px;background:var(--sf2);border-radius:8px;margin-bottom:6px;font-size:12px;color:var(--tx)">
        <div style="margin-bottom:6px">📄 ${listLabel(it)} <span style="color:var(--tx3)">(${it.count} Pers.)</span></div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          ${bsPickerHTML('sb-sel-'+ci,'width:320px;max-width:100%')}
          <button onclick="sbAssign(${ci})" style="padding:4px 10px;border-radius:6px;border:none;background:#3B82F6;color:#fff;font-size:11px;cursor:pointer">Zuordnen</button>
          <button onclick="sbCreate(${ci})" style="padding:4px 10px;border-radius:6px;border:1px solid #10B981;background:transparent;color:#10B981;font-size:11px;cursor:pointer">+ Neue Baustelle</button>
          <button onclick="sbRemove(${ci})" style="padding:4px 10px;border-radius:6px;border:1px solid var(--bd);background:transparent;color:var(--tx2);font-size:11px;cursor:pointer">✕ Entfernen</button>
        </div>
      </div>`).join('')
      :'<div style="font-size:12px;color:var(--tx2)">Sammelbox ist leer.</div>';
  }
  document.getElementById('pisb-bg').style.display='flex';
}
function sbRemove(ci){(window._piCollectBox||[]).splice(ci,1);saveNow();openSammelbox();}
// Direktes Zuordnen aus der Sammelbox zu einer bestehenden Baustelle - wendet dieselbe
// Pausieren/Reaktivieren-Logik an wie ein normaler Import, nur ausserhalb des Import-Flows.
function sbAssign(ci){
  const it=(window._piCollectBox||[])[ci];
  const sel=document.getElementById('sb-sel-'+ci);
  const targetId=sel&&sel.value;
  if(!it||!targetId)return;
  const e=data.find(x=>String(x.id)===String(targetId));
  if(!e)return;
  if(it.psp){
    const np=piFullPSP(it.psp);
    e.pspAliases=e.pspAliases||[];
    if(!e.pspAliases.includes(np))e.pspAliases.push(np);
  }else{
    const nn=piNormName(it.name);
    e.nameAliases=e.nameAliases||[];
    if(!e.nameAliases.includes(nn))e.nameAliases.push(nn);
  }
  if(it.count===0){if(!e.paused){e.paused=true;e.pauseReason='Import (Sammelbox): kein Personal';e.pauseUntil=null;log('Pausiert ⏸ (Sammelbox)',e.name,'#94A3B8','');}}
  else if(it.count>S('pi_review_max')){if(e.paused){e.paused=false;e.pauseReason=null;e.pauseUntil=null;log('Reaktiviert ▶ (Sammelbox)',e.name,'#10B981','');}}
  window._piCollectBox.splice(ci,1);
  saveNow();renderAll();
  showToast('✓ Zugeordnet: '+e.name,2000);
  openSammelbox();
}
function sbCreate(ci){
  const it=(window._piCollectBox||[])[ci];
  if(!it)return;
  document.getElementById('pisb-bg').style.display='none';
  openAdd();
  const nameEl=document.getElementById('f-name');
  const pspEl=document.getElementById('f-psp');
  if(nameEl)nameEl.value=it.name||'';
  if(pspEl&&it.psp)pspEl.value=it.psp;
  window._piCollectBox.splice(ci,1);
  saveNow();
}
function confirmPersonalImport(){
  if(!_piPending)return;
  const{buckets,targetKW,temporaere}=_piPending;
  // Immer die AKTUELLE Baustelle aus data per ID nachschlagen, statt der beim Öffnen der
  // Vorschau gespeicherten Referenz zu vertrauen - falls in der Zwischenzeit ein
  // Supabase-Sync die data-Liste ausgetauscht hat, würde man sonst ein verwaistes,
  // nicht mehr angezeigtes Objekt verändern (Änderung würde nirgends sichtbar).
  const liveEntry=it=>it.match&&it.match.entry?(data.find(x=>x.id===it.match.entry.id)||it.match.entry):null;
  // Personal-Zahl an der Baustelle festhalten - unabhängig von Häkchen (Detail-Panel, Verlauf, Tourguide).
  //  - alle erkannten Baustellen inkl. «dauerhaft ausgeschlossen»: Zahl laut Liste
  //  - «nicht auf der Liste» (nur vollständig importierte Abteilungen): 0 für diese KW
  // Werkhöfe und «Unbekannt» erhalten nichts.
  const yr=_piPending.targetYear||new Date().getFullYear();
  const recordPersonal=(e,count)=>{
    if(!e)return;
    e.lastPersonalCount=count;
    e.lastPersonalKW=targetKW;
    // Personalverlauf: pro KW ein Wert (erneuter Import derselben KW überschreibt), max. 52 Wochen
    e.personalHistory=(e.personalHistory||[]).filter(h=>!(h.kw===targetKW&&h.year===yr));
    e.personalHistory.push({kw:targetKW,year:yr,count});
    e.personalHistory.sort((a,b)=>a.year-b.year||a.kw-b.kw);
    if(e.personalHistory.length>S('pi_history_weeks'))e.personalHistory=e.personalHistory.slice(-S('pi_history_weeks'));
  };
  [...buckets.pause,...buckets.review,...buckets.reactivate,...buckets.noop,...buckets.reactivateInactive,...buckets.inactiveInfo,...(buckets.excluded||[])].forEach(it=>{
    if(!it.match)return;
    recordPersonal(liveEntry(it),it.count);
  });
  (buckets.missing||[]).forEach(it=>recordPersonal(liveEntry(it),0));
  // Temporäre Mitarbeitende: PRO EINHEIT ersetzen, nicht global anhängen. Wenn eine Einheit
  // (z.B. "Terratech AG") neu importiert wird, fliegen ihre alten Nummern raus und werden durch
  // die neuen ersetzt - so verschwinden auch Nummern korrekt wieder, wenn die Person nicht mehr
  // temporär im Einsatz ist. Andere, in diesem Import nicht enthaltene Einheiten bleiben
  // unangetastet.
  if(temporaere&&temporaere.length){
    const quellenInDiesemImport=new Set(temporaere.map(t=>t.quelle));
    window._tempWorkers=(window._tempWorkers||[]).filter(t=>!quellenInDiesemImport.has(t.quelle));
    window._tempWorkers.push(...temporaere);
    window._tempWorkers.sort((a,b)=>a.quelle.localeCompare(b.quelle)||a.pnr.localeCompare(b.pnr));
  }
  let n=0,aliasesSaved=0;
  const checked=(key,idx)=>{
    const el=document.querySelector(`input[data-key="${key}"][data-idx="${idx}"]`);
    return el?el.checked:false;
  };
  const persistAlias=it=>{
    if(!it.match||it.match.how!=='alias')return;
    const e=liveEntry(it);
    const np=piFullPSP(it.match.aliasPsp);
    const nn=piNormName(it.match.aliasName);
    e.pspAliases=e.pspAliases||[];
    e.nameAliases=e.nameAliases||[];
    let added=false;
    if(np&&!e.pspAliases.includes(np)){e.pspAliases.push(np);added=true;}
    if(nn&&!e.nameAliases.includes(nn)){e.nameAliases.push(nn);added=true;}
    if(added)aliasesSaved++;
  };
  [...buckets.pause,...buckets.review,...buckets.reactivate,...buckets.noop,...buckets.reactivateInactive,...buckets.inactiveInfo,...(buckets.excluded||[])].forEach(persistAlias);
  buckets.pause.forEach((it,i)=>{
    if(!checked('pause',i)||!it.match)return;
    const e=liveEntry(it);
    e.paused=true;e.pauseReason='Import: kein Personal (KW '+_piPending.targetKW+')';e.pauseUntil=null;
    log('Pausiert ⏸ (Import)',e.name,'#94A3B8','');n++;
  });
  (buckets.missing||[]).forEach((it,i)=>{
    if(!checked('missing',i))return;
    const e=liveEntry(it);if(!e||e.paused)return;
    e.paused=true;e.pauseReason='Import: nicht auf Einsatzliste (KW '+_piPending.targetKW+')';e.pauseUntil=null;
    log('Pausiert ⏸ (nicht auf Liste)',e.name,'#94A3B8','');n++;
  });
  buckets.reactivate.forEach((it,i)=>{
    if(!checked('reactivate',i)||!it.match)return;
    const e=liveEntry(it);
    e.paused=false;e.pauseReason=null;e.pauseUntil=null;
    log('Reaktiviert ▶ (Import)',e.name,'#10B981','');n++;
  });
  buckets.review.forEach((it,i)=>{
    if(!checked('review',i)||!it.match)return;
    const e=liveEntry(it);
    e.paused=true;e.pauseReason='Import: nur '+it.count+' Person(en) (KW '+_piPending.targetKW+')';e.pauseUntil=null;
    log('Pausiert ⏸ (Prüfen, Import)',e.name,'#F59E0B','');n++;
  });
  buckets.reactivateInactive.forEach((it,i)=>{
    if(!checked('reactivateInactive',i)||!it.match)return;
    const e=liveEntry(it);
    e.active=true;e.paused=false;e.pauseReason=null;e.pauseUntil=null;
    log('Reaktiviert (war inaktiv) ▶ (Import)',e.name,'#8B5CF6','');n++;
  });
  // "Unbekannt" (unaufgelöst) wird bewusst nicht automatisch verändert.
  renderAll();
  saveNow();
  document.getElementById('pi-bg').style.display='none';
  showToast(`✓ ${n} Baustellen aktualisiert`+(aliasesSaved?`, ${aliasesSaved} Alias-Zuordnung(en) gespeichert`:''),4000);
}

async function clearGhostAudits(){
  const count=(window._ghostAudits||[]).length;
  if(!await askConfirm(`${count} Ghost-Audits (IB/ASP Zählungen) löschen?`,{ok:'Löschen',danger:true}))return;
  undoPoint(`${count} Ghost-Audits gelöscht`);
  window._ghostAudits=[];
  saveNow();
  showToast('🗑 Ghost-Audits gelöscht',2000);
}
async function clearAllPersons(){
  if(!await askConfirm('Alle '+persons.length+' Personen löschen? Personen-Audits bleiben erhalten.',{ok:'Alle löschen',danger:true}))return;
  undoPoint('Alle Personen gelöscht',()=>renderPersonRegister());
  persons=[];
  localStorage.setItem('anliker_persons',JSON.stringify(persons));
  saveNow();
  showToast('🗑 Alle Personen gelöscht',2000);
}
function openReset(){
  if(!adminMode){showToast('Admin-Modus erforderlich');return;}
  document.getElementById('reset-bg').style.display='flex';
}

async function confirmReset(){
  document.getElementById('reset-bg').style.display='none';
  // Vor dem Löschen automatisch eine Sicherung herunterladen
  teamExport();
  data=[];plans=[];ferien=[];auditors=['Alain Groelly','René Rottenberger','Niklaus Meier','Matthias Knotz'];
  personAudits=[];window._ghostAudits=[];tlog=[];
  // Über den normalen Speicherweg: die Löschung wird wie jede Änderung synchronisiert.
  // Der alte Stand bleibt im Verlauf (Admin → Verlauf & Wiederherstellen) erhalten.
  saveNow();
  showToast(sbConnected?'🗑 Alles gelöscht – Sicherung wurde heruntergeladen':'🗑 Lokal gelöscht',3000);
  renderAll();buildDF();buildAudSels();updateAdminUI();
}

// ═══ SUPABASE LIVE-SYNC ═══
const SB_URL_KEY='sb_url',SB_KEY_KEY='sb_key';
// Custom departments
// Beim ersten Start die bisher fest hinterlegten Abteilungen übernehmen -> ab jetzt vollständig verwaltbar
let customDepts=JSON.parse(localStorage.getItem('anliker_depts')||'null')||[...ALL_DEPTS];
// Zusatzdaten pro Abteilung, z.B. {"Hochbau Luzern":{ma:{"2026":120}}} - Mitarbeitende pro Jahr
let deptMeta=JSON.parse(localStorage.getItem('anliker_dept_meta')||'{}');
function saveDepts(){try{localStorage.setItem('anliker_depts',JSON.stringify(customDepts));localStorage.setItem('anliker_dept_meta',JSON.stringify(deptMeta));}catch(e){}if(typeof saveNow==='function')saveNow();}
function deptParts(s){return(s||'').split(' + ').map(x=>x.trim()).filter(Boolean);}
function getAllDepts(){
  const fromData=[...new Set(data.flatMap(e=>deptParts(e.dept)))];
  return[...new Set([...fromData,...customDepts])].sort();
}
const SB_DEFAULT_URL='https://hepaappbedytamgdrzoo.supabase.co';
const SB_DEFAULT_KEY='sb_publishable_IOlsz5OGeF8HUzF0yE1kpQ_x6lM_Jd9';
let sbUrl=localStorage.getItem(SB_URL_KEY)||SB_DEFAULT_URL;
let sbKey=localStorage.getItem(SB_KEY_KEY)||SB_DEFAULT_KEY;
let sbConnected=false;
let sbPollTimer=null;
let sbLastStatus=0;

async function getAuthToken(){
  if(sbAuth){
    const {data:{session}}=await sbAuth.auth.getSession();
    if(session?.access_token)return session.access_token;
  }
  return sbKey;
}

async function sbHeadersAuth(){
  const token=await getAuthToken();
  return{'Content-Type':'application/json','apikey':sbKey,'Authorization':'Bearer '+token,'Prefer':'resolution=merge-duplicates'};
}

async function sbFetch(path,opts={}){
  if(!sbUrl||!sbKey)return null;
  try{
    const headers=await sbHeadersAuth();
    const r=await fetch(sbUrl+'/rest/v1/'+path,{...opts,headers:{...headers,...(opts.headers||{})}});
    sbLastStatus=r.status;
    if(!r.ok){console.warn('Supabase error:',r.status,await r.text());return null;}
    if(r.status===204||r.headers.get('content-length')==='0')return true;
    const text=await r.text();
    if(!text||!text.trim())return true;
    return JSON.parse(text);
  }catch(ex){sbLastStatus=0;console.warn('Supabase fetch error:',ex);return null;}
}

async function sbInit(){
  if(!sbUrl||!sbKey){updateSBStatus(false);return;}
  // Test connection + ensure tables exist
  const test=await sbFetch('audit_state?select=id&limit=1');
  if(test!==null){
    sbConnected=true;
    updateSBStatus(true);
    await sbPull();
    startSBPoll();
    if(currentUser)startPresence();
  } else {
    sbConnected=false;
    updateSBStatus(false);
  }
}

function updateSBStatus(ok){
  const lbl=document.getElementById('sb-status-lbl');
  const btn=document.getElementById('sb-btn');
  if(lbl)lbl.textContent=ok?'Live-Sync aktiv':'Supabase einrichten';
  if(btn)btn.style.color=ok?'#3ECF8E':'';
  renderSyncState();
}

// ═══ SYNC: Zusammenführen statt Überschreiben ═══
// Alle Daten liegen in audit_state (Zeile id=1). Jeder Client merkt sich den zuletzt vom
// Server gelesenen Stand (sbBase). Beim Speichern wird nur geschrieben, wenn der Server noch
// auf diesem Stand ist (updated_at unverändert). Hat inzwischen jemand anderes gespeichert,
// werden die Änderungen beider Seiten zusammengeführt (js/merge.js) und erneut gespeichert.
let sbBase=null,sbBaseUpdatedAt=null,sbBusy=false,sbPushAgain=false,sbRetryT=null;
let sbSync={state:'idle',at:0,msg:''};
let sbNoUpdatedBy=false,sbNoOptional=false,sbLogMissing=false;
// Datenfelder = Spalten in audit_state. raw: Spalte enthält den Wert direkt (nicht als JSON-Text).
const SB_FIELDS={
  data:{get:()=>data,set:v=>{data=v;ensureCreatedAt();ensurePersonalHistory();}},
  plans:{get:()=>plans,set:v=>{plans=v;}},
  auditors:{get:()=>auditors,set:v=>{auditors=v;}},
  ferien:{get:()=>ferien,set:v=>{ferien=v;}},
  ghostAudits:{get:()=>window._ghostAudits||[],set:v=>{window._ghostAudits=v;}},
  personAudits:{get:()=>personAudits,set:v=>{personAudits=v;}},
  beratPlan:{get:()=>beratPlan,set:v=>{beratPlan=v;}},
  persons:{get:()=>persons,set:v=>{persons=v;}},
  auditorMeta:{get:()=>auditorMeta,set:v=>{auditorMeta=v;}},
  auditorColors:{get:()=>auditorColors,set:v=>{auditorColors=v;}},
  piCollectBox:{get:()=>window._piCollectBox||[],set:v=>{window._piCollectBox=v;},opt:1},
  auditTarget:{get:()=>window._auditTarget||0,set:v=>{window._auditTarget=+v||0;},raw:1,opt:1},
  tempWorkers:{get:()=>window._tempWorkers||[],set:v=>{window._tempWorkers=v;},opt:1},
  ferienWunsch:{get:()=>ferienWunsch||[],set:v=>{ferienWunsch=v;},opt:1},
  orsKey:{get:()=>window._orsKey||'',set:v=>{window._orsKey=v||'';},raw:1,opt:1},
  deptMeta:{get:()=>({customDepts,deptMeta}),set:v=>{if(v&&Array.isArray(v.customDepts))customDepts=v.customDepts;if(v&&v.deptMeta)deptMeta=v.deptMeta;},opt:1},
  rapporte:{get:()=>rapporte||[],set:v=>{rapporte=v;normalizeRapporte();},opt:1}
};
function sbCollect(){const o={};for(const f in SB_FIELDS)o[f]=SB_FIELDS[f].get();return o;}
// Server-Zeile → Werte (fehlende oder unlesbare Spalten bleiben undefined)
function sbParseRow(row){
  const o={};
  for(const f in SB_FIELDS){
    const v=row[f];
    if(v===undefined||v===null)continue;
    if(SB_FIELDS[f].raw){o[f]=f==='auditTarget'?(+v||0):v;continue;}
    if(v==='')continue;
    try{o[f]=typeof v==='string'?JSON.parse(v):v;}catch(e){console.warn('Spalte '+f+' nicht lesbar',e);}
  }
  return mgSafe(o);
}
function sbRowFrom(vals){
  const row={};
  for(const f in vals){
    if(!SB_FIELDS[f])continue;
    if(sbNoOptional&&SB_FIELDS[f].opt)continue;
    row[f]=SB_FIELDS[f].raw?vals[f]:JSON.stringify(vals[f]);
  }
  return row;
}
// Werte in den App-Zustand übernehmen (nur geänderte Felder), lokal sichern
function sbApply(vals){
  vals=mgSafe(vals);
  for(const f in vals){
    if(!SB_FIELDS[f]||vals[f]===undefined)continue;
    if(mgEq(vals[f],SB_FIELDS[f].get()))continue;
    SB_FIELDS[f].set(mgClone(vals[f]));
  }
  saveLocal();
}
// Lokale Kopie (für schnellen Start), immer vollständig
function saveLocal(){
  try{
    localStorage.setItem(SK,JSON.stringify({data,plans,tlog,auditors,ferien,ferienWunsch,rapporte,ghostAudits:window._ghostAudits||[],personAudits,v:4}));
    localStorage.setItem('anliker_persons',JSON.stringify(persons));
    localStorage.setItem('anliker_berat_plan',JSON.stringify(beratPlan));
    localStorage.setItem('anliker_pi_collectbox',JSON.stringify(window._piCollectBox||[]));
    localStorage.setItem('anliker_temp_workers',JSON.stringify(window._tempWorkers||[]));
    localStorage.setItem('anliker_aud_meta',JSON.stringify(auditorMeta));
    localStorage.setItem('auditorColors',JSON.stringify(auditorColors));
    localStorage.setItem('anliker_depts',JSON.stringify(customDepts));
    localStorage.setItem('anliker_dept_meta',JSON.stringify(deptMeta));
    localStorage.setItem('anliker_ors_key',window._orsKey||'');
    localStorage.setItem('anliker_audit_target',String(window._auditTarget||0));
  }catch(e){}
}
// Eigene Daten von gefährlichen Zeichen befreien (siehe mgSafe in js/merge.js)
function sbSanitizeState(){
  for(const f in SB_FIELDS){const v=SB_FIELDS[f].get(),c=mgSafe(v);if(!mgEq(v,c))SB_FIELDS[f].set(c);}
}
// Daten-Schlüssel im Browser (werden beim Abmelden gelöscht)
const LOCAL_DATA_KEYS=[SK,'anliker_persons','anliker_berat_plan','anliker_pi_collectbox','anliker_temp_workers','anliker_aud_meta','auditorColors','anliker_depts','anliker_dept_meta','anliker_ors_key','anliker_audit_target'];
// Gibt es eigene Änderungen, die noch nicht auf dem Server sind?
function sbHasPending(){
  if(!sbBase)return false;
  const cur=sbCollect();
  for(const f in cur){if(sbNoOptional&&SB_FIELDS[f].opt)continue;if(!mgEq(cur[f],sbBase[f]))return true;}
  return false;
}
function sbRefreshUI(){
  renderAll();buildDF();buildAudSels();
  if(curView==='aud'){renderAuditors();renderAudTotals();}
  if(curView==='pa'){renderPersonRegister();renderPersonMatrix();}
  const fp=document.getElementById('aud-panel-ferien');
  if(curView==='aud'&&fp&&fp.style.display!=='none'){renderFerList();renderFerChart();renderWunschList();renderWunschChart();}
}

// Schreiben mit Konflikt-Erkennung. Rückgabe: Zeile | 'conflict' | null (Fehler)
async function sbWrite(vals,expectAt){
  const tries=[];
  for(let i=0;i<3;i++){
    const row=sbRowFrom(vals);
    row.updated_at=new Date().toISOString();
    if(!sbNoUpdatedBy)row.updated_by=currentUser||'';
    const filter=expectAt?'updated_at=eq.'+encodeURIComponent(expectAt):'updated_at=is.null';
    const res=await sbFetch('audit_state?id=eq.1&'+filter,{method:'PATCH',body:JSON.stringify(row),headers:{'Prefer':'return=representation'}});
    if(Array.isArray(res))return res.length?res[0]:'conflict';
    // Fehler 400: evtl. fehlen neuere Spalten in Supabase → ohne diese nochmals versuchen
    if(sbLastStatus!==400)return null;
    if(!sbNoUpdatedBy){sbNoUpdatedBy=true;continue;}
    if(!sbNoOptional){sbNoOptional=true;console.warn('sbPush: neuere Spalten fehlen in Supabase – ohne sie gespeichert. Siehe Admin → Anleitung & SQL.');continue;}
    return null;
  }
  return null;
}

async function sbPush(){
  if(!sbConnected||!sbBase)return;
  if(sbBusy){sbPushAgain=true;return;}
  sbBusy=true;clearTimeout(sbRetryT);
  sbSanitizeState();
  const mine=sbCollect(),baseBefore=sbBase;
  if(!sbHasPending()){sbBusy=false;setSyncState('saved');return;}
  setSyncState('saving');
  let ok=false;
  try{
    for(let attempt=0;attempt<5&&!ok;attempt++){
      const vals=sbCollect();
      const res=await sbWrite(vals,sbBaseUpdatedAt);
      if(res===null)break;
      if(res!=='conflict'){
        sbBase=mgClone(vals);sbBaseUpdatedAt=res.updated_at;ok=true;break;
      }
      // Jemand anderes hat gespeichert → neuesten Stand holen und zusammenführen
      const rows=await sbFetch('audit_state?id=eq.1&select=*');
      if(rows===null)break;
      if(!rows.length){ // Zeile fehlt → neu anlegen
        const row=sbRowFrom(vals);row.id=1;row.updated_at=new Date().toISOString();
        const ins=await sbFetch('audit_state',{method:'POST',body:JSON.stringify(row),headers:{'Prefer':'return=representation'}});
        if(Array.isArray(ins)&&ins.length){sbBase=mgClone(vals);sbBaseUpdatedAt=ins[0].updated_at;ok=true;}
        break;
      }
      sbMergeRemote(rows[0]);
    }
  }catch(ex){console.warn('sbPush:',ex);}
  if(ok){
    setSyncState('saved');
    sbWriteLog(mgDescribe(baseBefore,mine));
  }else{
    setSyncState('error');
    sbRetryT=setTimeout(sbPush,15000);
  }
  sbBusy=false;
  if(sbPushAgain){sbPushAgain=false;sbPush();}
}

// Server-Stand übernehmen und mit eigenen, noch nicht gespeicherten Änderungen zusammenführen
function sbMergeRemote(row){
  const remote=sbParseRow(row);
  const first=!sbBase;
  const local=sbCollect();
  // Erster Abgleich nach dem Login: Server-Stand gilt (wie bisher), lokale Kopie nur für fehlende Felder
  const next=first?{...local,...remote}:mgMergeAll(sbBase,local,remote);
  const changes=first?[]:mgDescribe(sbBase,remote);
  const selBefore=selId?JSON.stringify(data.find(e=>e.id===selId)||null):null;
  sbBase=mgClone(remote);sbBaseUpdatedAt=row.updated_at;
  sbApply(next);
  sbRefreshUI();
  if(changes.length)sbNotifyRemote(changes,row.updated_by,selBefore);
}

async function sbPull(){
  if(!sbConnected||sbBusy)return;
  // Zuerst nur den Zeitstempel prüfen (klein), ganze Zeile nur bei Änderungen laden
  if(sbBase){
    const t=await sbFetch('audit_state?id=eq.1&select=updated_at');
    if(!Array.isArray(t)||!t.length||t[0].updated_at===sbBaseUpdatedAt)return;
  }
  if(sbBusy)return;
  sbBusy=true;
  try{
    const rows=await sbFetch('audit_state?id=eq.1&select=*');
    if(Array.isArray(rows)&&rows.length){
      const first=!sbBase;
      sbMergeRemote(rows[0]);
      if(first)setSyncState('saved');
    }else if(Array.isArray(rows)&&!sbBase){
      // Noch keine Daten auf dem Server: eigener Stand wird der erste
      sbBase={};sbBaseUpdatedAt=null;
    }
  }catch(ex){console.warn('sbPull:',ex);}
  sbBusy=false;
  if(sbPushAgain||sbHasPending()){sbPushAgain=false;sbPush();}
}

// Hinweis, wenn jemand anderes etwas geändert hat
function sbNotifyRemote(changes,who,selBefore){
  const name=who&&who!==currentUser?who:'Jemand';
  if(who&&who===currentUser)return; // eigene Änderung von einem anderen Gerät
  const more=changes.length>1?` (+${changes.length-1} weitere)`:'';
  showToast(`☁ ${name}: ${changes[0]}${more}`,4500);
  if(selId&&selBefore!==null){
    const now=JSON.stringify(data.find(e=>e.id===selId)||null);
    if(now!==selBefore){
      const dp=document.getElementById('dp');
      const typing=dp&&dp.contains(document.activeElement)&&/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if(!typing&&data.some(e=>e.id===selId))selEntry(selId);
      setTimeout(()=>showToast(`⚠ Diese Baustelle wurde soeben von ${name} geändert`,4500),4600);
    }
  }
}

// Änderungsprotokoll (für Admins sichtbar, Tabelle audit_log)
async function sbWriteLog(lines){
  if(sbLogMissing||!lines||!lines.length)return;
  const summary=lines.slice(0,15).join('\n')+(lines.length>15?`\n… und ${lines.length-15} weitere`:'');
  const r=await sbFetch('audit_log',{method:'POST',body:JSON.stringify({user_name:currentUser||'',summary}),headers:{'Prefer':'return=minimal'}});
  if(r===null)sbLogMissing=true;
}

// Speicher-Status im Header
function setSyncState(state){sbSync.state=state;if(state==='saved')sbSync.at=Date.now();renderSyncState();}
function renderSyncState(){
  const dot=document.getElementById('sb-dot'),lbl=document.getElementById('sb-indicator-lbl'),box=document.getElementById('sb-indicator');
  const mob=document.getElementById('mob-sync');
  let txt,col,tip;
  if(!sbConnected){txt='Offline';col='#6B7280';tip='Keine Verbindung zur Datenbank – Änderungen nur auf diesem Gerät';}
  else if(sbSync.state==='saving'){txt='Speichert…';col='#FBBF24';tip='Änderungen werden gespeichert';}
  else if(sbSync.state==='error'){txt='⚠ Nicht gespeichert';col='#F87171';tip='Speichern fehlgeschlagen – neuer Versuch läuft automatisch. Klicken = jetzt erneut versuchen';}
  else if(sbSync.at){const s=Math.round((Date.now()-sbSync.at)/1000);txt='Gespeichert ✓';col='#3ECF8E';tip='Zuletzt gespeichert '+(s<60?'vor '+s+' Sek.':new Date(sbSync.at).toLocaleTimeString('de-CH'));}
  else{txt='Live';col='#3ECF8E';tip='Live-Sync aktiv';}
  if(dot)dot.style.background=col;
  if(lbl){lbl.textContent=txt;lbl.style.color=col;}
  if(box)box.title=tip;
  if(mob){mob.textContent=txt;mob.style.color=col;mob.title=tip;}
}
function sbIndicatorClick(){
  if(sbConnected&&sbSync.state==='error'){sbPush();return;}
  if(document.body.classList.contains('admin-mode'))openSupabaseConfig();
  else showToast(document.getElementById('sb-indicator')?.title||'',3000);
}
setInterval(()=>{if(sbSync.state==='saved')renderSyncState();},15000);
window.addEventListener('online',()=>{if(sbConnected)sbPush();});
window.addEventListener('beforeunload',e=>{
  if(sbConnected&&(sbSync.state==='saving'||sbSync.state==='error'||saveT||sbHasPending())){e.preventDefault();e.returnValue='';}
});

// ═══ ADMIN: Anleitung & SQL, Änderungsprotokoll, Verlauf ═══
function admModal(title,html,wide){
  document.getElementById('adm-bg')?.remove();
  const bg=document.createElement('div');bg.id='adm-bg';bg.className='ui-dlg-bg';
  bg.innerHTML=`<div class="ui-dlg adm-guide" style="width:${wide?860:640}px;max-height:90vh;display:flex;flex-direction:column;padding:0">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--bd)"><b style="font-size:16px"></b><button type="button" class="ui-btn" onclick="document.getElementById('adm-bg').remove()">Schliessen</button></div>
    <div id="adm-body" style="overflow:auto;padding:4px 20px 20px">${html}</div></div>`;
  bg.querySelector('b').textContent=title;
  bg.addEventListener('click',e=>{if(e.target===bg)bg.remove();});
  document.body.appendChild(bg);
  return bg.querySelector('#adm-body');
}
function sqlStr(v){return "'"+String(v||'').replace(/'/g,"''")+"'";}
function admSqlBox(id,sql){return`<div class="adm-sql"><pre id="${id}">${escH(sql)}</pre><button type="button" class="ui-btn" onclick="admCopy('${id}',this)">Kopieren</button></div>`;}
async function admCopy(id,btn){
  const txt=document.getElementById(id).textContent;
  try{await navigator.clipboard.writeText(txt);}
  catch(e){const r=document.createRange();r.selectNodeContents(document.getElementById(id));const s=getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');}
  const o=btn.textContent;btn.textContent='✓ Kopiert';setTimeout(()=>btn.textContent=o,1500);
}
function admSnippets(){
  const v=k=>(document.getElementById('adm-'+k)?.value||'').trim();
  const E=sqlStr(v('email')||'vorname.nachname@anliker.ch'),N=sqlStr(v('name')||'Vorname Nachname'),P=sqlStr(v('pw')||'Start-Passwort-2026');
  return{
    create:`update auth.users\nset raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)\n  || jsonb_build_object('display_name', ${N}, 'must_change_password', true)\nwhere email = ${E};`,
    reset:`update auth.users\nset encrypted_password = extensions.crypt(${P}, extensions.gen_salt('bf')),\n    raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)\n      || '{"must_change_password": true}'::jsonb\nwhere email = ${E};`,
    rename:`update auth.users\nset raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)\n  || jsonb_build_object('display_name', ${N})\nwhere email = ${E};`,
    ban:`update auth.users set banned_until = 'infinity' where email = ${E};`,
    unban:`update auth.users set banned_until = null where email = ${E};`,
    list:`select email,\n       raw_user_meta_data ->> 'display_name' as name,\n       last_sign_in_at as letzter_login,\n       banned_until as gesperrt_bis\nfrom auth.users\norder by email;`,
    addAdmin:`insert into public.app_admins (email) values (${E}) on conflict do nothing;`,
    removeAdmin:`delete from public.app_admins where email = ${E};`,
    listAdmins:`select email from public.app_admins order by email;`,
    size:`select pg_size_pretty(pg_total_relation_size('public.audit_state')) as daten,\n       pg_size_pretty(pg_total_relation_size('public.audit_state_history')) as verlauf,\n       pg_size_pretty(pg_total_relation_size('public.audit_log')) as protokoll;`
  };
}
function admUpdateSnippets(){const s=admSnippets();for(const k in s){const el=document.getElementById('adm-sql-'+k);if(el)el.textContent=s[k];}}
async function openAdminGuide(){
  const s=admSnippets();
  const body=admModal('Anleitung & SQL (Admin)',`
    <p>Die SQL-Befehle werden in Supabase ausgeführt: Projekt öffnen → links <b>SQL Editor</b> → <b>New query</b> → Befehl einfügen → <b>Run</b>.</p>
    <h3>1. Einmalige Einrichtung <span id="adm-setup-st" style="font-weight:400;font-size:12px"></span></h3>
    <ol>
      <li><b>Registrierung abschalten</b> (wichtig): Supabase → <b>Authentication</b> → <b>Sign In / Providers</b> → «Allow new users to sign up» <b>ausschalten</b> → Save. Sonst könnte sich jede Person selbst ein Konto anlegen und hätte damit Zugriff auf alle Daten.</li>
      <li><b>Datenbank einrichten</b>: folgendes Skript einmal ausführen (Admins, automatischer Verlauf, Änderungsprotokoll). Bestehende Daten bleiben unverändert; mehrmaliges Ausführen schadet nicht.</li>
    </ol>
    <div id="adm-setup-sql"><p>Lade Skript…</p></div>
    <h3>Angaben für die Befehle unten</h3>
    <p>Hier ausfüllen – die Befehle passen sich automatisch an.</p>
    <div class="adm-fields">
      <input id="adm-email" placeholder="E-Mail, z.B. vorname.nachname@anliker.ch" oninput="admUpdateSnippets()">
      <input id="adm-name" placeholder="Name genau wie im Planer, z.B. Niklaus Meier" oninput="admUpdateSnippets()">
      <input id="adm-pw" placeholder="Start-Passwort (mind. 8 Zeichen)" oninput="admUpdateSnippets()">
    </div>
    <h3>2. Neuen Benutzer anlegen</h3>
    <ol>
      <li>Im Planer: Admin → <b>Auditoren verwalten</b> → Person mit vollem Namen erfassen (falls noch nicht vorhanden).</li>
      <li>Supabase → <b>Authentication</b> → <b>Users</b> → <b>Add user</b> → <b>Create new user</b> → E-Mail und Start-Passwort eingeben, «Auto Confirm User» anhaken → Create user.</li>
      <li>Dann diesen Befehl ausführen. Er setzt den Namen (muss genau dem Namen im Planer entsprechen) und verlangt beim ersten Login ein neues Passwort:</li>
    </ol>
    ${admSqlBox('adm-sql-create',s.create)}
    <h3>3. Passwort zurücksetzen</h3>
    <p>Setzt ein neues Start-Passwort. Beim nächsten Login muss die Person ein eigenes Passwort wählen. Das Start-Passwort persönlich oder per Telefon mitteilen, nicht per E-Mail.</p>
    ${admSqlBox('adm-sql-reset',s.reset)}
    <h3>4. Namen ändern</h3>
    ${admSqlBox('adm-sql-rename',s.rename)}
    <h3>5. Benutzer sperren / entsperren / löschen</h3>
    <p>Sperren (z.B. bei Austritt). Eine bereits angemeldete Person wird spätestens nach einer Stunde abgemeldet.</p>
    ${admSqlBox('adm-sql-ban',s.ban)}
    <p>Wieder entsperren:</p>
    ${admSqlBox('adm-sql-unban',s.unban)}
    <p>Endgültig löschen: Supabase → <b>Authentication</b> → <b>Users</b> → bei der Person auf <b>…</b> → <b>Delete user</b>. Die Planungsdaten bleiben erhalten.</p>
    <h3>6. Alle Benutzer anzeigen</h3>
    ${admSqlBox('adm-sql-list',s.list)}
    <h3>7. Admins verwalten</h3>
    <p>Admins sehen das Admin-Menü, das Änderungsprotokoll und den Verlauf. Admin hinzufügen (E-Mail oben ausfüllen):</p>
    ${admSqlBox('adm-sql-addAdmin',s.addAdmin)}
    <p>Admin entfernen:</p>
    ${admSqlBox('adm-sql-removeAdmin',s.removeAdmin)}
    <p>Alle Admins anzeigen:</p>
    ${admSqlBox('adm-sql-listAdmins',s.listAdmins)}
    <h3>8. Speicherplatz prüfen</h3>
    <p>Im kostenlosen Supabase-Plan stehen 500 MB zur Verfügung.</p>
    ${admSqlBox('adm-sql-size',s.size)}
    <h3>9. Routen-Schlüssel (echte Fahrzeiten im Tourguide)</h3>
    <p>Ohne Schlüssel schätzt der Tourguide Fahrzeiten aus der Luftlinie – über Seen und Berge oft ungenau. Mit Schlüssel rechnet er über das Strassennetz. Einrichten: Admin → <b>Routen-Schlüssel (Fahrzeit)</b> – dort steht die Schritt-für-Schritt-Anleitung, der Schlüssel wird beim Speichern automatisch geprüft. Kostenlos (Tageslimit 500 Abfragen, eine Abfrage pro Tourguide-Vorschlag). Status: <span id="adm-ors-st"></span></p>
    <h3>Sicherung & Wiederherstellung</h3>
    <p>Der Planer sichert frühere Stände automatisch (stündlich und vor grösseren Löschungen, 30 Tage lang). Zurückholen: Admin → <b>Verlauf & Wiederherstellen</b>. Zusätzlich kann jederzeit unter Admin → <b>Notfall-Backup</b> eine Sicherungsdatei heruntergeladen werden.</p>
  `);
  // Setup-Skript aus dem Repository laden und Status prüfen
  try{
    const r=await fetch('supabase/setup.sql',{cache:'no-store'});
    if(!r.ok)throw new Error(r.status);
    const sql=await r.text();
    document.getElementById('adm-setup-sql').innerHTML=admSqlBox('adm-sql-setup',sql);
  }catch(e){document.getElementById('adm-setup-sql').innerHTML='<p class="adm-note">Skript konnte nicht geladen werden. Es liegt im Repository unter supabase/setup.sql.</p>';}
  const os=document.getElementById('adm-ors-st');if(os)os.innerHTML=window._orsKey?'<span style="color:#10B981">✓ hinterlegt</span>':'<span style="color:#D97706">– noch keiner hinterlegt</span>';
  const ok=sbConnected?await sbFetch('rpc/is_app_admin',{method:'POST',body:'{}'}):null;
  const st=document.getElementById('adm-setup-st');
  if(st)st.innerHTML=ok===null?'<span style="color:#D97706">– noch nicht eingerichtet</span>':'<span style="color:#10B981">✓ Datenbank eingerichtet</span>';
}

async function openAuditLog(){
  const body=admModal('Änderungsprotokoll','<p>Lade…</p>',true);
  const rows=await sbFetch('audit_log?select=ts,user_name,user_email,summary&order=ts.desc&limit=500');
  if(!Array.isArray(rows)){body.innerHTML='<p class="adm-note">Das Protokoll ist noch nicht verfügbar. Bitte zuerst die einmalige Einrichtung ausführen (Admin → Anleitung & SQL).</p>';return;}
  body.innerHTML=`<p>Wer hat wann was geändert (letzte 500 Einträge).</p><input id="adm-log-q" class="ui-dlg-inp" placeholder="Suchen (Name, Baustelle …)" oninput="admRenderLog()"><div id="adm-log-list"></div>`;
  window._admLog=rows;admRenderLog();
}
function admRenderLog(){
  const q=(document.getElementById('adm-log-q')?.value||'').toLowerCase();
  const rows=(window._admLog||[]).filter(r=>!q||(r.user_name+' '+r.user_email+' '+r.summary).toLowerCase().includes(q));
  document.getElementById('adm-log-list').innerHTML=rows.length?`<table class="adm-tbl"><tr><th>Zeit</th><th>Wer</th><th>Was</th></tr>${rows.map(r=>`<tr><td style="white-space:nowrap">${escH(new Date(r.ts).toLocaleString('de-CH'))}</td><td>${escH(r.user_name||r.user_email||'?')}</td><td class="sum">${escH(r.summary)}</td></tr>`).join('')}</table>`:'<p>Keine Einträge.</p>';
}

async function openHistory(){
  const body=admModal('Verlauf & Wiederherstellen','<p>Lade…</p>',true);
  const rows=await sbFetch('audit_state_history?select=hid,changed_at,changed_by&order=changed_at.desc&limit=300');
  if(!Array.isArray(rows)){body.innerHTML='<p class="adm-note">Der Verlauf ist noch nicht verfügbar. Bitte zuerst die einmalige Einrichtung ausführen (Admin → Anleitung & SQL).</p>';return;}
  body.innerHTML=`<p>Frühere Stände der Daten (automatisch gespeichert: stündlich und vor grösseren Löschungen, 30 Tage lang). Jeder Eintrag ist der Stand <b>vor</b> einer Änderung.</p>
    ${rows.length?`<table class="adm-tbl"><tr><th>Stand vom</th><th>Danach geändert von</th><th></th></tr>${rows.map(r=>`<tr><td>${escH(new Date(r.changed_at).toLocaleString('de-CH'))}</td><td>${escH(r.changed_by||'?')}</td><td style="text-align:right"><button type="button" class="ui-btn" onclick="admShowSnapshot(${+r.hid})">Ansehen</button></td></tr>`).join('')}</table>`:'<p>Noch keine gespeicherten Stände – der erste entsteht bei der nächsten Änderung.</p>'}
    <div id="adm-snap"></div>`;
}
async function admShowSnapshot(hid){
  const box=document.getElementById('adm-snap');box.innerHTML='<p>Lade…</p>';
  const rows=await sbFetch('audit_state_history?select=hid,changed_at,snapshot&hid=eq.'+hid);
  if(!Array.isArray(rows)||!rows.length){box.innerHTML='<p class="adm-note">Konnte nicht geladen werden.</p>';return;}
  const vals=sbParseRow(rows[0].snapshot||{}),cur=sbCollect();
  const cnt=v=>Array.isArray(v)?v.length:(v&&typeof v==='object'?Object.keys(v).length:'–');
  const lines=Object.keys(vals).filter(f=>Array.isArray(vals[f])).map(f=>`<tr><td>${f==='data'?'Baustellen':(MG_LABELS[f]||f)}</td><td>${cnt(vals[f])}</td><td>${cnt(cur[f])}</td></tr>`).join('');
  const diff=mgDescribe(vals,cur);
  window._admSnap={vals,at:rows[0].changed_at};
  box.innerHTML=`<h3>Stand vom ${escH(new Date(rows[0].changed_at).toLocaleString('de-CH'))}</h3>
    <table class="adm-tbl"><tr><th></th><th>Damals</th><th>Heute</th></tr>${lines}</table>
    <p style="margin-top:10px"><b>Seither geändert:</b></p><div class="adm-tbl"><div class="sum" style="white-space:pre-line;font-size:12px;color:var(--tx2);max-height:160px;overflow:auto">${escH(diff.slice(0,60).join('\n')||'keine Unterschiede')}${diff.length>60?`\n… und ${diff.length-60} weitere`:''}</div></div>
    <p style="margin-top:12px"><button type="button" class="ui-btn ui-btn-pri ui-btn-danger" onclick="admRestoreSnapshot()">Diesen Stand wiederherstellen</button></p>`;
  box.scrollIntoView({behavior:'smooth'});
}
async function admRestoreSnapshot(){
  const s=window._admSnap;if(!s)return;
  if(!await askConfirm(`Stand vom ${new Date(s.at).toLocaleString('de-CH')} wiederherstellen?\n\nAlle Änderungen seither werden für alle Benutzer zurückgenommen. Vorher wird automatisch eine Sicherung des aktuellen Stands heruntergeladen.`,{ok:'Wiederherstellen',danger:true}))return;
  teamExport();
  undoPoint('Stand vom '+new Date(s.at).toLocaleString('de-CH')+' wiederhergestellt');
  sbApply(s.vals);saveNow();sbRefreshUI();
  document.getElementById('adm-bg')?.remove();
}

function startSBPoll(){
  if(sbPollTimer)clearInterval(sbPollTimer);
  sbPollTimer=setInterval(()=>sbPull(),30000); // poll every 30s
}

function openSupabaseConfig(){
  document.getElementById('sb-url').value=sbUrl;
  document.getElementById('sb-key').value=sbKey;
  document.getElementById('sb-test-result').style.display='none';
  document.getElementById('sb-bg').style.display='flex';
}

async function testSupabase(){
  const url=document.getElementById('sb-url').value.trim();
  const key=document.getElementById('sb-key').value.trim();
  const res=document.getElementById('sb-test-result');
  res.style.display='block';res.style.background='#FEF3C7';res.textContent='Verbindung wird getestet...';
  try{
    const r=await fetch(url+'/rest/v1/audit_state?select=id&limit=1',
      {headers:{'apikey':key,'Authorization':'Bearer '+key}});
    if(r.ok||r.status===406){
      res.style.background='#D1FAE5';res.textContent='✓ Verbindung erfolgreich!';
    } else if(r.status===401){
      res.style.background='#FEE2E2';res.textContent='✗ Ungültiger API-Key';
    } else {
      res.style.background='#FEE2E2';res.textContent='✗ Fehler: '+r.status+' – Tabelle "audit_state" existiert noch nicht (wird beim Verbinden erstellt)';
    }
  }catch(ex){res.style.background='#FEE2E2';res.textContent='✗ Keine Verbindung: '+ex.message;}
}

async function saveSupabaseConfig(){
  sbUrl=document.getElementById('sb-url').value.trim().replace(/\/$/,'');
  sbKey=document.getElementById('sb-key').value.trim();
  localStorage.setItem(SB_URL_KEY,sbUrl);
  localStorage.setItem(SB_KEY_KEY,sbKey);
  document.getElementById('sb-bg').style.display='none';
  sbBase=null;sbBaseUpdatedAt=null; // neue Verbindung: Server-Stand neu übernehmen
  await sbInit();
  if(sbConnected){
    showToast('☁ Supabase verbunden – Live-Sync aktiv!',3000);
    await sbPush(); // push current data to Supabase
  } else {
    showToast('⚠ Verbindung fehlgeschlagen – prüfe URL und Key',4000);
  }
}

// ═══ SWISSTOPO GEOCODING (offiziell, kostenlos, CH-Adressen perfekt) ═══
// LV95 → WGS84 Umrechnung
function lv95toWGS84(E,N){
  const e=(E-2600000)/1000000;
  const n=(N-1200000)/1000000;
  const lngGon=2.6779094+4.728982*e+0.791484*e*n+0.1306*e*n*n-0.0436*e*e*e;
  const latGon=16.9023892+3.238272*n-0.270978*e*e-0.002528*n*n-0.0447*e*e*n-0.014*n*n*n;
  return{lat:latGon*100/36,lng:lngGon*100/36};
}
async function nominatimGeocode(addr){
  if(!addr||addr.length<4)return null;
  const clean=addr.replace(/,/g,' ').replace(/\s+/g,' ').trim();
  // Extract PLZ for sanity-checking results against expected area
  const plzMatch=clean.match(/\b(\d{4})\b/);
  const plzNum=plzMatch?+plzMatch[1]:null;
  const plzGeo=plzNum?PLZ[plzNum]:null;
  // Try with full address, then without housenumber
  const queries=[clean];
  const noNr=clean.replace(/\b\d{1,3}\b/,'').replace(/\s+/g,' ').trim();
  if(noNr!==clean)queries.push(noNr);
  for(const q of queries){
    try{
      const url=`https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&searchText=${encodeURIComponent(q)}&limit=3&sr=4326`;
      const resp=await fetch(url,{mode:'cors'});
      if(resp.ok){
        const j=await resp.json();
        if(j.results&&j.results.length>0){
          // Try each result, pick first that's plausible (close to PLZ center)
          for(const res of j.results){
            const r=res.attrs;
            let cand=null;
            if(r.lat&&r.lon&&+r.lat>45&&+r.lat<48)cand={lat:+r.lat,lng:+r.lon};
            else if(r.y&&r.x)cand=lv95toWGS84(r.y,r.x);
            if(!cand)continue;
            // Sanity check: must be within ~12km of expected PLZ area
            if(plzGeo){
              const dist=Math.sqrt((cand.lat-plzGeo.lat)**2+(cand.lng-plzGeo.lng)**2);
              if(dist>0.12){
                console.warn('Swisstopo-Ergebnis zu weit von PLZ entfernt, verworfen:',addr,'→',cand,'dist:',dist.toFixed(3));
                continue; // try next result
              }
            }
            return cand;
          }
        }
      }
    }catch(ex){}
    await new Promise(r=>setTimeout(r,100));
  }
  // Fallback: PLZ
  if(plzGeo)return{lat:plzGeo.lat+(Math.random()-.5)*.002,lng:plzGeo.lng+(Math.random()-.5)*.002};
  return null;
}

// ═══ EXCEL IMPORT ═══



function doExport(){
  if(!data.length){showToast('Keine Daten');return;}
  const yr=new Date().getFullYear();
  const maxKW=52;
  // Build header row: fixed cols + KW1..KW52
  const kwCols=Array.from({length:maxKW},(_,i)=>`KW${i+1}`);
  const header=['PSP','Name','Abteilung','PrV','BC','Adresse','Typ','Rhythmus','Letztes Audit','Status',...kwCols];
  const rows=[header];
  // Sort by dept then name
  const sorted=[...data].sort((a,b)=>{
    if((a.dept||'')!==(b.dept||''))return(a.dept||'').localeCompare(b.dept||'');
    return a.name.localeCompare(b.name);
  });
  sorted.forEach(e=>{
    const row=[e.psp||'',e.name,e.dept||'',e.prv||'',e.bc||'',e.addr||'',e.type||'baustelle',e.rhythm||28,e.lastAudit||'',status(e)];
    // Fill KW columns
    for(let kw=1;kw<=maxKW;kw++){
      const kwDate=kwToDate(kw,yr);
      const kwDateEnd=kwToDate(kw+1,yr);
      // Check audit history
      const audit=(e.auditHistory||[]).find(h=>h.kw===kw||(h.date&&h.date>=kwDate&&h.date<kwDateEnd));
      // Check plans
      const plan=plans.find(p=>p.bsId===e.id&&p.date>=kwDate&&p.date<kwDateEnd);
      if(audit){
        const code=audCode(audit.auditor||'XX');
        row.push(code);
      } else if(plan){
        const code=audCode(plan.auditor||'?')+'*';
        row.push(code);
      } else {
        row.push('');
      }
    }
    rows.push(row);
  });
  // Create workbook
  const ws=XLSX.utils.aoa_to_sheet(rows);
  // Style: freeze first 4 cols and header row
  ws['!freeze']={xSplit:4,ySplit:1};
  // Column widths
  ws['!cols']=[
    {wch:10},{wch:30},{wch:22},{wch:16},{wch:16},{wch:28},{wch:10},{wch:8},{wch:12},{wch:10},
    ...Array(maxKW).fill({wch:5})
  ];
  const wb2=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb2,ws,`Jahresübersicht ${yr}`);
  // Second sheet: simple baustellen list
  const listHeader=['PSP','Name','Abteilung','PrV','BC','Adresse','Typ','Rhythmus','Letztes Audit','Auditor','Status','Aktiv','Pausiert'];
  const listRows=[listHeader];
  sorted.forEach(e=>listRows.push([e.psp||'',e.name,e.dept||'',e.prv||'',e.bc||'',e.addr||'',e.type||'baustelle',e.rhythm||28,e.lastAudit||'',e.auditor||'',status(e),e.active?'Ja':'Nein',e.paused?'Ja':'Nein']));
  const ws2=XLSX.utils.aoa_to_sheet(listRows);
  ws2['!cols']=[{wch:10},{wch:30},{wch:22},{wch:16},{wch:16},{wch:28},{wch:10},{wch:8},{wch:12},{wch:16},{wch:10},{wch:6},{wch:8}];
  XLSX.utils.book_append_sheet(wb2,ws2,'Baustellen');
  XLSX.writeFile(wb2,`audit_jahresuebersicht_${yr}_${today()}.xlsx`);
  showToast('✓ Excel exportiert',2000);
}
// ═══ MERGE ═══








// ═══ EXCEL OVERVIEW ═══
let AUD_CODES=JSON.parse(localStorage.getItem('aud_codes')||'{"Alain Groelly":"AG","René Rottenberger":"RR","Niklaus Meier":"NM","Matthias Knotz":"MK"}');
function saveAudCodes(){localStorage.setItem('aud_codes',JSON.stringify(AUD_CODES));if(sbConnected)sbPush();}
function audCode(a){return AUD_CODES[a]||(a?a.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2):'XX');}

function buildXLFilter(){
  const el=document.getElementById('xl-dept-filter');if(!el)return;
  const cur=el.value;
  const depts=getAllDepts();
  el.innerHTML='<option value="">Alle Abteilungen</option>'+depts.map(d=>`<option value="${d}">${d}</option>`).join('');
  if(depts.includes(cur))el.value=cur;
}

function renderXL(){
  try{
  const yr=2026;
  const dept=document.getElementById('xl-dept-filter')?.value||'';
  const kws=Array.from({length:52},(_,i)=>i+1);
  const todKW=dateToKW(today());
  let entries=data.filter(e=>e.active||e.paused);
  if(dept)entries=entries.filter(e=>e.dept===dept);
  entries.sort((a,b)=>{if(a.dept!==b.dept)return(a.dept||'').localeCompare(b.dept||'');return a.name.localeCompare(b.name);});
  const dbg=document.getElementById('xl-debug');
  if(dbg)dbg.textContent=data.length+' Baustellen · '+entries.length+' angezeigt';
  if(!entries.length){
    document.getElementById('xl-head').innerHTML='';
    document.getElementById('xl-body').innerHTML=`<tr><td colspan="60" style="padding:20px;text-align:center;color:#6B7280">
      ${data.length===0?'Keine Daten – Baustelle erfassen oder Backup laden.':'Keine Baustellen für diese Abteilung.'}
    </td></tr>`;
    return;
  }
  const thS='padding:3px 2px;border:1px solid #d1d5db;text-align:center;font-weight:700;font-size:10px;background:#F3F4F6;color:#374151;position:sticky;top:0;z-index:2';
  const kwH=kws.map(kw=>{
    const isCur=kw===todKW;
    return`<th style="${thS}${isCur?';background:#DBEAFE;color:#1D4ED8':''};width:26px;min-width:26px">${kw}</th>`;
  }).join('');
  document.getElementById('xl-head').innerHTML=`<tr>
    <th style="${thS};text-align:left;min-width:170px;position:sticky;left:0;z-index:4;background:#F3F4F6">Baustelle</th>
    <th style="${thS};min-width:90px;position:sticky;left:170px;z-index:4;background:#F3F4F6">Abteilung</th>
    <th style="${thS};min-width:55px;position:sticky;left:260px;z-index:4;background:#F3F4F6">PrV</th>
    <th style="${thS};min-width:70px;position:sticky;left:315px;z-index:4;background:#F3F4F6">BC</th>
    ${kwH}</tr>`;
  // Use reduce to track lastDept and rowIndex across rows
  let rowIdx=0;
  const rows=entries.reduce((acc,e)=>{
    // Dept separator
    if(e.dept!==acc.lastDept){
      acc.lastDept=e.dept;
      acc.html+=`<tr><td colspan="${kws.length+4}" style="padding:3px 8px;background:#E5E7EB;font-size:11px;font-weight:700;color:#374151;border:1px solid #d1d5db;position:sticky;left:0">${e.dept||'—'}</td></tr>`;
      rowIdx=0;
    }
    const isEven=rowIdx%2===0;
    const zebraColor=isEven?'#fff':'#F8F9FC';
    rowIdx++;
    // KW cells
    const cells=kws.map(kw=>{
      const kwS=kwToDate(kw,yr),kwE=kwToDate(kw+1,yr);
      const isCur=kw===todKW;
      const ah=(e.auditHistory||[]).find(h=>h.kw===kw||(h.date&&h.date>=kwS&&h.date<kwE));
      const pl=plans.find(p=>p.bsId===e.id&&p.date>=kwS&&p.date<kwE);
      let cell='',bg=isCur?'#EFF6FF':zebraColor,col='#111',fw='400';
      if(ah){cell=audCode(ah.auditor);bg='#1A1D2E';col='#fff';fw='700';}
      else if(pl){cell=audCode(pl.auditor)+(pl.auditor&&pl.auditor!=='Unbekannt'?'*':'?');bg='#EDE9FE';col='#5B21B6';fw='600';}
      return`<td style="padding:1px;border:1px solid ${isCur?'#93C5FD':'#e5e7eb'};text-align:center;font-size:9px;font-weight:${fw};background:${bg};color:${col};width:26px;min-width:26px" title="${ah?fd(ah.date)+' '+(ah.auditor||'XX'):pl?'Geplant '+fd(pl.date)+' '+pl.auditor:''}">${cell}</td>`;
    }).join('');
    const rb=e.paused?'opacity:.55':'';
    const sB=`padding:3px 6px;border:1px solid #e5e7eb;font-size:11px;background:${zebraColor};position:sticky;z-index:1`;
    acc.html+=`<tr style="${rb}">
      <td style="${sB};left:0;font-weight:500;overflow:hidden;text-overflow:ellipsis;max-width:170px" title="${e.name}">${e.type==='werkhof'?'🏠 ':e.type==='gu'?'◆ ':''}${e.name}${e.paused?' ⏸':''}</td>
      <td style="${sB};left:170px;color:#6B7280;font-size:10px;max-width:90px;overflow:hidden;text-overflow:ellipsis">${(e.dept||'').split(' + ')[0].replace('Niederlassung ','NL ').replace('Erneuerungsbau ','EB ').replace('Hochbau ','HB ')}</td>
      <td style="${sB};left:260px;color:#6B7280;font-size:10px">${e.prv||''}</td>
      <td style="${sB};left:315px;color:#6B7280;font-size:10px">${e.bc||''}</td>
      ${cells}</tr>`;
    return acc;
  },{html:'',lastDept:''});
  document.getElementById('xl-body').innerHTML=rows.html;
  }catch(err){
    console.error('renderXL error:',err);
    const b=document.getElementById('xl-body');
    if(b)b.innerHTML='<tr><td style="padding:20px;color:red;font-size:13px" colspan="60">Fehler: '+err.message+'</td></tr>';
  }
}

// ═══ FORM HELPERS ═══
function onTypeChange(){
  const t=document.getElementById('f-type').value;
  const rh=document.getElementById('f-rh');
  setDefaultRhythm(t);
  // Auto-set dept if type changed
  if(t==='werkhof'){
    const deptEl=document.getElementById('f-dept');
    if(deptEl&&!deptEl.value){
      const whOpt=[...deptEl.options].find(o=>o.text.toLowerCase().includes('werkhof'));
      if(whOpt)deptEl.value=whOpt.value;
    }
  }
}
function onDeptChange(){
  const dept=document.getElementById('f-dept').value;
  if(dept.toLowerCase().includes('werkhof')){
    document.getElementById('f-type').value='werkhof';
    document.getElementById('f-rh').value='182';
  } else if(dept.toLowerCase().includes('generalunternehm')){
    document.getElementById('f-type').value='gu';
    document.getElementById('f-rh').value='42';
  }
}
let _addrTimer=null;
async function addrAutocomplete(q,prefix){
  prefix=prefix||'f';
  const hint=document.getElementById(prefix+'-addr-hint');
  const sug=document.getElementById(prefix==='f'?'addr-suggestions':prefix+'-addr-suggestions');
  if(!q||q.length<4){if(sug)sug.style.display='none';if(hint)hint.textContent='';return;}
  if(_addrTimer)clearTimeout(_addrTimer);
  _addrTimer=setTimeout(async()=>{
    try{
      const url=`https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&searchText=${encodeURIComponent(q)}&limit=6&sr=4326`;
      const resp=await fetch(url,{mode:'cors'});
      if(!resp.ok)return;
      const j=await resp.json();
      if(!j.results||!j.results.length){if(sug)sug.style.display='none';return;}
      sug.innerHTML=j.results.map(r=>{
        const label=mgSafe(r.attrs.label?.replace(/<[^>]+>/g,'')||r.attrs.detail||q);
        return`<div onclick="selectAddr('${label}',${+r.attrs.lat||0},${+r.attrs.lon||0},'${prefix}')" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid var(--bd);hover:background:var(--sf2)"
          onmouseover="this.style.background='var(--sf2)'" onmouseout="this.style.background=''">${label}</div>`;
      }).join('');
      sug.style.display='block';
      if(hint)hint.textContent='↓ Vorschläge von Swisstopo';
    }catch(ex){if(sug)sug.style.display='none';}
  },350);
}
function selectAddr(label,lat,lng,prefix){
  prefix=prefix||'f';
  document.getElementById(prefix+'-addr').value=label;
  const sug=document.getElementById(prefix==='f'?'addr-suggestions':prefix+'-addr-suggestions');
  if(sug)sug.style.display='none';
  const hint=document.getElementById(prefix+'-addr-hint');
  if(hint)hint.textContent=lat?`✓ ${lat.toFixed(4)}, ${lng.toFixed(4)}`:'';
  if(prefix==='f'){window._pendingLat=lat||null;window._pendingLng=lng||null;}
  else if(prefix==='pop'){window._popPendingLat=lat||null;window._popPendingLng=lng||null;}
  else if(prefix==='rp'){window._rpPendingLat=lat||null;window._rpPendingLng=lng||null;}
  else if(prefix==='rpe'){window._rpePendingLat=lat||null;window._rpePendingLng=lng||null;}
  else{window._paPendingLat=lat||null;window._paPendingLng=lng||null;}
}

// ═══ OUTLOOK / ICS EXPORT ═══
function makeICS(events){
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Anliker Audit Planer//DE','CALSCALE:GREGORIAN','METHOD:PUBLISH'];
  events.forEach(ev=>{
    const fmtDT=dt=>{const d=parseDate(dt);const pad=n=>String(n).padStart(2,'0');return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate());};
    const startAddr=localStorage.getItem('audit_start')||'';
    const mapsUrl=ev.addrs.length>0?'https://www.google.com/maps/dir/'+(startAddr?encodeURIComponent(startAddr)+'/':'')+ev.addrs.map(a=>encodeURIComponent(a)).join('/')+(startAddr?'/'+encodeURIComponent(startAddr):''):'';
    const desc=ev.items.map((it,i)=>`${i+1}. ${it.name} – ${it.addr} (${it.dept})`).join('\n')+(mapsUrl?`\n\n📍 Google Maps Route:\n${mapsUrl}`:'');
    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART:${fmtDT(ev.date)}T050000Z`);
    lines.push(`DTEND:${fmtDT(ev.date)}T150000Z`);
    lines.push(`SUMMARY:${ev.title}`);
    lines.push(`DESCRIPTION:${desc.replace(/\n/g,'\\n')}`);
    lines.push(`LOCATION:${ev.items[0]?.addr||''}`);
    lines.push(`UID:anliker-audit-${ev.date}-${Date.now()}@anliker.ch`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function dlICS(content,filename){
  const blob=new Blob([content],{type:'text/calendar;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();
}

function openICSDialog(){
  const audSel=document.getElementById('ics-aud');
  audSel.innerHTML='<option value="">Alle Auditoren</option>'+auditors.map(a=>`<option value="${a}"${a===currentUser?' selected':''}>${a}</option>`).join('');
  const curKW=dateToKW(today());
  const kwSel=document.getElementById('ics-kw');
  kwSel.innerHTML='';
  for(let i=-1;i<=8;i++){
    const kw=Math.max(1,Math.min(52,curKW+i));
    const d=parseDate(kwToDate(kw));
    const opt=document.createElement('option');
    opt.value=kw;
    opt.textContent=`KW ${kw} (${d.getDate()}.${d.getMonth()+1}.)${i===0?' ← aktuell':''}`;
    if(i===0)opt.selected=true;
    kwSel.appendChild(opt);
  }
  document.getElementById('ics-bg').style.display='flex';
  icsUpdateDayPicker();
}

// Baut die Mo-Fr Tages-Buttons für die gerade gewählte Kalenderwoche (nicht mehr fest "heute") -
// Planer heisst Planer, weil man ja meist im Voraus für kommende Tage exportiert, nicht nur für heute.
function icsUpdateDayPicker(){
  const mode=document.querySelector('[name=ics-mode]:checked').value;
  const row=document.getElementById('ics-day-row');
  row.style.display=mode==='day'?'block':'none';
  if(mode!=='day')return;
  const kw=+document.getElementById('ics-kw').value;
  const monday=parseDate(kwToDate(kw));
  const names=['Mo','Di','Mi','Do','Fr'];
  const todayStr=today();
  const picker=document.getElementById('ics-day-picker');
  const dates=names.map((_,i)=>{const d=new Date(monday.getTime()+i*86400000);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');});
  const already=picker.dataset.selected;
  const sel=(already&&dates.includes(already))?already:(dates.includes(todayStr)?todayStr:dates[0]);
  picker.dataset.selected=sel;
  picker.innerHTML=names.map((n,i)=>{
    const dt=dates[i];const d=parseDate(dt);const isToday=dt===todayStr;
    return`<button type="button" onclick="icsPickDay('${dt}')" style="flex:1;padding:8px 4px;border-radius:6px;border:1px solid ${dt===sel?'var(--blue)':'var(--bd)'};background:${dt===sel?'var(--blue)':'var(--sf2)'};color:${dt===sel?'#fff':'var(--tx)'};font-size:11px;font-weight:600;cursor:pointer">${n}${isToday?' •':''}<br><span style="font-weight:400;font-size:10px">${d.getDate()}.${d.getMonth()+1}.</span></button>`;
  }).join('');
}
function icsPickDay(dt){
  document.getElementById('ics-day-picker').dataset.selected=dt;
  icsUpdateDayPicker();
}

function doICSExport(){
  const aud=document.getElementById('ics-aud').value;
  const mode=document.querySelector('[name=ics-mode]:checked').value;
  const kw=+document.getElementById('ics-kw').value;
  document.getElementById('ics-bg').style.display='none';
  if(mode==='day'){
    const picked=document.getElementById('ics-day-picker').dataset.selected||today();
    exportICSDay(aud,kw,picked);
  } else {
    exportICSWeek(aud,kw);
  }
}

function exportICSDay(audFilter,kw,pickedDate){
  const targetDate=pickedDate||today();
  let dayPlans=plans.filter(p=>p.date===targetDate);
  if(audFilter)dayPlans=dayPlans.filter(p=>p.auditor===audFilter);
  let dayBeratPlans=beratPlan.filter(p=>p.date===targetDate);
  if(audFilter)dayBeratPlans=dayBeratPlans.filter(p=>p.auditor===audFilter);
  let dayPersonAudits=personAudits.filter(p=>p.planned&&p.date===targetDate);
  if(audFilter)dayPersonAudits=dayPersonAudits.filter(p=>p.auditor===audFilter);
  let dayRapp=rapporte.filter(r=>r.planned&&r.date===targetDate);
  if(audFilter)dayRapp=dayRapp.filter(r=>(r.auditors||[]).includes(audFilter));
  if(!dayPlans.length&&!dayBeratPlans.length&&!dayPersonAudits.length&&!dayRapp.length){showToast('Keine Planungen für diesen Tag');return;}
  const items=dayPlans.map(p=>{const e=data.find(x=>x.id===p.bsId);return e?{name:e.name,addr:e.addr||'',dept:e.dept||'',auditor:p.auditor}:null;}).filter(Boolean);
  const beratItems2=dayBeratPlans.map(p=>{const e=data.find(x=>x.id===p.bsId);return e?{name:'💬 '+e.name+(p.note?' ('+p.note+')':''),addr:e.addr||'',dept:e.dept||'',auditor:p.auditor}:null;}).filter(Boolean);
  const personItems=dayPersonAudits.map(p=>({name:'👤 '+p.person+(p.bs?' – '+p.bs:'')+(p.note?' ('+p.note+')':''),addr:p.addr||'',dept:p.kat||'',auditor:p.auditor}));
  const rappItems=dayRapp.map(r=>({name:'📋 '+r.type+(r.time?' '+r.time+' Uhr':'')+(r.dept?' – '+r.dept:''),addr:r.addr||r.ort||'',dept:r.dept||'',auditor:(r.auditors||[]).join(', ')}));
  const allItems=[...rappItems,...items,...beratItems2,...personItems];
  const audLabel=audFilter||allItems[0]?.auditor||'Auditor';
  const addrs=allItems.map(i=>i.addr).filter(Boolean);
  const d=parseDate(targetDate);
  const event={date:targetDate,title:`Audit-Route ${d.toLocaleDateString('de-CH',{weekday:'short',day:'2-digit',month:'2-digit'})} – ${audLabel} (${allItems.length} Termine)`,items:allItems,addrs};
  dlICS(makeICS([event]),`audit_route_${targetDate}.ics`);
  showToast('📅 Tagesroute → Outlook',2500);
}

function exportICSWeek(audFilter,kw){
  const curKW=kw||dateToKW(today())+weekOff;
  const ks=kwToDate(curKW);
  const dayNames=['Mo','Di','Mi','Do','Fr'];
  const events=[];
  for(let di=0;di<5;di++){
    const d=parseDate(ks);d.setDate(d.getDate()+di);
    const ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    let dayPlans=plans.filter(p=>p.date===ds);
    if(audFilter)dayPlans=dayPlans.filter(p=>p.auditor===audFilter);
    let dayBerats=beratPlan.filter(p=>p.date===ds);
    if(audFilter)dayBerats=dayBerats.filter(p=>p.auditor===audFilter);
    let dayPA=personAudits.filter(p=>p.planned&&p.date===ds);
    if(audFilter)dayPA=dayPA.filter(p=>p.auditor===audFilter);
    let dayRp=rapporte.filter(r=>r.planned&&r.date===ds);
    if(audFilter)dayRp=dayRp.filter(r=>(r.auditors||[]).includes(audFilter));
    if(!dayPlans.length&&!dayBerats.length&&!dayPA.length&&!dayRp.length)continue;
    const byAud={};
    dayRp.forEach(r=>(r.auditors||[]).filter(a=>!audFilter||a===audFilter).forEach(aud=>{if(!byAud[aud])byAud[aud]=[];byAud[aud].push({...r,_type:'rapp'});}));
    dayPlans.forEach(p=>{const aud=p.auditor||'Unbekannt';if(!byAud[aud])byAud[aud]=[];byAud[aud].push({...p,_type:'audit'});});
    dayBerats.forEach(p=>{const aud=p.auditor||'Unbekannt';if(!byAud[aud])byAud[aud]=[];byAud[aud].push({...p,_type:'berat'});});
    dayPA.forEach(p=>{const aud=p.auditor||'Unbekannt';if(!byAud[aud])byAud[aud]=[];byAud[aud].push({...p,_type:'person'});});
    Object.entries(byAud).forEach(([aud,ps])=>{
      const items=ps.map(p=>{
        if(p._type==='rapp')return{name:'📋 '+p.type+(p.time?' '+p.time+' Uhr':'')+(p.dept?' – '+p.dept:''),addr:p.addr||p.ort||'',dept:p.dept||'',auditor:aud};
        if(p._type==='person')return{name:'👤 '+p.person+(p.bs?' – '+p.bs:'')+(p.note?' ('+p.note+')':''),addr:p.addr||'',dept:p.kat||'',auditor:aud};
        const e=data.find(x=>x.id===p.bsId);if(!e)return null;
        const name=p._type==='berat'?'💬 '+e.name+(p.note?' ('+p.note+')':''):e.name;
        return{name,addr:e.addr||'',dept:e.dept||'',auditor:aud};}).filter(Boolean);
      if(!items.length)return;
      const addrs=items.map(i=>i.addr).filter(Boolean);
      events.push({date:ds,title:`Audit ${dayNames[di]} ${d.toLocaleDateString('de-CH',{day:'2-digit',month:'2-digit'})} – ${aud} (${items.length} Termine)`,items,addrs});
    });
  }
  if(!events.length){showToast('Keine Planungen in dieser Woche');return;}
  const audLabel=audFilter?`_${audFilter.split(' ').pop()}`:'';
  dlICS(makeICS(events),`audit_kw${curKW}${audLabel}.ics`);
  showToast(`📅 KW ${curKW} (${events.length} Termine) → Outlook`,2500);
}



// exportICSWeek with audFilter defined above

// ═══ RENDER ALL ═══
function renderAll(){renderMarkers();renderList();updateStats();renderTL();updatePAPanelBadge();if(curView==='cal'){renderCalSB();renderKW();}if(curView==='aud'){renderAuditors();renderFerList();renderWunschFerien();renderPA();}}
function updatePAPanelBadge(){
  const badge=document.getElementById('pa-panel-badge');
  const audSel=document.getElementById('pa-panel-aud');
  const audFilterVal=audSel&&audSel.dataset.filled?audSel.value:'__me__';
  const audFilter=audFilterVal==='__me__'?currentUser:(audFilterVal||null);
  const todayList=personAudits.filter(p=>p.planned&&p.date===today()&&(!audFilter||p.auditor===audFilter));
  if(badge)badge.textContent=todayList.length||'';
  // Pins für heute sind standardmässig sichtbar, auch ohne geöffnetes Panel - ausser der
  // Nutzer hat im Panel bereits ein anderes Datum gewählt, dann bleibt dessen Auswahl massgeblich.
  const dEl=document.getElementById('pa-panel-date');
  if(!dEl||!dEl.value||dEl.value===today())renderPAPins(todayList);
}
// ═══ INIT ═══
document.addEventListener('DOMContentLoaded',()=>{
  if(localStorage.getItem('audit_dark')==='1')document.body.classList.add('dark');
  // Show login immediately
  document.getElementById('login-bg').style.display='flex';
  buildSelects();
  const loaded=load();
  if(loaded)sbSanitizeState();
  if(loaded&&data.length>0)buildDF();
  renderAudTags();renderAll();buildCalBS();
  document.getElementById('srch').oninput=()=>{renderMarkers();renderList();};
  document.getElementById('dsel').onchange=()=>{renderMarkers();renderList();};
  document.getElementById('stsel').onchange=()=>{renderMarkers();renderList();};
  document.addEventListener('click',e=>{
    const mm=document.getElementById('more-m');const mw=document.getElementById('more-w');
    if(mm&&mm.style.display!=='none'&&!mw.contains(e.target)&&!mm.contains(e.target))mm.style.display='none';
    const qa=document.getElementById('qa');if(qa&&qa.style.display!=='none'&&!qa.contains(e.target))closeQA();
  });
  if(loaded&&data.length>0)showToast(`✓ ${data.length} Baustellen geladen`,2500);
  updateAdminUI();
  updateUserUI();
  renderFerList();
  setTimeout(()=>initAuth(),400);
  if(window.innerWidth<768||('ontouchstart' in window&&window.innerWidth<1024)){
    setTimeout(()=>toggleMobileView(),800);
  }
});
