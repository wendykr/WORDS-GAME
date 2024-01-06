# WORDS GAME

Projekt programu [ReactGirls Mentoring PODZIM 2023](https://reactgirls.com/mentoring)

- [Počáteční vize a cíle](#Pocatecni-vize-a-cile)
- [Abstrakt](#Abstrakt)
- [Rozsah a realizace](#Rozsah-a-realizace)


## Počáteční vize a cíle  
Vytvořit projekt, na kterém se chci naučit základy Reactu a současně mi bude aplikace pomocníkem při studování angličtiny.


## Abstrakt  
Hlavním tématem a cílem projektu bylo vytvořit aplikaci na procvičování anglické slovní zásoby s moduly:  
- **Flashcard** - na kartičce zobrazit slovo, po kliknutí na kartičku ji otočit a zobrazit překlad slova.
- **Quiz** - do vstupního pole (*input*) psát překlad zobrazeného slova. S možností nápovědy prvního písmena (*Hint*), nebo zobrazení správného překladu slova (*Don't know*).
- **Match** - vybrat správný překlad zobrazeného slova kliknutím na jedno ze 3 náhodně vygenerovaných slov.

Napříč moduly měnit výchozí nastavení aplikace v **Setting** - jazyk, počet slov, kategorizaci slov, oblíbená slova a zvuk.


## Rozsah a realizace
Stručný výčet znalostí, které jsem v projektu využila. *Uvádím znalosti týkající se Reactu - responsivitu a technické znalosti HTML/CSS považuji v tomto projektu jako samozřejmost.*
- rozdělení aplikace na menší celky do **komponent**
- práce s **`useState` a událostmi**
- formulářové prvky a **obousměrný data binding**
- **`useEffect` se závislostmi**
- **komunikace mezi komponentami**
- pokročilá komunikace **React Context** (`useContext`)
- přístup k DOM elementům skrze **Hook `useRef`**
- využití cloudové databáze **supabase** pro operaci s daty
- použití hotové **React knihovny** ([React Router](https://reactrouter.com/en/main), [Speech Synthesis](https://github.com/MikeyParton/react-speech-kit), [React Icons](https://react-icons.github.io/react-icons/))
- uložení projektu v repozitáři na **GitHubu** a jeho publikování na hostingovou službu **Netlify**