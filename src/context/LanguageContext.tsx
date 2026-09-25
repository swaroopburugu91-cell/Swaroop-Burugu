import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'te';

export interface Translations {
  common: {
    churchName: string;
    churchNameFull: string;
    affiliation: string;
    mottoLabel: string;
    motto: string;
    sundayWorship: string;
    helpline: string;
    search: string;
    adminLogin: string;
    adminDashboard: string;
    viewAll: string;
    learnMore: string;
    register: string;
    applyNow: string;
    watchLive: string;
    listenNow: string;
    close: string;
    submit: string;
    cancel: string;
    loading: string;
    share: string;
    language: string;
    english: string;
    telugu: string;
    allCategories: string;
    filter: string;
  };
  nav: {
    home: string;
    about: string;
    leadership: string;
    members: string;
    university: string;
    messages: string;
    youtube: string;
    events: string;
    gallery: string;
    announcements: string;
    contact: string;
    admin: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    exploreBtn: string;
    watchBtn: string;
    bouBtn: string;
    verseText: string;
    verseRef: string;
  };
  welcome: {
    sectionTag: string;
    heading: string;
    subheading: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
    stat4: string;
    stat4Label: string;
  };
  services: {
    title: string;
    subtitle: string;
    sundayTitle: string;
    sundayTime: string;
    sundayDesc: string;
    wednesdayTitle: string;
    wednesdayTime: string;
    wednesdayDesc: string;
    fridayTitle: string;
    fridayTime: string;
    fridayDesc: string;
  };
  bou: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    admissionsOpen: string;
    programsOffered: string;
    enrollBtn: string;
  };
  prayer: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    requestPlaceholder: string;
    submitBtn: string;
    successMsg: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    ministries: string;
    contactInfo: string;
    timing: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      churchName: 'CHRIST WORLD',
      churchNameFull: 'CHRIST WORLD',
      affiliation: 'Affiliated to Bible Open Universes India & International',
      mottoLabel: 'Motto',
      motto: '“Knowing Christ • Growing in Christ • Sharing Christ”',
      sundayWorship: 'Sunday Worship: 09:30 AM',
      helpline: 'Helpline',
      search: 'Search',
      adminLogin: 'Admin',
      adminDashboard: 'Admin Suite',
      viewAll: 'View All',
      learnMore: 'Learn More',
      register: 'Register',
      applyNow: 'Apply Now',
      watchLive: 'Watch Live',
      listenNow: 'Listen Now',
      close: 'Close',
      submit: 'Submit',
      cancel: 'Cancel',
      loading: 'Loading...',
      share: 'Share',
      language: 'Language',
      english: 'English',
      telugu: 'తెలుగు (Telugu)',
      allCategories: 'All Categories',
      filter: 'Filter',
    },
    nav: {
      home: 'Home',
      about: 'About Us',
      leadership: 'Leadership',
      members: 'Members',
      university: 'Bible Open Universes',
      messages: 'Bible Messages',
      youtube: 'YouTube Live',
      events: 'Events',
      gallery: 'Gallery',
      announcements: 'Announcements',
      contact: 'Contact Us',
      admin: 'Admin Console',
    },
    hero: {
      badge: 'Welcome to CHRIST WORLD',
      title1: 'CHRIST',
      title2: 'WORLD',
      subtitle: 'A vibrant Christ-centered church and biblical training center dedicated to expository scripture teaching, authentic discipleship, fervent prayer, and global mission.',
      exploreBtn: 'Explore Ministries',
      watchBtn: 'Live Worship Stream',
      bouBtn: 'Bible Open Universes',
      verseText: '“For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.”',
      verseRef: 'John 3:16 (NKJV)',
    },
    welcome: {
      sectionTag: 'Welcome to Our Church Family',
      heading: 'Rooted in Scripture, Passionate for Souls',
      subheading: 'Under the grace of God and affiliation with Bible Open Universes India & International, we exist to exalt the name of Jesus Christ and nurture believers into mature disciples.',
      stat1: '1,200+',
      stat1Label: 'Active Believers & Families',
      stat2: '15+',
      stat2Label: 'Years of Kingdom Ministry',
      stat3: '500+',
      stat3Label: 'Bible Open Universes Graduates',
      stat4: '24/7',
      stat4Label: 'Prayer Intercession',
    },
    services: {
      title: 'Weekly Worship & Gatherings',
      subtitle: 'Join us in fellowship, worship, and in-depth study of God’s living Word.',
      sundayTitle: 'Lord’s Day Worship Service',
      sundayTime: 'Every Sunday • 09:30 AM – 12:30 PM',
      sundayDesc: 'Joyful praise, biblical exposition, Lord’s Table, and personal prayer ministry.',
      wednesdayTitle: 'Midweek Bible Study & University Lecture',
      wednesdayTime: 'Every Wednesday • 07:00 PM – 08:30 PM',
      wednesdayDesc: 'Systematic chapter-by-chapter exposition led by Bible Open Universes faculty.',
      fridayTitle: 'All-Night Fasting & Miracle Prayer',
      fridayTime: 'Every Friday • 09:00 PM – 01:00 AM',
      fridayDesc: 'Intense corporate intercession for revival, healing, families, and our nation.',
    },
    bou: {
      badge: 'Academic & Theological Wing',
      title: 'Bible Open Universes (BOU)',
      subtitle: 'Equipping Servant-Leaders Across India & Internationally',
      description: 'Accredited certificate, diploma, and degree programs in biblical studies, pastoral leadership, and practical ministry for church workers and believers.',
      admissionsOpen: 'Admissions Open for Academic Year 2026-27',
      programsOffered: 'Certificate, Diploma & B.Th Programs available in English & Telugu.',
      enrollBtn: 'Apply for Admissions',
    },
    prayer: {
      title: 'Need Prayer? We Are Here For You',
      subtitle: 'Our pastoral team and 24/7 intercessory prayer warriors stand ready to pray with you.',
      namePlaceholder: 'Your Full Name',
      phonePlaceholder: 'Mobile Number',
      requestPlaceholder: 'Share your prayer burden or thanksgiving...',
      submitBtn: 'Send Prayer Request',
      successMsg: 'Thank you. Your prayer request has been received by our pastoral team.',
    },
    footer: {
      desc: 'A Christ-centered spiritual community dedicated to sound biblical teaching, passionate worship, prayer intercession, and equipping believers across India and the world through Bible Open Universes.',
      quickLinks: 'Quick Links',
      ministries: 'Ministries',
      contactInfo: 'Get in Touch',
      timing: 'Office Hours: Mon - Sat 9:00 AM - 5:00 PM',
      rights: 'All Rights Reserved. Christ World Church & Bible Open Universes.',
    },
  },
  te: {
    common: {
      churchName: 'క్రీస్తు వరల్డ్',
      churchNameFull: 'క్రీస్తు వరల్డ్ చర్చ్',
      affiliation: 'బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ అనుబంధ సంస్థ',
      mottoLabel: 'ధ్యేయం',
      motto: '“క్రీస్తును తెలుసుకొనుట • క్రీస్తులో ఎదుగుట • క్రీస్తును ప్రకటించుట”',
      sundayWorship: 'ఆదివారం ఆరాధన: ఉదయం 09:30 గంటలకు',
      helpline: 'సహాయవాణి',
      search: 'వెతకండి',
      adminLogin: 'అడ్మిన్',
      adminDashboard: 'అడ్మిన్ ప్యానెల్',
      viewAll: 'అన్నీ చూడండి',
      learnMore: 'మరిన్ని వివరాలు',
      register: 'నమోదు చేసుకోండి',
      applyNow: 'దరఖాస్తు చేయండి',
      watchLive: 'లైవ్ ఆరాధన',
      listenNow: 'సందేశాలు వినండి',
      close: 'మూసివేయి',
      submit: 'సమర్పించండి',
      cancel: 'రద్దు చేయి',
      loading: 'లోడ్ అవుతోంది...',
      share: 'షేర్ చేయండి',
      language: 'భాష',
      english: 'English (ఇంగ్లీష్)',
      telugu: 'తెలుగు',
      allCategories: 'అన్ని విభాగాలు',
      filter: 'వడపోత',
    },
    nav: {
      home: 'హోమ్',
      about: 'మా గురించి',
      leadership: 'నాయకత్వం',
      members: 'సభ్యుల డైరెక్టరీ',
      university: 'బైబిల్ ఓపెన్ యూనివర్సెస్',
      messages: 'బైబిల్ సందేశాలు',
      youtube: 'యూట్యూబ్ లైవ్',
      events: 'కార్యక్రమాలు',
      gallery: 'ఫోటో గ్యాలరీ',
      announcements: 'ప్రకటనలు',
      contact: 'సంప్రదించండి',
      admin: 'అడ్మిన్ లాగిన్',
    },
    hero: {
      badge: 'క్రీస్తు వరల్డ్ చర్చ్‌కి స్వాగతం',
      title1: 'CHRIST',
      title2: 'WORLD',
      subtitle: 'దేవుని జీవముగల వాక్యానుసారమైన బోధన, శిష్యరికం, ప్రార్థన మరియు సువార్త వ్యాప్తికి అంకితమైన ఆధ్యాత్మిక సమాజం. బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ ద్వారా విశ్వాసులను పరిచర్య కొరకు సిద్ధపరుస్తున్నాము.',
      exploreBtn: 'పరిచర్యల వివరాలు',
      watchBtn: 'ప్రత్యక్ష ప్రసారం (లైవ్)',
      bouBtn: 'బైబిల్ ఓపెన్ యూనివర్సెస్',
      verseText: '“దేవుడు లోకమును ఎంతో ప్రేమించెను. కాగా ఆయన తన అద్వితీయకుమారునిగా పుట్టిన వానియందు విశ్వాసముంచు ప్రతివాడును నశింపక నిత్యజీవము పొందునట్లు ఆయనను అనుగ్రహించెను.”',
      verseRef: 'యోహాను 3:16 (పరిశుద్ధ గ్రంథము)',
    },
    welcome: {
      sectionTag: 'మా ఆత్మీయ కుటుంబంలోనికి స్వాగతం',
      heading: 'వాక్యములో వేరూనిన విశ్వాసం • ఆత్మల రక్షణ కొరకైన భారం',
      subheading: 'దేవుని కృపను బట్టి, బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ అనుబంధంతో యేసు క్రీస్తు నామాన్ని హెచ్చించి, ప్రతి విశ్వాసిని క్రీస్తు సారూప్యములోనికి నడిపించడమే మా లక్ష్యం.',
      stat1: '1,200+',
      stat1Label: 'విశ్వాసులు & క్రైస్తవ కుటుంబాలు',
      stat2: '15+ ఏళ్ళు',
      stat2Label: 'దేవుని పరిచర్య అనుభవం',
      stat3: '500+',
      stat3Label: 'బైబిల్ కోర్సు పట్టభద్రులు',
      stat4: '24/7',
      stat4Label: 'నిరంతర ప్రార్థనా భారము',
    },
    services: {
      title: 'వారపు ఆరాధనా సమయాలు',
      subtitle: 'దేవుని వాక్యమును నేర్చుకొనుటకు, స్తుతి ఆరాధన చేయుటకు మాతో కలిసిరండి.',
      sundayTitle: 'ఆదివారపు ముఖ్య ఆరాధన',
      sundayTime: 'ప్రతి ఆదివారం • ఉదయం 09:30 – మధ్యాహ్నం 12:30',
      sundayDesc: 'ఆత్మతో సత్యముతో ఆరాధన, దైవ వాక్యోపదేశం, ప్రభువు బల్ల మరియు వ్యక్తిగత ప్రార్థనలు.',
      wednesdayTitle: 'వారపు మధ్యలో బైబిల్ అధ్యయనం & యూనివర్సెస్ క్లాస్',
      wednesdayTime: 'ప్రతి బుధవారం • సాయంత్రం 07:00 – 08:30',
      wednesdayDesc: 'బైబిల్ ఓపెన్ యూనివర్సెస్ అధ్యాపకులచే వాక్య ధ్యానం మరియు క్రమబద్ధమైన అధ్యయనం.',
      fridayTitle: 'ఉపవాస ప్రార్థన & స్వస్థత కూడిక',
      fridayTime: 'ప్రతి శుక్రవారం • రాత్రి 09:00 – 01:00',
      fridayDesc: 'ఆత్మీయ ఉజ్జీవము కొరకు, కుటుంబాల దీవెనల కొరకు రాత్రంతా జరిగే భారభరిత ప్రార్థన.',
    },
    bou: {
      badge: 'థియోలాజికల్ & బైబిల్ శిక్షణా విభాగం',
      title: 'బైబిల్ ఓపెన్ యూనివర్సెస్ (BOU)',
      subtitle: 'భారతదేశం మరియు అంతర్జాతీయంగా సేవకులను సిద్ధపరుచుట',
      description: 'పాస్టర్లు, సువార్తికులు, సంఘ సేవకులు మరియు ఆసక్తిగల విశ్వాసులకు సర్టిఫికెట్, డిప్లొమా మరియు డిగ్రీ కోర్సులు (తెలుగు మరియు ఇంగ్లీష్ మాధ్యమాలలో).',
      admissionsOpen: '2026-27 విద్యా సంవత్సరానికి ప్రవేశాలు ప్రారంభమైనవి',
      programsOffered: 'సర్టిఫికెట్ ఇన్ బిబ్లికల్ స్టడీస్, డిప్లొమా ఇన్ థియాలజీ, బి.టి.హెచ్ (B.Th).',
      enrollBtn: 'దరఖాస్తు ఫారమ్ పూరించండి',
    },
    prayer: {
      title: 'మీ కొరకు ప్రార్థన అవసరమా? మేము ఉన్నాము',
      subtitle: 'మా పాస్టర్ల బృందం మరియు 24/7 ప్రార్థనా యోధులు మీ భారము కొరకు ప్రార్థిస్తారు.',
      namePlaceholder: 'మీ పూర్తి పేరు',
      phonePlaceholder: 'ఫోన్ నంబర్',
      requestPlaceholder: 'మీ ప్రార్థన విన్నపమును ఇక్కడ రాయండి...',
      submitBtn: 'ప్రార్థన విన్నపాన్ని పంపండి',
      successMsg: 'ధన్యవాదాలు. మీ ప్రార్థనా విన్నపం మా పాస్టరల్ టీమ్‌కు చేరింది. మేము మీ కొరకు ప్రార్థిస్తాము.',
    },
    footer: {
      desc: 'యేసు క్రీస్తు సువార్తను ప్రకటిస్తూ, బలమైన బైబిల్ బోధనల ద్వారా విశ్వాసులను బలపరచుచు, బైబిల్ ఓపెన్ యూనివర్సెస్ ద్వారా అనేకులను శిష్యులుగా సిద్ధపరుస్తున్న ఆత్మీయ కుటుంబం.',
      quickLinks: 'ముఖ్యమైన లింకులు',
      ministries: 'పరిచర్యలు',
      contactInfo: 'చిరునామా & సమాచారం',
      timing: 'కార్యాలయ వేళలు: సోమ - శని ఉదయం 9:00 - సాయంత్రం 5:00',
      rights: 'సర్వహక్కులు ప్రత్యేకించబడినవి. క్రీస్తు వరల్డ్ చర్చ్ & బైబిల్ ఓపెన్ యూనివర్సెస్.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isTelugu: boolean;
  tText: (enText: string, teText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('christ_world_preferred_lang');
      return (saved === 'te' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('christ_world_preferred_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const tText = (enText: string, teText: string): string => {
    return language === 'te' ? (teText || enText) : enText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
        isTelugu: language === 'te',
        tText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
