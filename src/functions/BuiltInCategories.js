const builtInCategoriesWords = {
  'Frequent Words': {
    icon: 'star',
    words: ['a','and','be','i','in','is','it','of','that','the','to','was','all','as','are','at','but','for','have','had','he','her','his','not','on','one','said','so','they','with','you','and','by','do','go','if','me','my','no','or','up','big','can','did','get','has','him','new','now','off','old','our','out','see','she','two','who','back','been','come','down','from','into','just','like','made','much','over','then','this','well','went','when','call','come','here','make','must','only','some','then','where','what','will','your','about','before','could','first','look','more','other','right','then','their','want','which'],
  },
  'Work': {
    icon: 'briefcase',
    words: ['hello','to','dear','sincerely','reply','respond','action','immediately','manager','team','work','meeting','office','document','invoice','name','role','company','help','question','comment','answer','forward','delete','upload','send','receive','money','committee','subcommittee','laptop','desktop','recognition','application','resume','hr','it','computer','secondment','welcome','farewell','party','lunch','airport','plane','ticket','business','suit','asap','acknowledge','analyse','negotiate','compare','contrast','presentation','powerpoint','excel','word','discuss','interview','unlikely','possibility','probability','understanding','preference','construct','forcast','spending','proceed','discussion','telephone','present','attachment','development','appraisal','review','edit','change','revise','draft','performance','purchase','logistics','timeline','collaboration','promotion','graph','chart','statistics','engagement','delegate','union','payroll','conference','hire','employ','employee','salary','wage','bonus','ado','rdo','escalate','supervision','feedback','consult','consultation','time','date','room','rsvp','tomorrow','organisation','charity','donate','fundraiser','certificate','sign','signature','brainstorm','process','margin','loss','staff','subject','problem','solution','it','kpis','underperforming','report','products','development','developing','engineering','reception','admin','secretary','typing','ceo','lawyer','accountant','doctor','weekly','student','internship','placement','satisfaction','career','legal','finance','budget','contract','buyer','seller','administration','procurement','warehouse','purchase','percent','discount','sale','design','timeframe','teamwork','type','email','outlook','calendar','diary','offer','relationships','network','networking','colleague','apprentice','procedure','surplus','deficit','debt','allocate','credit','due','prioritise','priority','from','to','sender'],
  },
  'Text Messages': {
    icon: 'message',
    words: ['hey','hi','thanks','cheers','love','day','night','tonight','today','tomorrow','yesterday','sorry','ok','omg','haha','excellent','great','beautiful','later','now','yes','no','owe','amazing','unbelievable','proud','lol','brunch','cafe','xx','awesome','enjoy','spectacular','hooray','plans','drive','leave','come','eat','drink','read','please','money','work','dinner','lunch','family','friends','xo'],
  },
  'Social Media': {
    icon: 'face-grin-wide',
    words: ['congratulations','love','like','beautiful','photo','post','donate','friend','unfriend','follow','technology','app','website','link','add','travel','overseas','holiday','upload','rsvp','invitation','party','birthday','computer','tablet','phone','join','funny','hilarious','cute','group','settings','unfollow','email','message','comment','write','fundraiser','tag','video','sponsored','ad','password','hack','event','notification','profile','report','page'],
  },
  'Groceries': {
    icon: 'basket-shopping',
    words: ['shopping','supermarket','trolley','basket','list','aisles','checkout','scan','cash','card','bags','fruit','vegetables','meat','poultry','fish','snacks','dinner','lunch','breakfast','cereal','health food','grains','legumes','dairy','laundry','cleaning','personal','toiletries','pets','frozen','freezer','fridge','spreads','tins','cans','sauces','bottles','drinks','packets','confectionary','bread','herbs','tomato','sweet potato','potato','pumpkin','carrot','mushroom','cabbage','bok choy','pak choy','spinach','rocket','iceberg lettuce','cos lettuce','cabbage','cauliflower','kale','broccoli','brussel sprouts','zucchini','onion','garlic','spring onion','artichoke','olives','eggplant','capsicum','celery','avocado','squash','parsnip','cucumber','chili','lemon','orange','mandarin','grapefruit','apple','pear','banana','rockmelon','watermelon','kiwi fruit','passionfruit','cantaloupe','grapes','blueberry','strawberry','blackberry','peach','nectarine','cumquat','fig','apricot','basil','chives','rosemary','thyme','parsely','coriander','oregano','curry leaves','bay leaves','spices','cumin','paprika','turmeric','ginger','cinnamon','eggs','mince meat','sausages','beef','lamb','chicken','turkey','kangaroo','pork','steak','tenderloin','chicken breast','drumsticks','wagyu beef','salmon','fillets','seasoning','marinade','feta','pastrami','salami','prosciutto','cheese','cabana','frankfurts','roast chicken','potato salad','mortadella','mozzarella','camembert','brie','blue cheese','bacon','ham','sourdough','spelt','flat bread','gluten free','burger','roll','pizza base','wrap','pita bread','crumpets','raisin bread','brioche bun','hot cross buns','scones','jam','peanut butter','vegemite','nutella','marmalade','honey','oats','porridge','cones','vitamins','protein balls','chocolate','milk chocolate','dark chocolate','chips','corn chips','salt and vinegar','savoury biscuits','chocolate chip cookies','biscuits','dry biscuits','nuts','pistachio','cashew','almond','hazelnut','peanut','sunflower seeds','pumpkin seeds','cranberry','cream','butter','ice cream','sour cream','yoghurt','milk','lite milk','low fat milk','soy milk','almond milk','milo','water','fizzy drink','soda','lemonade','coke','juice','orange juice','apple juice','iced tea','tea','coffee','green tea','black tea','chamomile','english breakfast','early grey','diced tomatoes','chickpeas','lentils','black beans','kidney beans','coconut milk','coconut cream','tuna','passata','tomato paste','pasta','noodles','couscous','rice','pesto','pasta sauce','soy sauce','hoisin sauce','tomato sauce','worcestershire sauce','sesame oil','fish sauce','oyster sauce','olive oil','vegetable oil','coconut oil','tofu','dips','hummus','tzatziki','baba ganoush','cream cheese','flour','sugar','cocoa','washing powder','shampoo','conditioner','deodorant','toothpaste','toothbrush','sunscreen','moisturiser','tissues','toilet paper','tampons','pads','make up','hairbrush','pet food','soap','rubbish bags','face mask','sanitiser','gloves','disinfectant','antibacterial'],
  },
  'Time': {
    icon: 'clock',
    words: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday','january','february','march','april','may','june','july','august','september','october','november','december','today','yesterday','tomorrow','year','month','leave','day','holiday','birthday','nye','morning','day','evening','night','midday','midnight','annual','monthly','fortnight','weekly','week','fortnight','annually','weekday'],
  },
  'Health': {
    icon: 'stethoscope',
    words: ['toilet','pain','headache','tired','sleep','stroke','diabetes','medication','heart','lungs','doctor','nurse','neurology','head','mri','ct','appointment','check up','gp','blood test','cholesterol','chemist','blood pressure','prescription','wheelchair','afo','glasses','aphasia','fatigue','fog','cognition','memory','physiotherapy','occupational therapy','social work','dietetics','speech pathology','exercise physiology','neuropsychology','podiatry','massage therapist','counsellor','xray','tests','pharmacist','emergency','ambulance','hospital','rehab','taxi','bus','uber','help','psychologist','ndis','accessibility','aneurysm','haemorrhage','blockage','artery','vein','variable','continence','speech','language','reading','writing','talking','cooking','cleaning','walking','standing','sitting','lying','balance','dizzy','questions','strategies','support','assistance','happy','sad','worried','concerned','relieved','excited','fearful','anxious','depressed','tablet','pill','stressed','yes','no','more','less','longer','shorter','pillow','bed','comfortable','uncomfortable','shower','toilet','eating','drinking','cough','legs','arms','hands','neck','hygiene','face mask','sanitiser','gloves','disinfectant','antibacterial','covid','coronavirus','pandemic','infection','symptoms','wash hands'],
  },
  'Numbers and words': {
    icon: 'calculator',
    words: ['one','two','three','four','five','six','seven','eight','nine','ten','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','teen','billion','decimal','calculator','add','minus','divide','multiply','1','2','3','4','5','6','7','8','9','10','20','30','60','50','70','80','90','100','1000','10000','0','000'],
  },
  'Digits': {
    icon: 'arrow-down-1-9',
    words: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132','133','134','135','136','137','138','139','140','141','142','143','144','145','146','147','148','149','150','151','152','153','154','155','156','157','158','159','160','161','162','163','164','165','166','167','168','169','170','171','172','173','174','175','176','177','178','179','180','181','182','183','184','185','186','187','188','189','190','191','192','193','194','195','196','197','198','199','200','201','202','203','204','205','206','207','208','209','210','211','212','213','214','215','216','217','218','219','220','221','222','223','224','225','226','227','228','229','230','231','232','233','234','235','236','237','238','239','240','241','242','243','244','245','246','247','248','249','250','251','252','253','254','255','256','257','258','259','260','261','262','263','264','265','266','267','268','269','270','271','272','273','274','275','276','277','278','279','280','281','282','283','284','285','286','287','288','289','290','291','292','293','294','295','296','297','298','299','300','301','302','303','304','305','306','307','308','309','310','311','312','313','314','315','316','317','318','319','320','321','322','323','324','325','326','327','328','329','330','331','332','333','334','335','336','337','338','339','340','341','342','343','344','345','346','347','348','349','350','351','352','353','354','355','356','357','358','359','360','361','362','363','364','365','366','367','368','369','370','371','372','373','374','375','376','377','378','379','380','381','382','383','384','385','386','387','388','389','390','391','392','393','394','395','396','397','398','399','400','401','402','403','404','405','406','407','408','409','410','411','412','413','414','415','416','417','418','419','420','421','422','423','424','425','426','427','428','429','430','431','432','433','434','435','436','437','438','439','440','441','442','443','444','445','446','447','448','449','450','451','452','453','454','455','456','457','458','459','460','461','462','463','464','465','466','467','468','469','470','471','472','473','474','475','476','477','478','479','480','481','482','483','484','485','486','487','488','489','490','491','492','493','494','495','496','497','498','499','500','501','502','503','504','505','506','507','508','509','510','511','512','513','514','515','516','517','518','519','520','521','522','523','524','525','526','527','528','529','530','531','532','533','534','535','536','537','538','539','540','541','542','543','544','545','546','547','548','549','550','551','552','553','554','555','556','557','558','559','560','561','562','563','564','565','566','567','568','569','570','571','572','573','574','575','576','577','578','579','580','581','582','583','584','585','586','587','588','589','590','591','592','593','594','595','596','597','598','599','600','601','602','603','604','605','606','607','608','609','610','611','612','613','614','615','616','617','618','619','620','621','622','623','624','625','626','627','628','629','630','631','632','633','634','635','636','637','638','639','640','641','642','643','644','645','646','647','648','649','650','651','652','653','654','655','656','657','658','659','660','661','662','663','664','665','666','667','668','669','670','671','672','673','674','675','676','677','678','679','680','681','682','683','684','685','686','687','688','689','690','691','692','693','694','695','696','697','698','699','700','701','702','703','704','705','706','707','708','709','710','711','712','713','714','715','716','717','718','719','720','721','722','723','724','725','726','727','728','729','730','731','732','733','734','735','736','737','738','739','740','741','742','743','744','745','746','747','748','749','750','751','752','753','754','755','756','757','758','759','760','761','762','763','764','765','766','767','768','769','770','771','772','773','774','775','776','777','778','779','780','781','782','783','784','785','786','787','788','789','790','791','792','793','794','795','796','797','798','799','800','801','802','803','804','805','806','807','808','809','810','811','812','813','814','815','816','817','818','819','820','821','822','823','824','825','826','827','828','829','830','831','832','833','834','835','836','837','838','839','840','841','842','843','844','845','846','847','848','849','850','851','852','853','854','855','856','857','858','859','860','861','862','863','864','865','866','867','868','869','870','871','872','873','874','875','876','877','878','879','880','881','882','883','884','885','886','887','888','889','890','891','892','893','894','895','896','897','898','899','900','901','902','903','904','905','906','907','908','909','910','911','912','913','914','915','916','917','918','919','920','921','922','923','924','925','926','927','928','929','930','931','932','933','934','935','936','937','938','939','940','941','942','943','944','945','946','947','948','949','950','951','952','953','954','955','956','957','958','959','960','961','962','963','964','965','966','967','968','969','970','971','972','973','974','975','976','977','978','979','980','981','982','983','984','985','986','987','988','989','990','991','992','993','994','995','996','997','998','999','1000'],
  },
};

