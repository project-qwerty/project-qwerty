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
  'Numbers and Words': {
    icon: 'calculator',
    words: ['one','two','three','four','five','six','seven','eight','nine','ten','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','teen','billion','decimal','calculator','add','minus','divide','multiply','1','2','3','4','5','6','7','8','9','10','20','30','60','50','70','80','90','100','1000','10000','0','000'],
  },
  'Digits': {
    icon: 'arrow-down-1-9',
    words: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','110','119','128','137','146','155','164','173','182','191','200','209','218','227','236','245','254','263','272','281','290','299','308','317','326','335','344','353','362','371','380','389','398','407','416','425','434','443','452','461','470','479','488','497','506','515','524','533','542','551','560','569','578','587','596','605','614','623','632','641','650','659','668','677','686','695','704','713','722','731','740','749','758','767','776','785','794','803','812','821','830','839','848','857','866','875','884','893','902','911','920','929','938','947','956','965','974','983','992'],
  },
};

const builtInCategoriesSentences = {
  'Work': {
    icon: 'briefcase',
    words: ['kind regards','please find attached','my apologies','please do not hesitate to call me','if you have any questions let me know','my name is','my role is','any help would be great','thank you for your assistance','join the working party','petty cash','maternity leave','paternity leave','i am going on annual leave','sick leave','cash flow','professional development','carers leave','i have to leave work early','i have an appointment to go to','i would like to submit my leave for approval','thank you for your consideration','please advise','refer to','who is on the interview panel','i am free this afternoon','should we meet in the morning','time sheet','sign off','yours sincerely','flow chart','staff room','hello team','talk about','we have a meeting on wednesday','back order','back up','general manager','once a fortnight','every week','work experience','please consider this','cake in the tearoom','i am unable to attend','i have booked the room','please meet me in the foyer','let me know as soon as possible','could you please order more pens','please see the attached document','please see my response below','could you get that to me as soon as possible','what time should we meet','here is the link','go on the staff intranet','there is a parcel at reception','please sign and return the documents','can you forward it to me','public holiday','not coming in','end of message','i am running late','team work','reply all','pay rise','parental leave','can you approve this','i will forward the email','i am free','i am not free','the office is closed'],
  },
  'Text Messages': {
    icon: 'message',
    words: ['see you soon','on my way','what time','how are you','thank you','what are you up to','call me','i love you','i am sorry','call me back','can you come','are you free','have a good day','i like it','i am driving home','leaving now','call me later','oh my goodness','all good','no worries','sounds good','it is not urgent','just letting you know','will do','later is fine','i am here','are you here','are you there','do you need a lift','thank you','it is confirmed','i will book tickets','just leaving now','can you pick up some milk','can you pick up the kids','where are you','what time will you be home','i am running late','we will talk later','call me when you can','speak soon','are you free to catch up next week','happy birthday to you','when will you get here','have a good trip','have a safe flight','see you there','sorry i missed you','are you ok','what is for dinner','what a hero','how are you','how was your weekend','how did you go','i will look out for you','i owe you','i am sorry','i will check','stay safe','i look forward to it','do you want me to pick you up','free for a cuppa','see you there','are you home','get home safe','drive safe','you are too kind','it has been a busy week','what time are you going tonight','what time','where should i park','be there in 10','me too','all good','sounds good','pick you up','on my way','traffic is bad','good to see you','thanks for today','do you want me to drive','where should we go','are you still free','when are you free','no doubt','we did it','thanks for the goodies','send me the details','send me the link','i am busy','speak to you later','she is happy to come along','been thinking of you','let me know','ok thanks','i love you','do not forget','when am i seeing you next','can you send me a reminder'],
  },
  'Social Media': {
    icon: 'face-grin-wide',
    words: ['this is a great photo','i am so proud','i am proud of you','so happy for you','such a gorgeous baby','you look great','he is so grown up','good luck','so sorry to hear','sorry for your loss','this is crazy','this is funny','so sad','that is great news','i agree','lovely family photo','happy birthday','have a good holiday','that is funny','that was a great day','this is a great article','thanks for sharing','i will donate','good on you','good news','you are too kind','had a great time','love the photos','follow back','add me','follow me','keep in touch','profile picture','seasons greetings','happy new year','thinking of you','sorry for your loss','sign up','well done','thank you','get well soon','we will miss you','safe travels','happy mothers day','happy fathers day','my condolences','photo album','best wishes','log in'],
  },
  'Groceries': {
    icon: 'basket-shopping',
    words: ['i am going to the supermakert','on my way to the grocery store','pick up some milk','get some bread','do the shopping','i need to buy food for dinner','look at the recipe','check the ingredients','low in sugar','no added salt','buy a snack','meals for the week','fruit and vegetables','i need to go grocery shopping','pick up the groceries','supermarket delivery','click and collect','i need a trolley','get a basket','pay by card','pay with cash','use a gift card','i would like a receipt','check the catalogue','on sale','what is the total','i need help with my bags','the bags are heavy','push the trolley','check the receipt','what are the opening hours','when does the store close','in the carpark','self serve checkout','i need help','take a ticket for the deli','shopping list','ready meal','do you have this','out of stock','check online','split payment','do you accept cash'],
  },
  'Time': {
    icon: 'clock',
    words: ['next week','last week','next year','last year','new years eve','blood test on tuesday','neurologist on friday','put it in my calendar','next month','i am going on annual leave','sick leave on friday','later tonight','earlier today','i am running late','i am here early','see you tomorrow','public holiday','it is a long weekend','last month','early in the day','put your clock forward an hour','put your clock back an hour','can we change the time'],
  },
  'Health': {
    icon: 'stethoscope',
    words: ['i have constant pain','i have a headache','it is bad','i feel tired','i need to sleep','i could not sleep','i had a stroke','blood sugar is good','blood sugar is high','i have a webster pack','i need a script','chest pain','short of breath','call the doctor','see the gp','see the nurse','i have a neurology appointment','i am dizzy','i have a mri','mri brain','watch my cholesterol','blood pressure medication','ct scan','my afo is rubbing','i need an appointment','can i have a new referral','my head feels fuzzy','my wheelchair tyre is flat','i need to go to the chemist','let us stop at the chemist','change the time of my appointment','cancel my appointment','my walking stick','my walking frame','the ot is coming','i cannot remember','it is hard to focus','i did my exercises','home visit','centrelink payments','disability support pension','brain fog','my feet hurt','cut my toenails','i need a massage','my neck is sore','i feel sad','i need to speak to someone','i need help','i feel stressed','i feel depressed','i feel anxious','chest xray','go to radiology','i am having more tests','this is an emergency','call 000','call the ambulance','take me to the hospital','i am in the hospital','i have gone home','i am in rehab','book a taxi','book a maxi taxi','i do not drive','catch the bus','book an uber','ndis physio','ndis report','ndis meeting','take me to the accessible toilet','is there a lift','i need a ramp','my hearing aids','up and down','good day','bad day','i need personal care','i can go','i cannot go'],
  },
  'Numbers and Words': {
    icon: 'calculator',
    words: ['one hundred and one','14 west street','victoria 3165','two thousand and twenty four','two thousand and twenty three','two thousand and twenty five','i want 10 balloons','put 5 candles on the cake','buy a twenty dollar gift card','i would like one coffee','i want 2 litres of water','a table for 4','dinner at 7','haircut at 3','physio at 8','dentist on the 13th','mri on monday at 2pm','vet at 10','i have 2 dogs','pick me up at 2','two thousand and twenty six','two thousand and twenty seven','two thousand and twenty eight','two thousand and twenty nine','two thousand and thirty','my stroke was in 2023','we have a meeting on wednesday at 9am'],
  },
};

function upsertCategory(categories, categoryName, category) {
  if (!(categoryName in categories)) {
    // just insert the category
    categories[categoryName] = {
      icon: category.icon,
      words: [...category.words],
    };
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
