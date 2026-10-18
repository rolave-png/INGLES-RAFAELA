// Contenido de Mandarín Quest. Para ampliar la app basta con agregar unidades aquí.
// vocab: [hanzi, pinyin, español, emoji|null]   (emoji único en toda la app, o null)
// sentences: [[palabras en hanzi en orden], pinyin, español]
// gram:  { q: "frase con ___", opts: [...], a: índice correcto, why: explicación en español }
window.CONTENT = {
  stages: [
    { id: 1, name: 'Etapa 1 · Primeros pasos', sub: 'Nivel HSK 1 — saludos, tonos y frases básicas' },
    { id: 2, name: 'Etapa 2 · Mi mundo', sub: 'Nivel HSK 1 — colores, animales, tiempo y lugares' },
  ],
  units: [
    {
      id: 'saludos', stage: 1, title: 'Saludos', emoji: '👋',
      tip: 'En chino las palabras no cambian (no hay conjugaciones ni género). 你好 = "tú bien" y sirve a cualquier hora. 很 (hěn) = "muy".',
      vocab: [
        ['你好', 'nǐ hǎo', 'hola', '👋'], ['谢谢', 'xièxie', 'gracias', '🙏'], ['不客气', 'bú kèqi', 'de nada', null],
        ['再见', 'zàijiàn', 'adiós', '🖐️'], ['对不起', 'duìbuqǐ', 'perdón / lo siento', '😔'], ['请', 'qǐng', 'por favor', null],
        ['是', 'shì', 'ser / sí', '✅'], ['不', 'bù', 'no (negación)', '❌'], ['好', 'hǎo', 'bueno / bien', '👍'], ['很', 'hěn', 'muy', null],
      ],
      sentences: [
        [['你好', '我', '叫', '安娜'], 'nǐ hǎo, wǒ jiào Ānnà', 'Hola, me llamo Ana'],
        [['你好', '吗'], 'nǐ hǎo ma', '¿Cómo estás?'],
        [['我', '很', '好', '谢谢'], 'wǒ hěn hǎo, xièxie', 'Estoy muy bien, gracias'],
        [['很', '高兴', '认识', '你'], 'hěn gāoxìng rènshi nǐ', 'Mucho gusto'],
      ],
      gram: [
        { q: '你好 ___？', opts: ['吗', '不', '是'], a: 0, why: 'Para hacer una pregunta de sí/no se agrega 吗 (ma) al final: 你好吗？' },
        { q: '___ 客气。', opts: ['不', '吗', '很'], a: 0, why: '不 (bù) es la negación: 不客气 = "no hay de qué".' },
      ],
    },
    {
      id: 'numeros', stage: 1, title: 'Números 1-10', emoji: '🔢',
      tip: 'Entre un número y un sustantivo se usa una "palabra de medida": 个 (gè) es la más común. Tres amigos = 三个朋友.',
      vocab: [
        ['一', 'yī', 'uno', '1️⃣'], ['二', 'èr', 'dos', '2️⃣'], ['三', 'sān', 'tres', '3️⃣'], ['四', 'sì', 'cuatro', '4️⃣'],
        ['五', 'wǔ', 'cinco', '5️⃣'], ['六', 'liù', 'seis', '6️⃣'], ['七', 'qī', 'siete', '7️⃣'], ['八', 'bā', 'ocho', '8️⃣'],
        ['九', 'jiǔ', 'nueve', '9️⃣'], ['十', 'shí', 'diez', '🔟'],
      ],
      sentences: [
        [['我', '十', '岁'], 'wǒ shí suì', 'Tengo diez años'],
        [['我', '有', '三', '个', '朋友'], 'wǒ yǒu sān gè péngyou', 'Tengo tres amigos'],
        [['我', '有', '九', '个', '苹果'], 'wǒ yǒu jiǔ gè píngguǒ', 'Tengo nueve manzanas'],
      ],
      gram: [
        { q: '三 ___ 朋友', opts: ['个', '岁', '吗'], a: 0, why: 'Entre número y sustantivo va una palabra de medida; 个 (gè) es la más común.' },
        { q: '五 + 五 = ___', opts: ['十', '九', '八'], a: 0, why: 'Cinco más cinco son diez: 十 (shí).' },
      ],
    },
    {
      id: 'tonos', stage: 1, title: 'Los 4 tonos', emoji: '🎵',
      tip: 'El mandarín tiene 4 tonos: 1.º alto y plano (mā), 2.º sube (má), 3.º baja y sube (mǎ), 4.º cae de golpe (mà). La misma sílaba cambia de significado: 妈 mamá, 麻 cáñamo, 马 caballo, 骂 regañar. Escucha con atención y fíjate en la marca sobre la vocal.',
      vocab: [
        ['妈', 'mā', 'mamá', '🤱'], ['马', 'mǎ', 'caballo', '🐴'], ['骂', 'mà', 'regañar', '😠'], ['书', 'shū', 'libro', '📖'],
        ['树', 'shù', 'árbol', '🌳'], ['水', 'shuǐ', 'agua', '💧'], ['雨', 'yǔ', 'lluvia', '🌧️'], ['鱼', 'yú', 'pez', '🐟'],
      ],
      sentences: [
        [['妈妈', '骂', '我'], 'māma mà wǒ', 'Mamá me regaña'],
        [['我', '看', '书'], 'wǒ kàn shū', 'Leo un libro'],
        [['我', '喜欢', '马'], 'wǒ xǐhuan mǎ', 'Me gustan los caballos'],
      ],
      gram: [
        { q: '马 (mǎ) lleva el tono ___ (baja y vuelve a subir).', opts: ['tercero', 'primero', 'cuarto'], a: 0, why: 'La marca ˇ indica el 3.er tono: baja y sube.' },
        { q: 'En 妈 (mā) el tono ___ es alto y plano.', opts: ['primero', 'segundo', 'tercero'], a: 0, why: 'La marca ¯ indica el 1.er tono: alto y plano.' },
      ],
    },
    {
      id: 'personas', stage: 1, title: 'Personas y pronombres', emoji: '🙋',
      tip: 'Para el plural de pronombres se agrega 们 (men): 我 → 我们. Para "de" posesivo se usa 的: 我的 = mi.',
      vocab: [
        ['我', 'wǒ', 'yo', '🙋'], ['你', 'nǐ', 'tú', '👉'], ['他', 'tā', 'él', null], ['她', 'tā', 'ella', null],
        ['我们', 'wǒmen', 'nosotros', '🫂'], ['你们', 'nǐmen', 'ustedes', null], ['这', 'zhè', 'esto / este', null],
        ['人', 'rén', 'persona', '🧑'], ['朋友', 'péngyou', 'amigo/a', '🤝'], ['老师', 'lǎoshī', 'profesor/a', '🧑‍🏫'], ['学生', 'xuésheng', 'estudiante', '🧑‍🎓'],
      ],
      sentences: [
        [['我', '是', '学生'], 'wǒ shì xuésheng', 'Soy estudiante'],
        [['她', '是', '我', '的', '老师'], 'tā shì wǒ de lǎoshī', 'Ella es mi profesora'],
        [['他们', '是', '我', '的', '朋友'], 'tāmen shì wǒ de péngyou', 'Ellos son mis amigos'],
      ],
      gram: [
        { q: '我 ___ 学生。', opts: ['是', '吗', '们'], a: 0, why: '是 (shì) = ser: "A 是 B" (A es B).' },
        { q: '我___去学校。(nosotros)', opts: ['们', '的', '吗'], a: 0, why: 'El plural de los pronombres se forma con 们: 我 → 我们.' },
      ],
    },
    {
      id: 'familia', stage: 1, title: 'Mi familia', emoji: '👨‍👩‍👧',
      tip: 'El chino distingue hermanos mayores y menores: 哥哥 (hermano mayor), 弟弟 (hermano menor), 姐姐 (hermana mayor), 妹妹 (hermana menor). Muchas palabras de familia se repiten: māma, bàba.',
      vocab: [
        ['妈妈', 'māma', 'mamá', '👩'], ['爸爸', 'bàba', 'papá', '👨'], ['哥哥', 'gēge', 'hermano mayor', '👦'], ['姐姐', 'jiějie', 'hermana mayor', '👧'],
        ['弟弟', 'dìdi', 'hermano menor', '🧒'], ['妹妹', 'mèimei', 'hermana menor', '👶'], ['奶奶', 'nǎinai', 'abuela (paterna)', '👵'],
        ['爷爷', 'yéye', 'abuelo (paterno)', '👴'], ['家', 'jiā', 'casa / familia', '🏠'],
      ],
      sentences: [
        [['这', '是', '我', '妈妈'], 'zhè shì wǒ māma', 'Esta es mi mamá'],
        [['我', '有', '一个', '哥哥'], 'wǒ yǒu yí gè gēge', 'Tengo un hermano mayor'],
        [['我', '的', '奶奶', '很', '好'], 'wǒ de nǎinai hěn hǎo', 'Mi abuela es muy buena'],
      ],
      gram: [
        { q: '我 ___ 妈妈很好。', opts: ['的', '吗', '个'], a: 0, why: '的 (de) marca posesión: 我的 = mi, de mí.' },
        { q: '你有哥哥 ___？', opts: ['吗', '的', '是'], a: 0, why: '吗 al final convierte la frase en pregunta de sí/no.' },
      ],
    },
    {
      id: 'verbos', stage: 1, title: 'Verbos básicos', emoji: '🏃',
      tip: 'Los verbos no se conjugan: 我吃, 你吃, 他吃. Para negar se pone 不 antes del verbo: 我不吃 = no como.',
      vocab: [
        ['吃', 'chī', 'comer', '🍽️'], ['喝', 'hē', 'beber', '🥤'], ['去', 'qù', 'ir', '🚶'], ['来', 'lái', 'venir', '🏃'],
        ['看', 'kàn', 'mirar / leer', '👀'], ['说', 'shuō', 'hablar / decir', '🗣️'], ['学习', 'xuéxí', 'estudiar', '📚'],
        ['喜欢', 'xǐhuan', 'gustar', '😍'], ['想', 'xiǎng', 'querer / pensar', '💭'], ['爱', 'ài', 'amar', '❤️'],
      ],
      sentences: [
        [['我', '去', '学校'], 'wǒ qù xuéxiào', 'Voy a la escuela'],
        [['他', '说', '中文'], 'tā shuō Zhōngwén', 'Él habla chino'],
        [['我', '爱', '学习'], 'wǒ ài xuéxí', 'Me encanta estudiar'],
      ],
      gram: [
        { q: '我 ___ 中文。', opts: ['说', '吃', '来'], a: 0, why: '说 (shuō) = hablar: 说中文 = hablar chino.' },
        { q: '我 ___ 喜欢咖啡。(no me gusta)', opts: ['不', '吗', '的'], a: 0, why: '不 va antes del verbo para negar: 我不喜欢 = no me gusta.' },
      ],
    },
    {
      id: 'comida', stage: 1, title: 'Comida y bebida', emoji: '🍎',
      tip: 'Se usa 吃 (comer) para sólidos y 喝 (beber) para líquidos. Para preguntar "¿qué?" se dice 什么 (shénme) y la palabra va donde iría la respuesta.',
      vocab: [
        ['水', 'shuǐ', 'agua', null], ['茶', 'chá', 'té', '🍵'], ['咖啡', 'kāfēi', 'café', '☕'], ['米饭', 'mǐfàn', 'arroz cocido', '🍚'],
        ['面条', 'miàntiáo', 'fideos', '🍜'], ['苹果', 'píngguǒ', 'manzana', '🍎'], ['鸡蛋', 'jīdàn', 'huevo', '🥚'],
        ['牛奶', 'niúnǎi', 'leche', '🥛'], ['面包', 'miànbāo', 'pan', '🍞'],
      ],
      sentences: [
        [['我', '想', '喝', '水'], 'wǒ xiǎng hē shuǐ', 'Quiero beber agua'],
        [['你', '想', '吃', '什么'], 'nǐ xiǎng chī shénme', '¿Qué quieres comer?'],
        [['我', '喜欢', '苹果'], 'wǒ xǐhuan píngguǒ', 'Me gustan las manzanas'],
      ],
      gram: [
        { q: '我想 ___ 水。', opts: ['喝', '吃', '看'], a: 0, why: '喝 (hē) es para beber; 吃 (chī) para comer.' },
        { q: '我想 ___ 米饭。', opts: ['吃', '喝', '去'], a: 0, why: 'El arroz se come: 吃米饭.' },
      ],
    },
    {
      id: 'colores', stage: 2, title: 'Colores', emoji: '🎨',
      tip: 'Para decir "el color rojo" se agrega 色 (sè): 红色. Y con 的 se describe: 红色的苹果 = una manzana roja.',
      vocab: [
        ['红', 'hóng', 'rojo', '🔴'], ['蓝', 'lán', 'azul', '🔵'], ['绿', 'lǜ', 'verde', '🟢'], ['黄', 'huáng', 'amarillo', '🟡'],
        ['黑', 'hēi', 'negro', '⚫'], ['白', 'bái', 'blanco', '⚪'], ['紫', 'zǐ', 'morado', '🟣'], ['橙色', 'chéngsè', 'naranja', '🟠'],
      ],
      sentences: [
        [['我', '喜欢', '红色'], 'wǒ xǐhuan hóngsè', 'Me gusta el rojo'],
        [['苹果', '是', '红色', '的'], 'píngguǒ shì hóngsè de', 'La manzana es roja'],
        [['我', '的', '猫', '是', '黑色', '的'], 'wǒ de māo shì hēisè de', 'Mi gato es negro'],
      ],
      gram: [
        { q: '红 ___ (el color rojo)', opts: ['色', '们', '吗'], a: 0, why: '色 (sè) significa "color": 红色, 黑色, 白色.' },
        { q: '苹果是红色 ___。', opts: ['的', '吗', '们'], a: 0, why: 'La estructura 是…的 sirve para describir: "es rojo".' },
      ],
    },
    {
      id: 'animales', stage: 2, title: 'Animales', emoji: '🐶',
      tip: 'Para contar animales pequeños se usa la palabra de medida 只 (zhī): 一只猫 = un gato.',
      vocab: [
        ['狗', 'gǒu', 'perro', '🐶'], ['猫', 'māo', 'gato', '🐱'], ['鸟', 'niǎo', 'pájaro', '🐦'], ['兔子', 'tùzi', 'conejo', '🐰'],
        ['熊猫', 'xióngmāo', 'panda', '🐼'], ['猪', 'zhū', 'cerdo', '🐷'], ['牛', 'niú', 'vaca', '🐮'],
      ],
      sentences: [
        [['我', '有', '一只', '猫'], 'wǒ yǒu yì zhī māo', 'Tengo un gato'],
        [['熊猫', '喜欢', '吃', '竹子'], 'xióngmāo xǐhuan chī zhúzi', 'Al panda le gusta comer bambú'],
        [['这', '是', '我', '的', '狗'], 'zhè shì wǒ de gǒu', 'Este es mi perro'],
      ],
      gram: [
        { q: '一 ___ 猫', opts: ['只', '岁', '吗'], a: 0, why: 'Para animales pequeños se usa la palabra de medida 只 (zhī).' },
        { q: '我 ___ 一只狗。(tengo)', opts: ['有', '是', '去'], a: 0, why: '有 (yǒu) = tener / haber.' },
      ],
    },
    {
      id: 'tiempo', stage: 2, title: 'El tiempo', emoji: '⏰',
      tip: 'En chino la palabra de tiempo va antes del verbo: 我明天去学校 = "yo mañana voy a la escuela". Los días de la semana son 星期 + número: 星期五 = viernes.',
      vocab: [
        ['今天', 'jīntiān', 'hoy', '📅'], ['明天', 'míngtiān', 'mañana (el día siguiente)', '➡️'], ['昨天', 'zuótiān', 'ayer', '⬅️'],
        ['现在', 'xiànzài', 'ahora', '⏱️'], ['早上', 'zǎoshang', 'por la mañana', '🌅'], ['晚上', 'wǎnshang', 'por la noche', '🌙'],
        ['星期', 'xīngqī', 'semana', '🗓️'], ['年', 'nián', 'año', '🎆'],
      ],
      sentences: [
        [['今天', '是', '星期五'], 'jīntiān shì xīngqīwǔ', 'Hoy es viernes'],
        [['明天', '我', '去', '学校'], 'míngtiān wǒ qù xuéxiào', 'Mañana voy a la escuela'],
        [['我', '晚上', '学习', '中文'], 'wǒ wǎnshang xuéxí Zhōngwén', 'Estudio chino por la noche'],
      ],
      gram: [
        { q: '“Hoy” se dice ___.', opts: ['今天', '明天', '昨天'], a: 0, why: '今天 (jīntiān) = hoy; 明天 = mañana; 昨天 = ayer.' },
        { q: '昨天 (zuótiān) significa ___.', opts: ['ayer', 'mañana', 'hoy'], a: 0, why: 'El carácter 昨 es "pasado": 昨天 = ayer.' },
      ],
    },
    {
      id: 'escuela', stage: 2, title: 'En la escuela', emoji: '🏫',
      tip: '汉字 (Hànzì) son los caracteres chinos y 汉语 / 中文 es el idioma. 在 (zài) indica dónde ocurre algo: 我在学校学习 = estudio en la escuela.',
      vocab: [
        ['学校', 'xuéxiào', 'escuela', '🏫'], ['同学', 'tóngxué', 'compañero/a de clase', '👭'], ['书包', 'shūbāo', 'mochila', '🎒'],
        ['铅笔', 'qiānbǐ', 'lápiz', '✏️'], ['写', 'xiě', 'escribir', '✍️'], ['读', 'dú', 'leer en voz alta', '🧐'],
        ['汉字', 'Hànzì', 'caracteres chinos', null], ['中文', 'Zhōngwén', 'idioma chino', null],
      ],
      sentences: [
        [['我', '在', '学校', '学习', '中文'], 'wǒ zài xuéxiào xuéxí Zhōngwén', 'Estudio chino en la escuela'],
        [['我', '写', '汉字'], 'wǒ xiě Hànzì', 'Escribo caracteres chinos'],
        [['他', '是', '我', '的', '同学'], 'tā shì wǒ de tóngxué', 'Él es mi compañero de clase'],
      ],
      gram: [
        { q: '我 ___ 汉字。', opts: ['写', '吃', '喝'], a: 0, why: '写 (xiě) = escribir: 写汉字.' },
        { q: '汉字 significa ___.', opts: ['caracteres chinos', 'pinyin', 'números'], a: 0, why: '汉 = Han (el pueblo chino) y 字 = carácter.' },
      ],
    },
    {
      id: 'lugares', stage: 2, title: 'Lugares', emoji: '🏙️',
      tip: 'Para decir de dónde eres: país + 人. 智利人 = chileno/a, 中国人 = chino/a. Para preguntar "¿dónde?" se usa 哪儿 (nǎr).',
      vocab: [
        ['公园', 'gōngyuán', 'parque', '🏞️'], ['商店', 'shāngdiàn', 'tienda', '🏪'], ['医院', 'yīyuàn', 'hospital', '🏥'],
        ['饭馆', 'fànguǎn', 'restaurante', '🍴'], ['车站', 'chēzhàn', 'estación', '🚉'], ['中国', 'Zhōngguó', 'China', '🇨🇳'], ['智利', 'Zhìlì', 'Chile', '🇨🇱'],
      ],
      sentences: [
        [['我', '在', '家'], 'wǒ zài jiā', 'Estoy en casa'],
        [['我', '是', '智利', '人'], 'wǒ shì Zhìlì rén', 'Soy chileno/a'],
        [['你', '去', '哪儿'], 'nǐ qù nǎr', '¿Adónde vas?'],
      ],
      gram: [
        { q: '我 ___ 家。(estoy en)', opts: ['在', '是', '吗'], a: 0, why: '在 (zài) indica ubicación: 我在家 = estoy en casa.' },
        { q: '我是智利 ___。', opts: ['人', '们', '的'], a: 0, why: '人 (rén) = persona: 智利人 = chileno/a.' },
      ],
    },
  ],
};
