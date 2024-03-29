const builtInCategories = {
  'Frequent Words': {
    icon: 'star',
    words: ['a','and','be','i','in','is','it','of','that','the','to','was','all','as','are','at','but','for','have','had','he','her','his','not','on','one','said','so','they','with','you','and','by','do','go','if','me','my','no','or','up','big','can','did','get','has','him','new','now','off','old','our','out','see','she','two','who','back','been','come','down','from','into','just','like','made','much','over','then','this','well','went','when','call','come','here','make','must','only','some','then','where','what','will','your','about','before','other','right','then','their','want','which'],
  },
  'Numbers': {
    icon: 'calculator',
    words: ['one','two','three','four','five','six','seven','eight','nine','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','teen'],
  },
  'Work': {
    icon: 'briefcase',
    words: ['hello','to','dear','sincerely','reply','respond','action','immediately','manager','team','work','meeting','office','document','invoice','name','role','company','help','question','comment','answer','forward','delete','upload','send','receive','money','committee','subcommittee','laptop','desktop','recognition','application','resume','hr','it','computer','secondment','welcome','farewell','party','lunch','airport','plane','ticket','business','suit','asap','acknowledge','analyse','negotiate','compare','contrast','presentation','powerpoint','excel','word','discuss','interview','unlikely','possibility','probability','understanding','preference','construct','forecast','spending','proceed','discussion','telephone','present','attachment','development','appraisal','review','edit','change','revise','draft','performance','purchase','logistics','timeline','collaboration','promotion','graph','chart','statistics','engagement','delegate','union','payroll','conference','hire','employ','employee','salary','wage','bonus','ado','rdo','escalate','supervision','feedback','consult','consultation','time','date','room','rsvp','tomorrow','organisation','charity','donate','fundraiser','certificate','sign','signature','brainstorm','process','margin','loss','staff,','subject','problem','solution','it','kpis','underperforming','report','products','development','developing','reception','admin','secretary','typing','ceo','lawyer','accountant','doctor','weekly','student','internship','placement','satisfaction','career','legal','finance','budget','contract','buyer','seller','administration','procurement','warehouse','purchase','percent','discount','sale','design','timeframe','teamwork','type','email','outlook','calendar','diary','offer','relationships','network','networking','colleague','apprentice','procedure','surplus','deficit','debt','allocate','credit','due','prioritise','priority','from','to','sender'],
  },
  'Text Messages': {
    icon: 'message',
    words: ['hey','hi','thanks','cheers','love','day','night','tonight','today','tomorrow','yesterday','sorry','ok','omg','haha','excellent','great','beautiful','later','now','yes','no','owe','amazing','unbelievable','proud','lol','brunch','cafe','xx','awesome','enjoy','spectacular','hooray','plans','drive','leave','come','eat','drink','read','please','money','work','dinner','lunch','family','friends'],
  },
  'Social Media': {
    icon: 'face-grin-wide',
    words: ['congratulations','love','live','beautiful','photo','post','donate','friend','unfriend','follow','technology','app','website','link','add','travel','overseas','holiday','upload','rsvp','invitation','party','birthday','computer','tablet','phone','join','funny','hilarious','cute','group','settings','unfollow','email','message','comment','write','fundraiser','tag','video','sponsored','ad','password','hack','event','notification','profile','report','page'],
  },
  'Groceries': {
    icon: 'basket-shopping',
    words: ['shopping','supermarket','aisles','checkout','scan','cash','card','bags','fruit','vegetables','meat','poultry','fish','snacks','dinner','lunch','breakfast','cereal','health food','grains','legumes','dairy','laundry','cleaning','personal','toiletries','pets','frozen','freezer','fridge','spreads','tins','cans','sauces','bottles','drinks','packets','confectionery','bread','herbs','tomato','sweet potato','potato','pumpkin','carrot','mushroom','cabbage','bok choy','pak choy','spinach','rocket','iceberg lettuce','cabbage','cauliflower','kale','broccoli','brussel sprouts','zucchini','onion','garlic','spring onion','artichoke','olives','eggplant','capsicum','celery','avocado','squash','parsnip','cucumber','chili','lemon','orange','mandarin','grapefruit','apple','pear','banana','rockmelon','watermelon','kiwi fruit','passionfruit','cantaloupe','grapes','blueberry','strawberry','blackberry','peach','nectarine','cumquat','fig','apricot','basil','chives','rosemary','thyme','parsley','coriander','oregano','curry leaves','bay leaves','spices','cumin','paprika','turmeric','ginger','cinnamon','eggs','mince meat','sausages','beef','lamb','chicken','turkey','kangaroo','pork','steak','tenderloin','chicken breast','drumsticks','wagyu beef','salmon','fillets','seasoning','marinade','feta','pastrami','salami','prosciutto','cheese','cabana','frankfurts','roast chicken','potato salad','mortadella','mozzarella','camembert','brie','blue cheese','bacon','ham','sourdough','spelt','flat bread','gluten free','burger','roll','pizza base','wrap','pita bread','crumpets','raisin bread','brioche bun','hot cross buns','scones','jam','peanut butter','vegemite','nutella','marmalade','honey','oats','porridge','cones','vitamins','protein balls','chocolate','milk chocolate','dark chocolate','chips','corn chips','salt and vinegar','savoury biscuits','chocolate chip cookies','biscuits','dry biscuits','nuts','pistachio','cashew','almond','hazelnut','peanut','sunflower seed','pumpkin seed','cranberry','cream','butter','ice cream','sour cream','yoghurt','milk','lite milk','low fat milk','soy milk','almond milk','milo','water','fizzy drink','soda','lemonade','coke','orange juice','apple juice','iced tea','tea','coffee','green tea','black tea','chamomile','english breakfast','earl grey','diced tomatoes','chickpeas','lentils','blackbeans','kidney beans','coconut milk','coconut cream','tuna','passata','tomato paste','pasta','noodles','couscous','rice','pesto','pasta sauce','soy sauce','hoisin sauce','tomato sauce','worcestershire sauce','sesame oil','fish sauce','olive oil','vegetable oil','coconut oil','tofu','dips','hummus','tzatziki','baba ganoush','cream cheese','flour','sugar','cocoa','washing powder','shampoo','conditioner','deodorant','toothpaste','toothbrush','sunscreen','moisturiser','tissues','toilet paper','tampons','pads','make up','hairbrush','pet food','soap','rubbish bags'],
  },
  'Time': {
    icon: 'clock',
    words: ['today','yesterday','tomorrow','night','midday','monday','tuesday','wednesday','thursday','friday','saturday','sunday','january','february','march','april','may','june','july','august','september','october','november','december','year','month','leave','day','holiday','birthday','nye','morning','day','evening','midnight'],
  },
  'Health': {
    icon: 'stethoscope',
    words: ['pain','headache','tired','sleep','stroke','diabetes','medication','heart','lungs','doctor','nurse','neurology','head','mri','ct','toilet','appointment','checkup','gp','blood test','cholesterol','chemist','blood pressure','prescription','wheelchair','afo','glasses','aphasia','fatigue','fog','cognition','memory','physiotherapy','occupational therapy','social work','dietetics','speech pathology','exercise physiology','neuropsychology','podiatry','massage therapist','counsellor','x ray','test','pharmacist','emergency','ambulance','hospital','rehab','taxi','bus','uber','help','psychologist','ndis','accessibility','aneurysm','haemorrhage','artery','vein','variable','continence','speech','language','reading','writing','talking','cooking','cleaning','walking','standing','sitting','lying','balance','dizzy','questions','strategies','support','assistance','happy','sad','worried','concerned','relieved','excited','fearful','anxious','depressed','tablet','pill','stressed','yes','no','more','less','longer','shorter','pillow','bed','comfortable','uncomfortable','shower','eating','drinking','cough','legs','arms','hands','neck','hygiene'],
  },
};

const allWords = Object.values(builtInCategories).map(category => category.words).flat(Infinity);
const uniqueWords = [...new Set(allWords)];

export default {
  'Lucky Dip': {
    icon: 'gift',
    words: uniqueWords,
  },
  ...builtInCategories,
};