const builtInCategoriesSentences = {
  // TODO
  Placeholder: {
    icon: 'star',
    words: ['placeholder'],
  },
};

function upsertCategory(categories, categoryName, category) {

  if (!(categoryName in categories)) {
    // just insert the category
    categories[categoryName] = category;
  } else {
    // add the category's words to the existing one
    categories[categoryName].words = categories[categoryName].words.concat(category.words);
  }
}

const builtInCategoriesBoth = {};
for (const categoryName of Object.keys(builtInCategoriesWords)) {
  upsertCategory(builtInCategoriesBoth, categoryName, builtInCategoriesWords[categoryName]);
}
for (const categoryName of Object.keys(builtInCategoriesSentences)) {
  upsertCategory(builtInCategoriesBoth, categoryName, builtInCategoriesSentences[categoryName]);
}


const allWords = Object.values(builtInCategoriesWords).map(category => category.words).flat(Infinity);
const uniqueWords = [...new Set(allWords)];

const allSentences = Object.values(builtInCategoriesSentences).map(category => category.words).flat(Infinity);
const uniqueSentences = [...new Set(allSentences)];

const allBoth = Object.values(builtInCategoriesBoth).map(category => category.words).flat(Infinity);
const uniqueBoth = [...new Set(allBoth)];


export default {
  WORDS: {
    'Lucky Dip': {
      icon: 'gift',
      words: uniqueWords,
    },
    ...builtInCategoriesWords,
  },
  SENTENCES: {
    'Lucky Dip': {
      icon: 'gift',
      words: uniqueSentences,
    },
    ...builtInCategoriesSentences,
  },
  BOTH: {
    'Lucky Dip': {
      icon: 'gift',
      words: uniqueBoth,
    },
    ...builtInCategoriesBoth,
  },
};
