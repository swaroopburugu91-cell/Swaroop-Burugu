import React from 'react';
import { dbService } from '../services/db';
import { useLanguage } from '../context/LanguageContext';
import {
  History,
  Target,
  Eye,
  BookOpen,
  Sparkles,
  ShieldAlert,
  HeartHandshake,
  Users,
  Baby,
  Heart
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const churchInfo = dbService.getSnapshot().church_info;
  const { isTelugu, t } = useLanguage();

  const coreBeliefs = [
    {
      title: isTelugu ? 'పరిశుద్ధ బైబిల్ వాక్య ప్రామాణికత' : 'The Inerrancy of Holy Scripture',
      desc: isTelugu
        ? 'పాత మరియు క్రొత్త నిబంధనల 66 పుస్తకాలతో కూడిన పరిశుద్ధ బైబిల్ దేవునిచే ప్రత్యక్షపరచబడిన నిర్దోషమైన సత్యవాక్యమని, విశ్వాసమునకు సర్వోన్నత ప్రమాణమని మేము నమ్ముతున్నాము.'
        : 'We believe the Holy Bible, consisting of 66 books of the Old and New Testaments, is the verbally inspired Word of God, infallible in original autographs, and our supreme authority in all matters of faith and conduct.'
    },
    {
      title: isTelugu ? 'సర్వశక్తిమంతుడైన త్రిత్వ దేవుడు' : 'The Eternal Triune God',
      desc: isTelugu
        ? 'తండ్రి, కుమార, పరిశుద్ధాత్మ అనే ముగ్గురు ఏకరీతి వ్యక్తులలో నిత్యమున్న ఏకైక నిజ దేవునిని మేము ఆరాధిస్తున్నాము.'
        : 'We believe in one God eternally existing in three co-equal persons: Father, Son, and Holy Spirit, infinite in holiness, wisdom, justice, and grace.'
    },
    {
      title: isTelugu ? 'కృప ద్వారా మాత్రమే రక్షణ' : 'Salvation by Grace Through Faith',
      desc: isTelugu
        ? 'మన ప్రభువైన యేసుక్రీస్తు సిలువ మరణము, పునరుత్థానము మరియు రక్తమునందలి విశ్వాసము ద్వారా మానవాళికి ఉచిత రక్షణ లభించును.'
        : 'We affirm that salvation is the free gift of God offered to sinful mankind through personal faith in the substitutionary atonement, bodily resurrection, and shed blood of our Lord Jesus Christ alone.'
    },
    {
      title: isTelugu ? 'పరిశుద్ధాత్ముని కార్యం' : 'The Person and Work of the Holy Spirit',
      desc: isTelugu
        ? 'పరిశుద్ధాత్ముడు పాపమును గూర్చి ఒప్పింపజేసి, నూతన జన్మను దయచేసి, సంఘాన్ని బలపరచి, ఆత్మీయ వరములతో నింపును.'
        : 'We believe the Holy Spirit convicts the world of sin, regenerates the believing sinner, indwells the church, empowers holy living, and imparts spiritual gifts for the edification of the body of Christ.'
    },
    {
      title: isTelugu ? 'పరిశుద్ధ క్రైస్తవ జీవితము' : 'The Christian Walk and Holiness',
      desc: isTelugu
        ? 'క్రీస్తును వెంబడించు ప్రతి విశ్వాసి లోకానుసారమైన తలంపులకు దూరంగా ఉంటూ, క్రీస్తు ప్రేమను ప్రదర్శిస్తూ పరిశుద్ధతలో ఎదగాలని విశ్వసిస్తున్నాము.'
        : 'We believe believers are called to walk worthy of the Lord, growing in sanctification, showing Christ-like love, and remaining separate from worldly compromises.'
    },
    {
      title: isTelugu ? 'క్రీస్తు మహిమోపేతమైన రాకడ' : 'The Blessed Hope & Christ’s Return',
      desc: isTelugu
        ? 'మన రక్షకుడైన యేసుక్రీస్తు శరీరధారియై సకల మహిమతో ప్రత్యక్షమగుట, మృతుల పునరుత్థానము మరియు నిత్య జీవము కొరకు నిరీక్షిస్తున్నాము.'
        : 'We eagerly anticipate the personal, visible, and glorious return of our Lord and Savior Jesus Christ, the resurrection of the dead, and eternal life in God’s heavenly presence.'
    }
  ];

  const ministries = [
    {
      name: isTelugu ? 'స్తుతి ఆరాధన పరిచర్య' : 'Worship & Music Ministry',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      desc: isTelugu
        ? 'ఆత్మతోను సత్యముతోను ప్రభువును స్తుతించుట మరియు హృదయపూర్వక కీర్తనల ద్వారా దైవ సన్నిధిని అనుభవించుట.'
        : 'Leading congregational adoration in spirit and truth through traditional hymns and scriptural anthems that focus squarely on the majestic character of God.'
    },
    {
      name: isTelugu ? 'విజ్ఞాపన ప్రార్థనా పరిచర్య' : 'Intercessory Prayer Ministry',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      desc: isTelugu
        ? '24/7 ప్రార్థనా బలిపీఠం, ప్రతి శుక్రవారం ఉపవాస ప్రార్థనలు, రోగుల స్వస్థత మరియు ఆత్మీయ ఉజ్జీవం కొరకైన విజ్ఞాపనలు.'
        : 'Maintaining a 24/7 prayer altar, holding weekly fasting prayer gatherings on Fridays, and interceding for missionary efforts, the sick, and nation revival.'
    },
    {
      name: isTelugu ? 'వాక్యోపదేశం & బైబిల్ అధ్యయనం' : 'Systematic Bible Teaching',
      icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
      desc: isTelugu
        ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ ద్వారా మరియు సంఘ కూడికలలో వచన-వచన వివరణతో దేవుని వాక్యమును లోతుగా బోధించుట.'
        : 'Equipping saints through expository preaching, midweek verse-by-verse chapter studies, and academic depth through Bible Open Universes courses.'
    },
    {
      name: isTelugu ? 'యువజన పరిచర్య (ఇగ్నైట్)' : 'Ignite Youth Ministry',
      icon: <Users className="w-6 h-6 text-purple-500" />,
      desc: isTelugu
        ? 'యువతీ యువకులను దైవిక విలువలతో నడిపించి, చదువులలో మరియు క్రీస్తు సాక్ష్యములో నిలకడగా ఉండేలా శిక్షణ.'
        : 'Discipling teenagers and young professionals to stand firm in godly convictions, excel academically, and share Christ confidently on college campuses.'
    },
    {
      name: isTelugu ? 'సండే స్కూల్ & చిన్నబిడ్డల పరిచర్య' : 'Kingdom Kids Children’s Ministry',
      icon: <Baby className="w-6 h-6 text-pink-500" />,
      desc: isTelugu
        ? 'చిన్ననాటి నుంచే బైబిల్ కథలు, కంఠస్థ వాక్యాలు, పాటలు మరియు నైతిక విలువల ద్వారా పిల్లలను తీర్చిదిద్దుట.'
        : 'Teaching little children the stories of Scripture, foundational memory verses, missionary biographies, and moral character in a joyful environment.'
    },
    {
      name: isTelugu ? 'సేవ & సమాజ క్షేమ పరిచర్య' : 'Compassion & Community Service',
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      desc: isTelugu
        ? 'ఉచిత వైద్య శిబిరాలు, నిరుపేదలకు ఆహార పంపిణీ, విద్యా సహాయం ద్వారా క్రీస్తు ప్రేమను పంచడం.'
        : 'Extending Christ’s love to the underprivileged through free medical clinics, disaster relief aid, educational sponsorships, and food distribution drives.'
    }
  ];

  const affiliationDisplay = isTelugu
    ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ ఇండియా & ఇంటర్నేషనల్ అనుబంధ సంస్థ'
    : (churchInfo.affiliation || 'Affiliated to Bible Open Universes India & International');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-700 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300 inline-block shadow-sm">
          {isTelugu ? 'క్రీస్తు వరల్డ్ పరిచయం' : 'About CHRIST WORLD'} • {affiliationDisplay}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-cinzel">
          {isTelugu ? 'మా పునాది, దర్శనం & పిలుపు' : 'Our Foundation, Mission & Calling'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.common.motto} — {isTelugu
            ? 'క్రీస్తు వరల్డ్ చర్చ్ ఆత్మీయ చరిత్ర, విశ్వాస ప్రమాణాలు మరియు పరిచర్యలను తెలుసుకోండి.'
            : 'Discover the heartbeat, historical heritage, doctrinal beliefs, and active ministries of CHRIST WORLD.'}
        </p>
      </div>

      {/* History, Mission, Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-cinzel text-slate-900">
            {isTelugu ? 'సంఘ చరిత్ర' : 'Church History'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {isTelugu
              ? 'దేవుని ఉజ్జీవము మరియు వాక్య జ్ఞానము కొరకైన ప్రార్థనతో ప్రారంభమైన క్రీస్తు వరల్డ్, నేడు విస్తరిస్తున్న ఆత్మీయ సమాజముగా మరియు బైబిల్ ఓపెన్ యూనివర్సెస్ ద్వారా భారతదేశం మరియు విదేశాలలో శిక్షణా కేంద్రముగా వర్ధిల్లుతోంది.'
              : churchInfo.history}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-cinzel text-slate-900">
            {isTelugu ? 'మా లక్ష్యం' : 'Our Mission'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {isTelugu
              ? 'యేసు క్రీస్తు సువార్తను స్పష్టతతో ప్రకటించుట, దైవ వాక్యము మరియు ప్రార్థన ద్వారా విశ్వాసులను స్థిరపరచుట, మరియు బైబిల్ ఓపెన్ యూనివర్సెస్ ద్వారా దైవజనులను సిద్ధపరచుట.'
              : churchInfo.mission}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-cinzel text-slate-900">
            {isTelugu ? 'మా దర్శనం' : 'Our Vision'}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {isTelugu
              ? 'క్రీస్తు ప్రేమను ప్రతి హృదయానికి చేరవేసి, ప్రతి స్థానిక ప్రాంతంలో ప్రార్థనాపరులైన శిష్యులను మరియు బలమైన దైవ సేవకులను ఉత్పత్తి చేసే ఆత్మీయ కేంద్రముగా నిలచుట.'
              : churchInfo.vision}
          </p>
        </div>
      </div>

      {/* Core Beliefs (Statement of Faith) */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
            {isTelugu ? 'వాక్య సిద్ధాంతాలు' : 'Doctrinal Foundations'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
            {isTelugu ? 'మేము విశ్వసించు సిద్ధాంతాలు' : 'What We Believe'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {isTelugu
              ? 'అపొస్తలుల బోధన మరియు పరిశుద్ధ గ్రంథ సత్యములపై స్థిరపరచబడినవి.'
              : 'Rooted firmly in historical biblical Christianity and the teachings of the Apostles.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreBeliefs.map((b, i) => (
            <div key={i} className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700/60 space-y-2.5">
              <span className="text-xs font-bold text-amber-400 font-cinzel">0{i + 1}.</span>
              <h4 className="text-base font-bold text-white">{b.title}</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ministries of the Church */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            {isTelugu ? 'వివిధ విభాగాలు' : 'Active Departments'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-slate-900">
            {isTelugu ? 'సంఘ పరిచర్యలు' : 'Our Church Ministries'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {isTelugu
              ? 'క్రీస్తును సేవించుటకు, ఆత్మీయంగా ఎదుగుటకు ప్రతి ఒక్కరికీ అనుకూలమైన వేదికలు.'
              : 'Opportunities to grow, serve, and glorify Jesus Christ together.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((m, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow hover:shadow-lg transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {m.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
