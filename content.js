// Contenido de English Quest. Para ampliar la app basta con agregar unidades aquí.
// vocab: [inglés, español, emoji|null]   sentences: [inglés, español]
// gram:  { q: "frase con ___", opts: [...], a: índice correcto, why: explicación en español }
window.CONTENT = {
  stages: [
    { id: 1, name: 'Etapa 1 · Primeros pasos', sub: 'Nivel A1 — palabras y frases básicas' },
    { id: 2, name: 'Etapa 2 · Mi mundo', sub: 'Nivel A2 — rutina, casa y hábitos' },
  ],
  units: [
    {
      id: 'saludos', stage: 1, title: 'Saludos', emoji: '👋',
      tip: 'En inglés "Hello" sirve para todo momento. Para despedirte usa "Goodbye" o "Bye".',
      vocab: [
        ['hello', 'hola', '👋'], ['goodbye', 'adiós', null], ['please', 'por favor', null],
        ['thank you', 'gracias', '🙏'], ['sorry', 'perdón', null], ['yes', 'sí', '✅'],
        ['no', 'no', '❌'], ['good morning', 'buenos días', '🌅'], ['good night', 'buenas noches', '🌙'],
        ['fine', 'bien', null],
      ],
      sentences: [
        ['Hello, my name is Ana', 'Hola, me llamo Ana'],
        ['How are you', '¿Cómo estás?'],
        ['I am fine, thank you', 'Estoy bien, gracias'],
        ['Nice to meet you', 'Mucho gusto'],
      ],
      gram: [
        { q: 'My name ___ Ana.', opts: ['is', 'am', 'are'], a: 0, why: 'Con "name" (nombre) se usa "is": My name is...' },
        { q: 'I ___ fine, thank you.', opts: ['am', 'is', 'are'], a: 0, why: 'Con "I" siempre usamos "am".' },
      ],
    },
    {
      id: 'numeros', stage: 1, title: 'Números 1-10', emoji: '🔢',
      tip: 'Para decir tu edad en inglés se usa "to be": "I am 11" (soy 11), no "I have 11".',
      vocab: [
        ['one', 'uno', '1️⃣'], ['two', 'dos', '2️⃣'], ['three', 'tres', '3️⃣'], ['four', 'cuatro', '4️⃣'],
        ['five', 'cinco', '5️⃣'], ['six', 'seis', '6️⃣'], ['seven', 'siete', '7️⃣'], ['eight', 'ocho', '8️⃣'],
        ['nine', 'nueve', '9️⃣'], ['ten', 'diez', '🔟'],
      ],
      sentences: [
        ['I have two cats', 'Tengo dos gatos'],
        ['She is ten years old', 'Ella tiene diez años'],
        ['There are five books', 'Hay cinco libros'],
      ],
      gram: [
        { q: 'I ___ ten years old.', opts: ['am', 'have', 'has'], a: 0, why: 'La edad se dice con "to be": I am ten (no "I have ten").' },
        { q: 'How old ___ you?', opts: ['are', 'is', 'am'], a: 0, why: 'Con "you" usamos "are": How old are you?' },
      ],
    },
    {
      id: 'colores', stage: 1, title: 'Colores', emoji: '🎨',
      tip: 'Antes de una palabra que empieza con vocal se usa "an" en vez de "a": an apple, an orange.',
      vocab: [
        ['red', 'rojo', '🔴'], ['blue', 'azul', '🔵'], ['green', 'verde', '🟢'], ['yellow', 'amarillo', '🟡'],
        ['black', 'negro', '⚫'], ['white', 'blanco', '⚪'], ['orange', 'naranja', '🟠'],
        ['purple', 'morado', '🟣'], ['brown', 'café', '🟤'], ['pink', 'rosado', '🌸'],
      ],
      sentences: [
        ['The sky is blue', 'El cielo es azul'],
        ['I like the red dress', 'Me gusta el vestido rojo'],
        ['My cat is black and white', 'Mi gato es negro y blanco'],
      ],
      gram: [
        { q: 'I eat ___ apple.', opts: ['an', 'a', 'the'], a: 0, why: '"apple" empieza con vocal, por eso usamos "an".' },
        { q: 'The grass is ___.', opts: ['green', 'blue', 'purple'], a: 0, why: 'El pasto es verde: green.' },
      ],
    },
    {
      id: 'familia', stage: 1, title: 'Mi familia', emoji: '👨‍👩‍👧',
      tip: '"My" significa "mi": my mother, my father. Nunca se dice "me mother".',
      vocab: [
        ['mother', 'madre', '👩'], ['father', 'padre', '👨'], ['sister', 'hermana', '👧'], ['brother', 'hermano', '👦'],
        ['grandmother', 'abuela', '👵'], ['grandfather', 'abuelo', '👴'], ['baby', 'bebé', '👶'],
        ['friend', 'amigo/a', '🧑‍🤝‍🧑'], ['family', 'familia', '👨‍👩‍👧‍👦'],
      ],
      sentences: [
        ['This is my mother', 'Esta es mi madre'],
        ['I have one brother', 'Tengo un hermano'],
        ['My grandfather is very kind', 'Mi abuelo es muy amable'],
      ],
      gram: [
        { q: 'This is ___ mother.', opts: ['my', 'me', 'I'], a: 0, why: '"my" = mi. Va antes del sustantivo: my mother.' },
        { q: 'She is my ___.', opts: ['sister', 'brother', 'father'], a: 0, why: '"She" es ella, así que es "sister" (hermana).' },
      ],
    },
    {
      id: 'animales', stage: 1, title: 'Animales', emoji: '🐶',
      tip: 'Para más de uno casi siempre agregamos -s: one dog → two dogs.',
      vocab: [
        ['dog', 'perro', '🐶'], ['cat', 'gato', '🐱'], ['bird', 'pájaro', '🐦'], ['fish', 'pez', '🐟'],
        ['horse', 'caballo', '🐴'], ['cow', 'vaca', '🐮'], ['rabbit', 'conejo', '🐰'],
        ['monkey', 'mono', '🐵'], ['elephant', 'elefante', '🐘'], ['lion', 'león', '🦁'],
      ],
      sentences: [
        ['I have a dog', 'Tengo un perro'],
        ['The cat is on the sofa', 'El gato está en el sofá'],
        ['Elephants are very big', 'Los elefantes son muy grandes'],
      ],
      gram: [
        { q: 'I have two ___.', opts: ['dogs', 'dog', 'doges'], a: 0, why: 'Más de uno: agregamos -s → dogs.' },
        { q: 'The bird ___ small.', opts: ['is', 'are', 'am'], a: 0, why: 'Un solo pájaro (he/she/it) → "is".' },
      ],
    },
    {
      id: 'escuela', stage: 1, title: 'En la escuela', emoji: '🎒',
      tip: '"On" significa encima de algo, "in" dentro de algo: the book is on the desk, the pen is in the bag.',
      vocab: [
        ['book', 'libro', '📖'], ['pencil', 'lápiz', '✏️'], ['backpack', 'mochila', '🎒'], ['teacher', 'profesor/a', '🧑‍🏫'],
        ['desk', 'escritorio', '🪑'], ['notebook', 'cuaderno', '📓'], ['computer', 'computador', '💻'],
        ['classroom', 'sala de clases', '🏫'], ['student', 'estudiante', '🧑‍🎓'],
      ],
      sentences: [
        ['I am a student', 'Soy estudiante'],
        ['The book is on the desk', 'El libro está sobre el escritorio'],
        ['My teacher is very nice', 'Mi profesora es muy simpática'],
      ],
      gram: [
        { q: 'The book is ___ the desk.', opts: ['on', 'in', 'at'], a: 0, why: 'Encima de una superficie usamos "on".' },
        { q: 'The pencil is ___ my backpack.', opts: ['in', 'on', 'under'], a: 0, why: 'Dentro de la mochila → "in".' },
      ],
    },
    {
      id: 'comida', stage: 1, title: 'Comida', emoji: '🍎',
      tip: '"I like pizza" = me gusta la pizza. "I don\'t like fish" = no me gusta el pescado.',
      vocab: [
        ['apple', 'manzana', '🍎'], ['bread', 'pan', '🍞'], ['milk', 'leche', '🥛'], ['water', 'agua', '💧'],
        ['cheese', 'queso', '🧀'], ['egg', 'huevo', '🥚'], ['rice', 'arroz', '🍚'],
        ['chicken', 'pollo', '🍗'], ['banana', 'plátano', '🍌'], ['pizza', 'pizza', '🍕'],
      ],
      sentences: [
        ['I like pizza', 'Me gusta la pizza'],
        ['She drinks milk every morning', 'Ella toma leche cada mañana'],
        ['I want an apple', 'Quiero una manzana'],
      ],
      gram: [
        { q: 'She drinks ___ every morning.', opts: ['milk', 'bread', 'chicken'], a: 0, why: 'Se bebe (drinks) leche: milk.' },
        { q: 'I want ___ egg.', opts: ['an', 'a', 'two'], a: 0, why: '"egg" empieza con vocal: an egg.' },
      ],
    },
    {
      id: 'cuerpo', stage: 1, title: 'El cuerpo', emoji: '🧍',
      tip: 'Algunas palabras son irregulares: foot → feet (pie → pies), no "foots".',
      vocab: [
        ['head', 'cabeza', '🗣️'], ['hand', 'mano', '✋'], ['foot', 'pie', '🦶'], ['eye', 'ojo', '👁️'],
        ['ear', 'oreja', '👂'], ['nose', 'nariz', '👃'], ['mouth', 'boca', '👄'], ['leg', 'pierna', '🦵'],
      ],
      sentences: [
        ['I see with my eyes', 'Veo con mis ojos'],
        ['I have two hands', 'Tengo dos manos'],
        ['Touch your nose', 'Toca tu nariz'],
      ],
      gram: [
        { q: 'I see with my ___.', opts: ['eyes', 'ears', 'nose'], a: 0, why: 'Con los ojos vemos: eyes.' },
        { q: 'I have two ___.', opts: ['feet', 'foots', 'foot'], a: 0, why: 'Plural irregular: foot → feet.' },
      ],
    },
    {
      id: 'tobe', stage: 1, title: 'Verbo to be', emoji: '🧩',
      tip: 'I am · you are · he/she/it is · we are · they are. En inglés siempre se dice el sujeto: "I am", no solo "am".',
      vocab: [
        ['I', 'yo', '🙋'], ['you', 'tú', '👉'], ['he', 'él', '👨'], ['she', 'ella', '👩'],
        ['we', 'nosotros', '👫'], ['they', 'ellos', '👥'],
      ],
      sentences: [
        ['I am happy', 'Estoy feliz'],
        ['She is my friend', 'Ella es mi amiga'],
        ['We are in the classroom', 'Estamos en la sala de clases'],
        ['They are not here', 'Ellos no están aquí'],
      ],
      gram: [
        { q: 'She ___ a student.', opts: ['is', 'am', 'are'], a: 0, why: 'he / she / it → is.' },
        { q: 'They ___ my friends.', opts: ['are', 'is', 'am'], a: 0, why: 'they / we / you → are.' },
        { q: 'I ___ happy.', opts: ['am', 'is', 'are'], a: 0, why: 'I → am.' },
        { q: 'We ___ in the classroom.', opts: ['are', 'is', 'am'], a: 0, why: 'we → are.' },
      ],
    },
    {
      id: 'dias', stage: 1, title: 'Días de la semana', emoji: '📅',
      tip: 'En inglés los días siempre empiezan con MAYÚSCULA: Monday, Tuesday... Y se usa "on": on Monday.',
      vocab: [
        ['Monday', 'lunes', null], ['Tuesday', 'martes', null], ['Wednesday', 'miércoles', null],
        ['Thursday', 'jueves', null], ['Friday', 'viernes', null], ['Saturday', 'sábado', null],
        ['Sunday', 'domingo', null], ['today', 'hoy', '📍'], ['tomorrow', 'mañana', '➡️'],
      ],
      sentences: [
        ['Today is Monday', 'Hoy es lunes'],
        ['I go to school on Monday', 'Voy al colegio el lunes'],
        ['I play on Saturday', 'Juego el sábado'],
      ],
      gram: [
        { q: 'I go to school ___ Monday.', opts: ['on', 'in', 'at'], a: 0, why: 'Con días de la semana se usa "on".' },
        { q: 'After Monday comes ___.', opts: ['Tuesday', 'Friday', 'Sunday'], a: 0, why: 'Después del lunes viene el martes: Tuesday.' },
      ],
    },
    // ---------------- Etapa 2 ----------------
    {
      id: 'rutina', stage: 2, title: 'Mi rutina', emoji: '⏰',
      tip: 'Con he / she / it el verbo agrega -s o -es: I watch TV → she watches TV.',
      vocab: [
        ['wake up', 'despertarse', '⏰'], ['brush my teeth', 'cepillarme los dientes', '🪥'],
        ['have breakfast', 'tomar desayuno', '🥞'], ['go to school', 'ir al colegio', '🏫'],
        ['do homework', 'hacer la tarea', '📝'], ['play games', 'jugar', '🎮'],
        ['watch TV', 'ver televisión', '📺'], ['go to bed', 'irse a dormir', '🛏️'],
      ],
      sentences: [
        ['I wake up at seven o\'clock', 'Me despierto a las siete en punto'],
        ['She brushes her teeth', 'Ella se cepilla los dientes'],
        ['I do my homework in the afternoon', 'Hago mi tarea en la tarde'],
        ['He goes to bed at ten', 'Él se va a dormir a las diez'],
      ],
      gram: [
        { q: 'I ___ up at seven.', opts: ['wake', 'wakes', 'waking'], a: 0, why: 'Con "I" el verbo queda igual: wake.' },
        { q: 'She ___ TV at night.', opts: ['watches', 'watch', 'watching'], a: 0, why: 'she + verbo terminado en -ch → -es: watches.' },
        { q: 'He ___ to school by bus.', opts: ['goes', 'go', 'going'], a: 0, why: 'he + go → goes.' },
      ],
    },
    {
      id: 'casa', stage: 2, title: 'Mi casa', emoji: '🏠',
      tip: '"There is" se usa para uno (there is a bed), "there are" para varios (there are two chairs).',
      vocab: [
        ['house', 'casa', '🏠'], ['bedroom', 'dormitorio', '🛏️'], ['kitchen', 'cocina', '🍳'],
        ['bathroom', 'baño', '🚿'], ['living room', 'living', '🛋️'], ['door', 'puerta', '🚪'],
        ['window', 'ventana', '🪟'], ['garden', 'jardín', '🌳'], ['table', 'mesa', '🍽️'],
      ],
      sentences: [
        ['My house has a big garden', 'Mi casa tiene un jardín grande'],
        ['There is a bed in my bedroom', 'Hay una cama en mi dormitorio'],
        ['We eat in the kitchen', 'Comemos en la cocina'],
      ],
      gram: [
        { q: 'I sleep in the ___.', opts: ['bedroom', 'kitchen', 'garden'], a: 0, why: 'Dormimos en el dormitorio: bedroom.' },
        { q: 'There ___ two windows.', opts: ['are', 'is', 'am'], a: 0, why: 'Para varios usamos "there are".' },
        { q: 'I cook in the ___.', opts: ['kitchen', 'bathroom', 'bedroom'], a: 0, why: 'Cocinamos en la cocina: kitchen.' },
      ],
    },
    {
      id: 'ropa', stage: 2, title: 'La ropa', emoji: '👕',
      tip: '"Wear" significa llevar puesto: I wear a jacket. Para decir "me gusta" usa "like".',
      vocab: [
        ['shirt', 'camisa', '👕'], ['pants', 'pantalón', '👖'], ['dress', 'vestido', '👗'], ['shoes', 'zapatos', '👟'],
        ['hat', 'sombrero', '👒'], ['jacket', 'chaqueta', '🧥'], ['socks', 'calcetines', '🧦'], ['shorts', 'short', '🩳'],
      ],
      sentences: [
        ['I wear a blue shirt', 'Uso una camisa azul'],
        ['She likes her new dress', 'A ella le gusta su vestido nuevo'],
        ['It is cold, so I wear a jacket', 'Hace frío, así que uso una chaqueta'],
      ],
      gram: [
        { q: 'I wear ___ on my feet.', opts: ['shoes', 'a hat', 'a shirt'], a: 0, why: 'En los pies usamos zapatos: shoes.' },
        { q: 'It is cold. I wear a ___.', opts: ['jacket', 'shorts', 'dress'], a: 0, why: 'Con frío usamos chaqueta: jacket.' },
      ],
    },
    {
      id: 'presente', stage: 2, title: 'Gustos y acciones', emoji: '💬',
      tip: 'Con he / she / it el verbo cambia: I like → she likes. Con I / you / we / they queda igual.',
      vocab: [
        ['like', 'gustar', '❤️'], ['want', 'querer', '🙏'], ['have', 'tener', '🤲'], ['play', 'jugar', '⚽'],
        ['eat', 'comer', '🍽️'], ['drink', 'beber', '🥤'], ['read', 'leer', '📚'], ['write', 'escribir', '✍️'],
      ],
      sentences: [
        ['I like to read books', 'Me gusta leer libros'],
        ['She plays soccer after school', 'Ella juega fútbol después del colegio'],
        ['They want a new game', 'Ellos quieren un juego nuevo'],
        ['Do you like chocolate', '¿Te gusta el chocolate?'],
      ],
      gram: [
        { q: 'She ___ pizza.', opts: ['likes', 'like', 'liking'], a: 0, why: 'she + like → likes (agregamos -s).' },
        { q: 'I ___ milk every day.', opts: ['drink', 'drinks', 'drinking'], a: 0, why: 'Con "I" el verbo no cambia: drink.' },
        { q: 'He ___ a bike.', opts: ['has', 'have', 'haves'], a: 0, why: 'he + have → has (es irregular).' },
        { q: 'Do you ___ chocolate?', opts: ['like', 'likes', 'liking'], a: 0, why: 'Después de "do" el verbo va sin cambio: like.' },
      ],
    },
  ],
};
