import React, { useState } from 'react';
import { dbService } from '../services/db';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  GraduationCap,
  Globe,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  CheckCircle,
  FileText,
  Clock,
  Mail,
  Phone,
  AlertCircle,
  ArrowRight,
  Send
} from 'lucide-react';

interface BibleUniversityViewProps {
  onApplyCourse: (course: Course) => void;
}

export const BibleUniversityView: React.FC<BibleUniversityViewProps> = ({ onApplyCourse }) => {
  const db = dbService.getSnapshot();
  const bou = db.bible_university;
  const courses = db.courses.filter(c => c.status === 'published');
  const faculty = db.faculty.sort((a, b) => a.display_order - b.display_order);
  const students = db.students;
  const { isTelugu, t } = useLanguage();

  // Enquiry form state
  const [enqName, setEnqName] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqPhone, setEnqPhone] = useState('');
  const [enqMessage, setEnqMessage] = useState('');
  const [enqSubmitted, setEnqSubmitted] = useState(false);

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enqName || !enqEmail || !enqMessage) return;

    dbService.submitContactEnquiry({
      name: enqName,
      email: enqEmail,
      phone: enqPhone,
      subject: 'Bible Open Universes Enquiry',
      message: enqMessage
    });

    setEnqSubmitted(true);
    setEnqName('');
    setEnqEmail('');
    setEnqPhone('');
    setEnqMessage('');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO HEADER */}
      <section className="relative bg-slate-950 text-white py-20 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>
              {isTelugu ? 'క్రీస్తు వరల్డ్ చర్చ్ విద్యా & థియోలాజికల్ విభాగం' : 'Academic & Theological Wing of CHRIST WORLD'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-cinzel text-white tracking-tight">
            {isTelugu ? 'బైబిల్ ఓపెన్ యూనివర్సెస్' : bou.title}
          </h1>

          <p className="text-amber-300 text-base sm:text-xl font-medium tracking-wide">
            “{isTelugu ? 'భారతదేశం మరియు ప్రపంచవ్యాప్తంగా దైవసేవకులను మరియు విశ్వాసులను తీర్చిదిద్దుట' : bou.subtitle}”
          </p>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed pt-2">
            {isTelugu
              ? 'దేవుని వాక్యమును లోతుగా గ్రహించి, సంఘ పరిచర్యలోను, సువార్త ప్రకటనలోను సమర్థవంతంగా పనిచేయుటకు సిద్ధపరిచే గుర్తింపు పొందిన బైబిల్ శిక్షణా విభాగం (తెలుగు & ఇంగ్లీష్ మాధ్యమాలు).'
              : 'Equipping pastors, church leaders, teachers, and passionate disciples with sound biblical exegesis, hermeneutics, and ministry leadership across India and internationally.'}
          </p>

          {/* Academic notice banner */}
          <div className="mt-6 p-3.5 bg-amber-950/40 border border-amber-600/40 rounded-xl max-w-3xl mx-auto text-[11px] text-amber-200/90 flex items-start space-x-2.5 text-left">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-amber-300">
                {isTelugu ? 'అకడమిక్ ప్రాజెక్ట్ గమనిక: ' : 'College Engineering Project Academic Notice: '}
              </strong>
              {bou.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT BIBLE OPEN UNIVERSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
                {isTelugu ? 'మా లక్ష్యము & దర్శనము' : 'Our Academic Vision'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel">
                {isTelugu ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ పరిచయం' : 'About Bible Open Universes'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {isTelugu
                  ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ (BOU) అనేది క్రీస్తు వరల్డ్ చర్చ్ యొక్క థియోలాజికల్ విభాగం. దేవుని వాక్య జ్ఞానాన్ని ప్రతి విశ్వాసికి మరియు గ్రామీణ సేవకులకు చేరువ చేయుటకు స్థాపించబడింది. బైబిల్ సత్యాలు, ఉపదేశ పద్ధతులు మరియు ఆత్మీయ నాయకత్వంలో శిక్షణ అందిస్తున్నాము.'
                  : bou.about_text}
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isTelugu ? 'క్రీస్తు కేంద్రమైన, పవిత్ర గ్రంథాధారిత వాక్య బోధన.' : 'Christ-centered and thoroughly Bible-saturated curriculum.'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isTelugu ? 'ఉద్యోగులు మరియు పరిచర్యలో ఉన్నవారికి అనుకూలమైన డిస్టెన్స్ లెర్నింగ్ మోడల్.' : 'Flexible distance learning cohorts for working professionals.'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isTelugu ? 'హెర్మెన్యూటిక్స్, చర్చ్ ప్లాంటింగ్ మరియు ప్రసంగ కళలలో లోతైన శిక్షణ.' : 'Systematic training in original context, hermeneutics, and homiletics.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                alt="Bible Open Universes Students"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDIA & INTERNATIONAL SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* India Programs */}
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              {isTelugu ? 'భారతదేశ వ్యాప్తంగా' : 'National Focus'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
              {isTelugu ? 'భారతదేశంలో బైబిల్ విద్య' : 'Bible Education in India'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {isTelugu
                ? 'భారతదేశ వ్యాప్తంగా గ్రామీణ సువార్తికులకు, సంఘ కాపరులకు మరియు ఆసక్తి గల విశ్వాసులకు తెలుగు మరియు ఇంగ్లీష్ భాషలలో కరస్పాండెన్స్ కోర్సులు మరియు వీకెండ్ తరగతులు నిర్వహించబడును.'
                : bou.india_training_info}
            </p>
            <div className="pt-2 text-xs text-amber-900 font-semibold space-y-1">
              <p>• {isTelugu ? 'తెలుగు మరియు ఇంగ్లీష్ మాడ్యులర్ పుస్తకాలు' : 'Regional vernacular modular study packs'}</p>
              <p>• {isTelugu ? 'ముఖ్య కేంద్రాలలో ప్రత్యక్ష శిక్షణా సెమినార్లు' : 'Weekend intensive seminars in key hubs'}</p>
              <p>• {isTelugu ? 'గ్రామీణ సేవకులకు రాయితీ ఫీజు సదుపాయం' : 'Subsidized fee structures for grassroots evangelists'}</p>
            </div>
          </div>

          {/* International Programs */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-slate-800 text-white shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {isTelugu ? 'అంతర్జాతీయ విభాగం' : 'Global Reach'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
              {isTelugu ? 'అంతర్జాతీయ బైబిల్ విద్య' : 'International Bible Education'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isTelugu
                ? 'అమెరికా, యూరప్, గల్ఫ్ మరియు ఆసియా దేశాల్లో ఉన్న ప్రవాస క్రైస్తవుల కోసం ప్రత్యేక ఆన్‌లైన్ ఇంటరాక్టివ్ క్లాసులు మరియు అంతర్జాతీయ పరిశోధనా సెమినార్లు.'
                : bou.international_training_info}
            </p>
            <div className="pt-2 text-xs text-blue-300 font-semibold space-y-1">
              <p>• {isTelugu ? 'ఆన్‌లైన్ డిజిటల్ లెర్నింగ్ వేదిక' : 'Fully online interactive digital platform'}</p>
              <p>• {isTelugu ? 'గల్ఫ్, యూరప్ మరియు ఇతర దేశాల విద్యార్థుల బృందాలు' : 'Global cohorts from North America, Europe, Gulf, & Asia'}</p>
              <p>• {isTelugu ? 'మిషనరీ గైడెన్స్ మరియు రీసెర్చ్ సెమినార్లు' : 'Cross-cultural missions and research symposia'}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. COURSES CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            {isTelugu ? 'కోర్సుల వివరాలు' : 'Curriculum'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-slate-900">
            {isTelugu ? 'అందుబాటులో ఉన్న కోర్సులు' : 'Offered Courses & Programs'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {isTelugu
              ? 'ప్రాథమిక బైబిల్ సత్యాల నుండి ఉన్నత నాయకత్వం వరకు క్రమబద్ధమైన అధ్యయనాలు.'
              : 'Structured theological tracks designed to equip you from foundational principles to advanced leadership.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={course.featured_image}
                    alt={course.course_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {course.duration}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow uppercase">
                    {course.level}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {isTelugu ? 'కోడ్' : 'Course Code'}: {course.code}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-amber-700 transition-colors">
                    {course.course_name}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                    <div>
                      <strong className="text-slate-800">{isTelugu ? 'అర్హత: ' : 'Eligibility: '}</strong>
                      <span>{course.eligibility}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">{isTelugu ? 'విధానం: ' : 'Mode: '}</strong>
                      <span className="text-amber-700 font-medium">{course.mode_of_study}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">{isTelugu ? 'సర్టిఫికేషన్: ' : 'Award: '}</strong>
                      <span>{course.certificate_information}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onApplyCourse(course)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
                >
                  <span>{isTelugu ? 'ఈ కోర్సుకు దరఖాస్తు చేయండి' : 'Apply for This Course'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ADMISSIONS, ELIGIBILITY & IMPORTANT DATES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            <div className="space-y-4">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                {isTelugu ? 'ప్రవేశాల సమాచారం' : 'Join the Next Cohort'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
                {isTelugu ? 'అడ్మిషన్లు & నిబంధనలు' : 'Admissions & Requirements'}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {bou.admissions_guidelines}
              </p>
              
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {isTelugu ? 'ప్రవేశ అర్హతలు:' : 'Eligibility Criteria:'}
                </h4>
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {bou.eligibility_requirements}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{isTelugu ? 'ముఖ్యమైన ప్రవేశ తేదీలు' : 'Important Admission Dates'}</span>
                </h4>
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {bou.important_dates}
                </div>
              </div>

              <div className="bg-amber-950/30 p-6 rounded-2xl border border-amber-600/30 space-y-3">
                <h4 className="text-sm font-bold text-amber-300">
                  {isTelugu ? 'కోర్సులో చేరడానికి సిద్ధంగా ఉన్నారా?' : 'Ready to Enroll?'}
                </h4>
                <p className="text-xs text-slate-300">
                  {isTelugu
                    ? 'మీకు నచ్చిన కోర్సును ఎంచుకొని ఆన్‌లైన్ దరఖాస్తు ఫారమ్ సమర్పించండి.'
                    : 'Select your desired course above or submit a direct application to speak with our Academic Admissions Counsellor.'}
                </p>
                {courses.length > 0 && (
                  <button
                    onClick={() => onApplyCourse(courses[0])}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow transition-all"
                  >
                    {isTelugu ? 'దరఖాస్తు ఫారమ్ ప్రారంభించండి' : 'Start Admission Form'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FACULTY MEMBERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            {isTelugu ? 'బోధకులు & గురువులు' : 'Scholars & Mentors'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-slate-900">
            {isTelugu ? 'యూనివర్సెస్ అధ్యాపక బృందం' : 'University Faculty'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {isTelugu
              ? 'దైవభక్తి మరియు లోతైన వాక్య అనుభవం కలిగిన ప్రఖ్యాత థియోలాజికల్ బోధకులు.'
              : 'Seasoned theologians, expository preachers, and counselors dedicated to mentoring the next generation of ministry leaders.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map(f => (
            <div
              key={f.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col items-center text-center group"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-amber-500/20 group-hover:border-amber-500 transition-colors shadow">
                <img
                  src={f.photo_url}
                  alt={f.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-cinzel">{f.name}</h3>
              <p className="text-[11px] font-semibold text-amber-700 mt-0.5">{f.designation}</p>
              <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-1">
                {f.qualification}
              </span>
              <p className="text-slate-600 text-xs mt-3 leading-relaxed line-clamp-3">
                {f.biography}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STUDENTS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            {isTelugu ? 'విద్యార్థుల సాక్ష్యాలు' : 'Student Voice'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-slate-900">
            {isTelugu ? 'విద్యార్థుల అనుభవాలు & ఫలితాలు' : 'Student Community & Impact'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map(s => (
            <div
              key={s.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={s.photo_url}
                    alt={s.name}
                    className="w-12 h-12 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{s.name}</h4>
                    <p className="text-[11px] text-amber-700 font-medium">{s.country}</p>
                  </div>
                </div>
                <p className="italic text-slate-600 text-xs leading-relaxed">
                  "{s.testimonial}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>{s.enrolled_course_name}</span>
                <span className="font-semibold text-slate-600">{s.graduation_year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT & ADMISSIONS ENQUIRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            <div className="space-y-4">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
                {isTelugu ? 'ప్రవేశాల కార్యాలయం' : 'Contact Admissions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-slate-900">
                {isTelugu ? 'బైబిల్ ఓపెన్ యూనివర్సెస్ కార్యాలయం' : 'Bible Open Universes Office'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {isTelugu
                  ? 'ప్రవేశాలు, స్టడీ మెటీరియల్స్, ప్రాంతీయ తరగతులు మరియు పరీక్షల వివరాల కొరకు మా అకడమిక్ కౌన్సెలర్లను సంప్రదించండి.'
                  : 'Connect with our academic counsellors regarding admissions, study materials, regional cohorts, and examination schedules.'}
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>{bou.contact_email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>{bou.contact_phone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-amber-600 mt-0.5" />
                  <span>{bou.contact_address}</span>
                </div>
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                {isTelugu ? 'ప్రవేశాల విచారణ పంపండి' : 'Send an Academic Enquiry'}
              </h3>

              {enqSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isTelugu ? 'విచారణ విజయవంతంగా చేరింది!' : 'Enquiry Received!'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {isTelugu ? 'అడ్మిషన్స్ కార్యాలయం త్వరలోనే మీకు సమాధానం ఇస్తుంది.' : 'The Admissions Office will respond to your query shortly.'}
                  </p>
                  <button
                    onClick={() => setEnqSubmitted(false)}
                    className="mt-3 text-xs text-amber-700 font-semibold"
                  >
                    {isTelugu ? 'మరొక ప్రశ్న పంపండి' : 'Send another question'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquiry} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      {isTelugu ? 'మీ పూర్తి పేరు *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={enqName}
                      onChange={e => setEnqName(e.target.value)}
                      placeholder={isTelugu ? 'ఉదా. రమేశ్ కుమార్' : 'e.g. Rachel Thomas'}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {isTelugu ? 'ఈమెయిల్ *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={enqEmail}
                        onChange={e => setEnqEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {isTelugu ? 'ఫోన్ నంబర్' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={enqPhone}
                        onChange={e => setEnqPhone(e.target.value)}
                        placeholder="+91 98765 00000"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      {isTelugu ? 'మీ ప్రశ్న లేదా ఆసక్తి ఉన్న కోర్సు *' : 'Question / Course of Interest *'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={enqMessage}
                      onChange={e => setEnqMessage(e.target.value)}
                      placeholder={isTelugu ? 'కోర్సు ప్రవేశాలు, అర్హతలు లేదా ప్రారంభ తేదీల గురించి అడగండి...' : 'Ask about course eligibility, fees, or start dates...'}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow flex items-center justify-center space-x-1.5"
                  >
                    <span>{isTelugu ? 'విచారణను సమర్పించండి' : 'Submit Academic Enquiry'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
