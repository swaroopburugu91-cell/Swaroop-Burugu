import {
  AppDatabase,
  ChurchInfo,
  Leader,
  Member,
  BibleMessage,
  YouTubeVideo,
  ChurchEvent,
  EventRegistration,
  GalleryAlbum,
  GalleryPhoto,
  Announcement,
  BibleUniversity,
  Course,
  Faculty,
  Student,
  UniversityApplication,
  ContactEnquiry,
  WhatsAppGroup,
  WhatsAppContact,
  WhatsAppMessage,
  MessageHistory,
  Admin
} from '../types';

const STORAGE_KEY = 'christ_world_church_database_v3';

// Initial pre-seeded database with realistic, high-quality Christian church content
export const INITIAL_DATABASE: AppDatabase = {
  admins: [
    {
      id: 'admin-1',
      username: 'admin',
      email: 'admin@christworld.org',
      // Precomputed SHA-256 for 'admin123'
      password_hash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
      name: 'System Administrator',
      role: 'Super Admin',
      last_login: '2026-09-25T08:15:00Z',
      created_at: '2026-01-01T00:00:00Z'
    },
    {
      id: 'admin-2',
      username: 'pastor.office',
      email: 'pastor@christworld.org',
      password_hash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
      name: 'Pastoral Secretariat',
      role: 'Pastor',
      last_login: '2026-09-24T18:30:00Z',
      created_at: '2026-01-05T00:00:00Z'
    }
  ],

  church_info: {
    id: 'church-main',
    name: 'CHRIST WORLD',
    affiliation: 'Affiliated to Bible Open Universes India & International',
    tagline: 'Knowing Christ • Growing in Christ • Sharing Christ',
    welcome_title: 'Welcome to CHRIST WORLD',
    welcome_intro: 'CHRIST WORLD is a Christ-centered, Bible-grounded community dedicated to Knowing Christ deeply through the scriptures, Growing in Christ through transformed lives and fellowship, and Sharing Christ with love, truth, and compassion to our city, India, and the nations. Whether you are seeking spiritual answers, looking for a loving church home, or desiring in-depth theological training, we welcome you with open arms.',
    vision: 'To build a spiritually vibrant, discipleship-oriented global church where every believer is deeply rooted in God\'s Word, transformed by grace, and equipped to impact their generation for the glory of Christ.',
    mission: 'Proclaiming the Gospel of Jesus Christ with clarity, nurturing believers through expository Bible teaching and fervent prayer, fostering authentic Christ-like fellowship, and training servant-leaders through the Bible Open Universes.',
    history: 'Founded as a prayer fellowship with a burden for spiritual revival and deep scriptural literacy, CHRIST WORLD has grown into a flourishing church community and teaching hub. Through consistent ministry, evangelism, youth mentorship, and the establishment of Bible Open Universes, God continues to expand our reach across India and internationally.',
    service_timings: [
      { day: 'Sunday', time: '09:30 AM – 11:45 AM', name: 'Main Worship & Sermon Service' },
      { day: 'Sunday', time: '06:00 PM – 07:30 PM', name: 'Evening Revival & Communion' },
      { day: 'Wednesday', time: '07:00 PM – 08:30 PM', name: 'Midweek Expository Bible Study' },
      { day: 'Friday', time: '10:00 AM – 01:00 PM', name: 'Fasting, Intercession & Healing Prayer' },
      { day: 'Saturday', time: '05:30 PM – 07:00 PM', name: 'Youth & Young Adults Fellowship' }
    ],
    address: 'Plot 42, Grace Avenue, Faith Enclave, Cathedral Road, Hyderabad 500034, India (Sample Address)',
    phone: '+91 98765 43210 (Administrative Office)',
    whatsapp_number: '+91 98765 43210',
    email: 'info@christworld.example.org',
    google_maps_embed: 'https://maps.google.com/maps?q=Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed',
    social_facebook: 'https://facebook.com/christworldchurch',
    social_youtube: 'https://youtube.com',
    social_instagram: 'https://instagram.com/christworldchurch',
    banner_image_url: 'https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=1920&q=80',
    updated_at: '2026-09-25T08:00:00Z'
  },

  leaders: [
    {
      id: 'ldr-1',
      name: 'Rev. Dr. Emmanuel Sundar',
      position: 'Senior Pastor',
      biography: 'Rev. Dr. Emmanuel Sundar has faithfully shepherd the CHRIST WORLD congregation for over two decades. Holding a doctorate in Biblical Hermeneutics, his passion is expository preaching and teaching the uncompromised Word of God with clarity, warmth, and pastoral compassion.',
      ministry_department: 'Senior Pastoral & Pulpit Ministry',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      email: 'pastor.sundar@christworld.org',
      phone: '+91 98765 00001',
      display_order: 1,
      status: 'published',
      created_at: '2026-01-10T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'ldr-2',
      name: 'Pastor Samuel Thomas',
      position: 'Associate Pastor & Bible Teacher',
      biography: 'Pastor Samuel serves as Associate Pastor and Director of Academic Studies at Bible Open Universes. With a heart for systematic discipleship, he mentors emerging teachers and leads the Wednesday Bible exposition.',
      ministry_department: 'Discipleship & Bible Open Universes',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      email: 'samuel.thomas@christworld.org',
      display_order: 2,
      status: 'published',
      created_at: '2026-01-10T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'ldr-3',
      name: 'Sister Rachel Emmanuel',
      position: "Women's Ministry Leader",
      biography: 'Sister Rachel coordinates the women’s fellowship, monthly prayer retreats, and community outreach to families in distress. She is dedicated to training godly women, mothers, and daughters in prayer and practical Christian living.',
      ministry_department: "Grace Women's Fellowship & Intercession",
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      display_order: 3,
      status: 'published',
      created_at: '2026-01-12T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'ldr-4',
      name: 'Brother Joshua Caleb',
      position: 'Youth Leader & Media Coordinator',
      biography: 'Joshua leads the Ignite Youth Ministry and worship media. He focuses on apologetics for university students, creative worship, and mentoring teenagers through modern faith challenges.',
      ministry_department: 'Ignite Youth Ministry',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      display_order: 4,
      status: 'published',
      created_at: '2026-01-15T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'ldr-5',
      name: 'Sister Grace Deborah',
      position: "Children's Ministry Leader",
      biography: 'Leading our Joyful Kids Sunday School for 12 years, Sister Grace ensures children learn Bible foundations, memory verses, hymns, and missionary stories in an engaging, loving atmosphere.',
      ministry_department: "Kingdom Kids Sunday School",
      photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      display_order: 5,
      status: 'published',
      created_at: '2026-01-18T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'ldr-6',
      name: 'Elder David K. Paul',
      position: 'Ministry Elder & Community Outreach Leader',
      biography: 'Elder David guides church benevolence, food distribution programs for needy families, and rural evangelism missions in surrounding villages.',
      ministry_department: 'Missions & Community Service',
      photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      display_order: 6,
      status: 'published',
      created_at: '2026-01-20T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    }
  ],

  members: [
    {
      id: 'mbr-1',
      name: 'Jonathan Paul',
      role_or_ministry: 'Choir Director & Lead Vocalist',
      biography: 'Serving in the worship ministry for 8 years, helping direct the choir and leading congregational praise in Spirit and truth.',
      photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
      private_email: 'jonathan.p@private-domain.test',
      private_phone: '+91 98765 11001',
      private_address: 'Flat 302, Palm View, Hyderabad',
      consent_given: true,
      is_public: true,
      joined_date: '2018-03-15',
      created_at: '2026-01-25T00:00:00Z',
      updated_at: '2026-09-10T00:00:00Z'
    },
    {
      id: 'mbr-2',
      name: 'Esther Rani',
      role_or_ministry: 'Hospitality & Welcome Coordinator',
      biography: 'Passionate about welcoming first-time visitors, organizing fellowship meals, and ensuring everyone feels at home in God\'s house.',
      photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      private_email: 'esther.r@private-domain.test',
      private_phone: '+91 98765 11002',
      consent_given: true,
      is_public: true,
      joined_date: '2020-07-10',
      created_at: '2026-01-25T00:00:00Z',
      updated_at: '2026-09-10T00:00:00Z'
    },
    {
      id: 'mbr-3',
      name: 'Timothy George',
      role_or_ministry: 'Ushering & Logistics Volunteer',
      biography: 'Committed to order and hospitality during worship services, assisting elderly members, and managing event logistics.',
      photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      private_email: 'timothy.g@private-domain.test',
      private_phone: '+91 98765 11003',
      consent_given: true,
      is_public: true,
      joined_date: '2021-02-14',
      created_at: '2026-01-26T00:00:00Z',
      updated_at: '2026-09-10T00:00:00Z'
    },
    {
      id: 'mbr-4',
      name: 'Hannah Priscilla',
      role_or_ministry: 'Sunday School Volunteer Teacher',
      biography: 'Teaching junior primary students God’s Word through creative Bible storytelling, puppet theater, and memory verses.',
      photo_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
      private_email: 'hannah.p@private-domain.test',
      private_phone: '+91 98765 11004',
      consent_given: true,
      is_public: true,
      joined_date: '2022-09-01',
      created_at: '2026-01-26T00:00:00Z',
      updated_at: '2026-09-10T00:00:00Z'
    },
    {
      id: 'mbr-5',
      name: 'Daniel Benjamin',
      role_or_ministry: 'Audio & Live Stream Volunteer',
      biography: 'Overseeing acoustic balancing, camera setups, and live broadcast engineering to reach shut-ins and overseas believers.',
      photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      private_email: 'daniel.b@private-domain.test',
      private_phone: '+91 98765 11005',
      consent_given: true,
      is_public: true,
      joined_date: '2023-01-20',
      created_at: '2026-01-27T00:00:00Z',
      updated_at: '2026-09-10T00:00:00Z'
    },
    {
      id: 'mbr-6',
      name: 'Lydia Mary',
      role_or_ministry: 'Intercessory Prayer Team Member',
      biography: 'Faithful sister in the 24/7 prayer chain praying for the sick, revival in nations, and spiritual protection for families.',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      private_email: 'lydia.m@private-domain.test',
      private_phone: '+91 98765 11006',
      consent_given: true,
      is_public: true,
      joined_date: '2019-11-11',
      created_at: '2026-01-28T00:00:00Z',
      updated_at: '2026-09-10T00:00:00Z'
    }
  ],

  bible_messages: [
    {
      id: 'msg-1',
      title: 'Growing in Christ: The Call to Spiritual Maturity',
      bible_reference: '2 Peter 3:18',
      speaker: 'Rev. Dr. Emmanuel Sundar',
      date: '2026-09-20',
      category: 'Spiritual Growth',
      short_description: 'Discover how abiding in grace and cultivating biblical knowledge prevents believers from drifting into deception and produces enduring spiritual fruit.',
      full_content: `Scripture Reading: 2 Peter 3:18 — "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen."

Introduction:
Spiritual growth is never accidental; it is deliberate, sustained by the Holy Spirit, and anchored in the living Word of God. The Apostle Peter concludes his final epistle with an urgent command: we must keep growing. Stagnation in the Christian life is the prelude to vulnerability.

Key Expositions:
1. The Environment of Grace:
Grace is not merely God’s unmerited favor for salvation; it is God’s empowering presence that teaches us to say 'No' to ungodliness (Titus 2:11-12). To grow in grace means depending less on human self-effort and yielding more to the righteousness of Christ.

2. The Pursuit of Knowledge:
Biblical knowledge is not academic trivia; it is an intimate, relational knowing of Jesus Christ. As we immerse ourselves in scripture, pray without ceasing, and meditate on His attributes, our thoughts are continually renewed.

3. The Sovereign Objective:
"To Him be glory both now and forever!" When Christians grow, God is glorified, families are healed, churches flourish, and the lost are won.

Application & Reflection:
- Evaluate your daily devotional life. Are you feeding your spirit daily with the bread of life?
- Guard your heart against worldly cynicism and doctrinal apathy.
- Make a commitment today to step into biblical discipleship.`,
      scripture_verse_text: 'But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen. — 2 Peter 3:18',
      featured_image_url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80',
      status: 'published',
      views_count: 428,
      created_at: '2026-09-20T10:00:00Z',
      updated_at: '2026-09-20T12:00:00Z'
    },
    {
      id: 'msg-2',
      title: 'The Peace That Transcends All Understanding',
      bible_reference: 'Philippians 4:6-7',
      speaker: 'Pastor Samuel Thomas',
      date: '2026-09-13',
      category: 'Prayer',
      short_description: 'How to trade paralyzing anxiety for the supernatural peace of God through thankful prayer and sincere petition at the throne of grace.',
      full_content: `Scripture Reading: Philippians 4:6-7 — "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."

Message Overview:
Paul penned these words from a Roman prison chain, proving that biblical peace does not depend on calm circumstances, but on a sovereign Savior. When anxiety strikes, prayer is our fortress.

Three Pillars of Divine Peace:
1. Complete Surrender: Give every single worry, whether health, family, or career, into God's hands.
2. Continual Thanksgiving: Gratitude recalibrates our eyes from the magnitude of the problem to the greatness of our God.
3. The Garrison of Peace: The Greek word for 'guard' is a military sentinel. God's peace stands guard over our emotional hearts and rational minds.`,
      scripture_verse_text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. — Philippians 4:6',
      featured_image_url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80',
      status: 'published',
      views_count: 382,
      created_at: '2026-09-13T10:00:00Z',
      updated_at: '2026-09-13T12:00:00Z'
    },
    {
      id: 'msg-3',
      title: 'Living by Faith in Uncertain Times',
      bible_reference: 'Hebrews 11:1-6',
      speaker: 'Rev. Dr. Emmanuel Sundar',
      date: '2026-09-06',
      category: 'Faith',
      short_description: 'An in-depth study on biblical faith: the substance of things hoped for, the evidence of things not seen, and how faith pleases Almighty God.',
      full_content: `Scripture Reading: Hebrews 11:1 — "Now faith is confidence in what we hope for and assurance about what we do not see."

Faith is not blind optimism or wishful thinking; it is total reliance upon the trustworthy character and infallible promises of God. Walk through the hall of faith with Abraham, Moses, and Rahab to see how genuine faith acts in obedience even when the destination is not yet visible.`,
      scripture_verse_text: 'And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him. — Hebrews 11:6',
      featured_image_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1000&q=80',
      status: 'published',
      views_count: 512,
      created_at: '2026-09-06T10:00:00Z',
      updated_at: '2026-09-06T12:00:00Z'
    },
    {
      id: 'msg-4',
      title: 'Clothed in Compassion: Building a Christ-Centered Family',
      bible_reference: 'Colossians 3:12-17',
      speaker: 'Sister Rachel Emmanuel',
      date: '2026-08-30',
      category: 'Family',
      short_description: 'Practical biblical guidance on forgiveness, tenderhearted mercy, patience, and love as the bond of perfection within Christian marriages and homes.',
      full_content: `Colossians 3 provides the divine wardrobe for every household. Put on tender mercies, kindness, humility, meekness, and longsuffering. Forgive as Christ forgave you. Let the Word of Christ dwell in you richly.`,
      scripture_verse_text: 'Therefore, as God’s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience. — Colossians 3:12',
      featured_image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80',
      status: 'published',
      views_count: 295,
      created_at: '2026-08-30T10:00:00Z',
      updated_at: '2026-08-30T12:00:00Z'
    },
    {
      id: 'msg-5',
      title: 'Ignited for Purpose: The Daniel Generation',
      bible_reference: 'Daniel 1:8',
      speaker: 'Brother Joshua Caleb',
      date: '2026-08-23',
      category: 'Youth',
      short_description: 'Encouraging youth and young professionals to stand firm in holy conviction without compromise amid secular peer pressures.',
      full_content: `Daniel resolved in his heart that he would not defile himself with the royal food and wine. In an age of shifting moral relativism, young Christians are called to shine as lights with academic excellence, unshakeable integrity, and unwavering devotion to Jesus.`,
      scripture_verse_text: 'But Daniel resolved not to defile himself with the royal food and wine, and he asked the chief official for permission not to defile himself this way. — Daniel 1:8',
      featured_image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
      status: 'published',
      views_count: 341,
      created_at: '2026-08-23T10:00:00Z',
      updated_at: '2026-08-23T12:00:00Z'
    },
    {
      id: 'msg-6',
      title: 'The Good Shepherd and the Valley of Shadows',
      bible_reference: 'Psalm 23:1-6',
      speaker: 'Elder David K. Paul',
      date: '2026-08-16',
      category: 'Old Testament',
      short_description: 'An exposition of the 23rd Psalm: how God’s rod and staff provide comfort, restoration, guidance, and an overflowing cup of joy.',
      full_content: `Even though I walk through the darkest valley, I will fear no evil, for You are with me. David recounts the constant tenderness and unwavering defense of the Lord as our Shepherd.`,
      scripture_verse_text: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. — Psalm 23:1-3',
      featured_image_url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80',
      status: 'published',
      views_count: 467,
      created_at: '2026-08-16T10:00:00Z',
      updated_at: '2026-08-16T12:00:00Z'
    }
  ],

  youtube_videos: [
    {
      id: 'yt-1',
      title: 'Grow in Grace and Knowledge | Sunday Expository Sermon',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtube_video_id: 'dQw4w9WgXcQ',
      bible_reference: '2 Peter 3:18',
      speaker: 'Rev. Dr. Emmanuel Sundar',
      date: '2026-09-20',
      description: 'Watch the full video message on cultivating deep spiritual maturity through grace, sound doctrine, and daily obedience.',
      thumbnail_url: 'https://images.unsplash.com/photo-1510519138161-58474ebf8496?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      status: 'published',
      created_at: '2026-09-20T12:00:00Z',
      updated_at: '2026-09-20T12:00:00Z'
    },
    {
      id: 'yt-2',
      title: 'Overcoming Fear with the Peace of God',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtube_video_id: 'dQw4w9WgXcQ',
      bible_reference: 'Philippians 4:6-7',
      speaker: 'Pastor Samuel Thomas',
      date: '2026-09-13',
      description: 'A powerful midweek Bible teaching on dealing with anxiety, emotional fatigue, and rediscovering God’s quiet resting place.',
      thumbnail_url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      status: 'published',
      created_at: '2026-09-13T12:00:00Z',
      updated_at: '2026-09-13T12:00:00Z'
    },
    {
      id: 'yt-3',
      title: 'The Great Commission and the Modern Believer',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtube_video_id: 'dQw4w9WgXcQ',
      bible_reference: 'Matthew 28:18-20',
      speaker: 'Rev. Dr. Emmanuel Sundar',
      date: '2026-09-06',
      description: 'Understanding our corporate and individual mandate to share Christ with love, truth, and conviction.',
      thumbnail_url: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      status: 'published',
      created_at: '2026-09-06T12:00:00Z',
      updated_at: '2026-09-06T12:00:00Z'
    },
    {
      id: 'yt-4',
      title: 'Worship Night: In Spirit and in Truth',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtube_video_id: 'dQw4w9WgXcQ',
      bible_reference: 'John 4:23-24',
      speaker: 'Ignite Worship Team & Joshua Caleb',
      date: '2026-08-28',
      description: 'An evening of acoustic praise, thanksgiving, and heartfelt worship live from the CHRIST WORLD sanctuary.',
      thumbnail_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      status: 'published',
      created_at: '2026-08-28T12:00:00Z',
      updated_at: '2026-08-28T12:00:00Z'
    }
  ],

  events: [
    {
      id: 'evt-1',
      title: 'Annual Faith & Scripture Conference 2026',
      date: '2026-10-15',
      time: '09:00 AM – 04:30 PM (IST)',
      location: 'CHRIST WORLD Main Auditorium & Live Stream',
      description: 'Join us for three impactful sessions with guest theologians and pastors. Theme: "Rooted & Built Up in Him". Free lunch provided for in-person attendees.',
      image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      category: 'Conference',
      registration_required: true,
      contact_info: 'Office Desk: +91 98765 43210',
      status: 'published',
      created_at: '2026-09-01T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'evt-2',
      title: 'Ignite Youth Camp: "Fire Within"',
      date: '2026-10-24',
      time: '08:00 AM – 06:00 PM (IST)',
      location: 'Camp Shalom Retreat Grounds, Outskirts',
      description: 'A dedicated one-day retreat for teenagers, college students, and young professionals. Featuring dynamic worship, apologetics Q&A, sports, and life-changing prayer.',
      image_url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
      category: 'Youth Meet',
      registration_required: true,
      contact_info: 'Joshua Caleb: +91 98765 00004',
      status: 'published',
      created_at: '2026-09-02T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'evt-3',
      title: 'All-Night Intercession & Revival Prayer',
      date: '2026-10-30',
      time: '09:30 PM – 05:00 AM (IST)',
      location: 'CHRIST WORLD Prayer Chapel',
      description: 'Standing in the gap for our families, the sick, national leadership, church ministries, and the unreached global harvest.',
      image_url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
      category: 'Prayer Night',
      registration_required: false,
      contact_info: 'Sister Rachel Emmanuel: +91 98765 00003',
      status: 'published',
      created_at: '2026-09-05T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'evt-4',
      title: 'Community Health Camp & Compassion Drive',
      date: '2026-11-08',
      time: '10:00 AM – 03:00 PM (IST)',
      location: 'Community Center Grounds, Hyderabad',
      description: 'Free general health checkups, eye testing, medicines distribution, and ration kits for underprivileged families in our neighborhood.',
      image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
      category: 'Community Outreach',
      registration_required: false,
      contact_info: 'Elder David K. Paul: +91 98765 00006',
      status: 'published',
      created_at: '2026-09-07T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'evt-5',
      title: 'Resurrection Sunday & Family Thanksgiving Service',
      date: '2026-04-05',
      time: '06:00 AM – 08:30 AM (IST)',
      location: 'CHRIST WORLD Sanctuary & Garden Lawn',
      description: 'Celebrating the victorious resurrection of our Lord Jesus Christ with sunrise worship, baptism service, and fellowship breakfast.',
      image_url: 'https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=800&q=80',
      category: 'Worship Service',
      registration_required: false,
      contact_info: 'Church Office: +91 98765 43210',
      status: 'published',
      created_at: '2026-03-01T00:00:00Z',
      updated_at: '2026-04-06T00:00:00Z'
    }
  ],

  event_registrations: [
    {
      id: 'reg-1',
      event_id: 'evt-1',
      event_title: 'Annual Faith & Scripture Conference 2026',
      full_name: 'Abraham Lincoln Kumar',
      email: 'abraham.lk@samplemail.com',
      phone: '+91 98111 22233',
      attendees_count: 2,
      notes: 'Coming with my spouse for both sessions.',
      registered_at: '2026-09-21T14:30:00Z'
    }
  ],

  gallery_albums: [
    {
      id: 'alb-1',
      title: 'Sunday Worship & Word Expositions',
      description: 'Heartfelt moments of praise, choir worship, and congregation prayer in the presence of God.',
      category: 'Church Services',
      cover_image_url: 'https://images.unsplash.com/photo-1510519138161-58474ebf8496?auto=format&fit=crop&w=800&q=80',
      event_date: '2026-09-20',
      created_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'alb-2',
      title: 'Ignite Youth Fellowship & Acoustic Nights',
      description: 'Young people growing together in fellowship, discipleship, and Christ-exalting praise.',
      category: 'Youth',
      cover_image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      event_date: '2026-09-12',
      created_at: '2026-09-15T00:00:00Z'
    },
    {
      id: 'alb-3',
      title: 'Bible Open Universes Convocation & Lectures',
      description: 'Equipping students with deep theological knowledge and practical leadership skills.',
      category: 'Bible Open Universes',
      cover_image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      event_date: '2026-08-15',
      created_at: '2026-08-20T00:00:00Z'
    },
    {
      id: 'alb-4',
      title: 'Kingdom Kids Sunday School Festival',
      description: 'Our precious children learning Bible memory verses, drama, and joyful choruses.',
      category: "Children's Ministry",
      cover_image_url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80',
      event_date: '2026-08-01',
      created_at: '2026-08-05T00:00:00Z'
    },
    {
      id: 'alb-5',
      title: 'Community Relief & Love-in-Action Drive',
      description: 'Delivering groceries, stationery, and medicines to underprivileged families.',
      category: 'Community Activities',
      cover_image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
      event_date: '2026-07-20',
      created_at: '2026-07-25T00:00:00Z'
    }
  ],

  gallery_photos: [
    {
      id: 'pho-1',
      album_id: 'alb-1',
      title: 'Congregational Worship Service',
      caption: 'The church gathered in praise and thanksgiving during Sunday service.',
      photo_url: 'https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=1200&q=80',
      category: 'Church Services',
      date: '2026-09-20',
      created_at: '2026-09-20T10:00:00Z'
    },
    {
      id: 'pho-2',
      album_id: 'alb-1',
      title: 'Pulpit Exposition of God’s Word',
      caption: 'Pastor preaching through the Book of Colossians with scriptural precision.',
      photo_url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
      category: 'Church Services',
      date: '2026-09-20',
      created_at: '2026-09-20T10:00:00Z'
    },
    {
      id: 'pho-3',
      album_id: 'alb-2',
      title: 'Ignite Youth Discipleship Circle',
      caption: 'Students discussing biblical worldview and living with purity on campus.',
      photo_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      category: 'Youth',
      date: '2026-09-12',
      created_at: '2026-09-15T10:00:00Z'
    },
    {
      id: 'pho-4',
      album_id: 'alb-3',
      title: 'Bible Open Universes Seminar',
      caption: 'Cohort studying biblical Greek and church history modules.',
      photo_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      category: 'Bible Open Universes',
      date: '2026-08-15',
      created_at: '2026-08-20T10:00:00Z'
    },
    {
      id: 'pho-5',
      album_id: 'alb-4',
      title: 'Joyful Kingdom Kids Crafts',
      caption: 'Children crafting Noah’s Ark models during Bible memory week.',
      photo_url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1200&q=80',
      category: "Children's Ministry",
      date: '2026-08-01',
      created_at: '2026-08-05T10:00:00Z'
    },
    {
      id: 'pho-6',
      album_id: 'alb-5',
      title: 'Compassion Food Distribution',
      caption: 'Volunteers preparing food packets and winter blankets for the needy.',
      photo_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
      category: 'Community Activities',
      date: '2026-07-20',
      created_at: '2026-07-25T10:00:00Z'
    }
  ],

  announcements: [
    {
      id: 'ann-1',
      title: 'Admissions Open: Bible Open Universes Academic Year 2026-27',
      date: '2026-09-22',
      description: 'Applications are now open for the Certificate, Diploma, and Bachelor in Biblical Studies programs. Online distance learning cohorts are available for international and working professionals. Early application deadline: October 31, 2026.',
      is_important: true,
      category: 'University',
      status: 'published',
      created_at: '2026-09-22T08:00:00Z',
      updated_at: '2026-09-22T08:00:00Z'
    },
    {
      id: 'ann-2',
      title: 'Special 3-Day Fasting and Prayer Assembly',
      date: '2026-09-28',
      description: 'Beginning this Friday morning through Sunday evening. We will unite in prayer for spiritual awakening, families, church expansion, and our mission partners.',
      is_important: true,
      category: 'Worship',
      status: 'published',
      created_at: '2026-09-20T08:00:00Z',
      updated_at: '2026-09-20T08:00:00Z'
    },
    {
      id: 'ann-3',
      title: 'Sunday School Teachers Training Workshop',
      date: '2026-10-05',
      description: 'All current Sunday school teachers and volunteers interested in children\'s ministry are requested to attend the practical pedagogy workshop on Saturday 3 PM at the Fellowship Hall.',
      is_important: false,
      category: 'General',
      status: 'published',
      created_at: '2026-09-18T08:00:00Z',
      updated_at: '2026-09-18T08:00:00Z'
    }
  ],

  bible_university: {
    id: 'bou-main',
    title: 'Bible Open Universes',
    subtitle: 'Bible Education for India and the International Community',
    about_text: 'Bible Open Universes (BOU) is the academic and theological training division of CHRIST WORLD. Established to democratize biblical education, BOU equips pastors, evangelists, church workers, missionaries, and lay believers with deep scripture knowledge, sound hermeneutics, and effective leadership tools. Our curriculum blends rigid biblical fidelity with practical ministry application.',
    india_training_info: 'Across India, Bible Open Universes conducts distance learning correspondence courses, modular weekend classes, and regional vernacular seminars. Programs are tailored to equip grassroots workers, church planters in rural and urban centers, and passionate disciples balancing careers with ministry training. Study materials are available in English and regional languages.',
    international_training_info: 'For our international students across North America, the Middle East, Africa, Europe, and Asia-Pacific, BOU provides flexible digital learning platforms, live interactive seminars, and mentored theological research. Our global cohorts foster rich cross-cultural insights and collaborative missional vision.',
    training_programs_overview: 'Our training programs emphasize five core pillars: (1) In-depth Biblical Exegesis & Theology, (2) Systematic Hermeneutics & Homiletics, (3) Practical Pastoral Care & Counseling, (4) Evangelism & Church Planting Strategies, and (5) Christ-like Character & Spiritual Formation.',
    admissions_guidelines: 'Admissions are open to all born-again believers with a demonstrable commitment to Christ and local church involvement. Applications are reviewed on a rolling basis with spring and autumn intakes.',
    eligibility_requirements: '• Certificate Track: Minimum high school completion or pastoral recommendation.\n• Diploma Track: 10+2 / Pre-University diploma.\n• Bachelor Track: High school completion + letter of recommendation from local church pastor.\n• Master Track: Recognised undergraduate degree with foundational Bible background.',
    important_dates: '• Autumn Intake Application Deadline: October 31, 2026\n• Orientation & Online Platform Induction: November 10, 2026\n• Semester Classes Commence: November 16, 2026',
    contact_email: 'bou.admissions@christworld.org',
    contact_phone: '+91 98765 43211 / +91 98765 43212',
    contact_address: 'Bible Open Universes Dean Office, CHRIST WORLD Campus, Faith Enclave, Hyderabad, India (Sample Address)',
    disclaimer: 'Academic Notice: Information regarding Bible Open Universes programs, courses, faculty, and schedules provided on this platform is sample and placeholder data curated for final-year engineering college project demonstrations. Official certifications, degree affiliations, and verified admissions are subject to administrative ratification.',
    updated_at: '2026-09-25T08:00:00Z'
  },

  courses: [
    {
      id: 'crs-1',
      course_name: 'Certificate in Biblical Foundations',
      code: 'BOU-CBF101',
      duration: '6 Months',
      level: 'Certificate',
      description: 'A comprehensive foundational course covering the Old and New Testament survey, key doctrines of grace, Christian apologetics, and essential spiritual disciplines.',
      eligibility: 'Open to all believers; recommendation from local pastor preferred.',
      mode_of_study: 'Online / Distance Learning',
      certificate_information: 'Upon successful completion of 6 modules and practical reflection essays, students receive the Certificate in Biblical Foundations.',
      modules_count: 6,
      featured_image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      created_at: '2026-01-10T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'crs-2',
      course_name: 'Diploma in Ministry & Hermeneutics',
      code: 'BOU-DMH201',
      duration: '1 Year',
      level: 'Diploma',
      description: 'Advanced study of biblical interpretation rules, sermon preparation (homiletics), church history, pastoral leadership, and evangelism methodologies.',
      eligibility: 'High School completion (10+2) or equivalent with basic Bible knowledge.',
      mode_of_study: 'Hybrid Weekend',
      certificate_information: 'Includes formal Diploma in Ministry award and participation in annual convocation.',
      modules_count: 12,
      featured_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      created_at: '2026-01-10T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'crs-3',
      course_name: 'Bachelor in Biblical Studies (B.B.S.)',
      code: 'BOU-BBS301',
      duration: '3 Years',
      level: 'Bachelor in Biblical Studies',
      description: 'Rigorous 3-year theological program preparing full-time ministers, missionaries, and educators. Covers Greek/Hebrew introductory syntax, systematic theology, missions, and pastoral counseling.',
      eligibility: 'Pre-University / 12th Standard pass with strong pastoral recommendation.',
      mode_of_study: 'Online / Distance Learning',
      certificate_information: 'Conferred upon completion of 36 coursework credits and a supervised ministry dissertation.',
      modules_count: 36,
      featured_image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      created_at: '2026-01-15T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'crs-4',
      course_name: 'Master of Ministry & Pastoral Leadership (M.Min.)',
      code: 'BOU-MML401',
      duration: '2 Years',
      level: 'Master of Ministry',
      description: 'Postgraduate program designed for senior pastors, organizational leaders, and teachers seeking advanced theological reflection and executive ministry governance.',
      eligibility: 'Bachelor’s degree from a recognized institution with at least 2 years in ministry leadership.',
      mode_of_study: 'Online / Distance Learning',
      certificate_information: 'Master of Ministry degree transcript and parchment upon thesis approval.',
      modules_count: 24,
      featured_image: 'https://images.unsplash.com/photo-1510519138161-58474ebf8496?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      created_at: '2026-01-20T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'crs-5',
      course_name: 'Youth Leadership & Urban Discipleship Track',
      code: 'BOU-YLT105',
      duration: '3 Months Intensive',
      level: 'Leadership Track',
      description: 'Specialized certificate track empowering youth coordinators with contemporary apologetics, mental health awareness, creative media, and discipleship models.',
      eligibility: 'Active youth leaders or young adults recommended by their pastor.',
      mode_of_study: 'Online / Distance Learning',
      certificate_information: 'Certificate of Competence in Youth Ministry Leadership.',
      modules_count: 4,
      featured_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      created_at: '2026-02-01T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z'
    }
  ],

  faculty: [
    {
      id: 'fac-1',
      name: 'Rev. Dr. Emmanuel Sundar, Ph.D.',
      designation: 'Dean of Biblical Studies & Systematic Theology',
      qualification: 'Th.D. in New Testament Exegesis, M.Div., B.Sc.',
      subjects_taught: 'Pauline Epistles, Systematic Theology, Hermeneutics',
      biography: 'Over 25 years of pastoral ministry and academic instruction in biblical theology across India and international seminaries.',
      photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      display_order: 1,
      created_at: '2026-01-10T00:00:00Z'
    },
    {
      id: 'fac-2',
      name: 'Prof. Samuel Thomas, M.Th.',
      designation: 'Director of Distance Learning & Hermeneutics',
      qualification: 'M.Th. in Biblical Studies, B.D.',
      subjects_taught: 'Old Testament Survey, Principles of Bible Translation, Homiletics',
      biography: 'Scholar in Hebrew poetry and expository preaching with a passion for vernacular theological resources.',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      display_order: 2,
      created_at: '2026-01-10T00:00:00Z'
    },
    {
      id: 'fac-3',
      name: 'Dr. Rebecca Mathews, Ph.D.',
      designation: 'Professor of Pastoral Counseling & Family Life',
      qualification: 'Ph.D. in Christian Counseling, M.Sc. Psychology',
      subjects_taught: 'Biblical Pastoral Counseling, Family Dynamics, Crisis Ministry',
      biography: 'Specializes in training church leaders in compassionate Christian counseling and adolescent mentorship.',
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      display_order: 3,
      created_at: '2026-01-15T00:00:00Z'
    },
    {
      id: 'fac-4',
      name: 'Rev. Joshua David, M.Div.',
      designation: 'Lecturer in Missions & Church Planting',
      qualification: 'M.Div., B.Tech',
      subjects_taught: 'Cross-Cultural Missions, Evangelism Strategies, Contemporary Apologetics',
      biography: 'Former software engineer turned missionary trainer, inspiring youth to take the gospel into emerging frontiers.',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      display_order: 4,
      created_at: '2026-01-20T00:00:00Z'
    }
  ],

  students: [
    {
      id: 'stu-1',
      name: 'Pastor Peter Cherian',
      enrolled_course_id: 'crs-3',
      enrolled_course_name: 'Bachelor in Biblical Studies',
      country: 'India (Kerala)',
      testimonial: 'Bible Open Universes has transformed my pulpit ministry. The hermeneutics course helped me unpack the scriptures with clarity and theological depth for my rural flock.',
      graduation_year: 'Class of 2025',
      photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
      is_featured: true,
      created_at: '2026-02-01T00:00:00Z'
    },
    {
      id: 'stu-2',
      name: 'Grace Kimberly',
      enrolled_course_id: 'crs-1',
      enrolled_course_name: 'Certificate in Biblical Foundations',
      country: 'United Kingdom (London)',
      testimonial: 'The distance learning portal allowed me to study while working full-time in healthcare. The faculty feedback on every assignment was thorough and encouraging.',
      graduation_year: 'Class of 2026',
      photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      is_featured: true,
      created_at: '2026-02-05T00:00:00Z'
    },
    {
      id: 'stu-3',
      name: 'David Muthu',
      enrolled_course_id: 'crs-2',
      enrolled_course_name: 'Diploma in Ministry & Hermeneutics',
      country: 'Malaysia (Kuala Lumpur)',
      testimonial: 'I gained profound insights into church history and practical leadership that I now implement in our local fellowship discipleship groups.',
      graduation_year: 'Class of 2026',
      photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      is_featured: true,
      created_at: '2026-02-10T00:00:00Z'
    }
  ],

  university_applications: [
    {
      id: 'app-1',
      course_id: 'crs-1',
      course_name: 'Certificate in Biblical Foundations',
      applicant_name: 'Mathew George',
      email: 'mathew.g@samplemail.com',
      phone: '+91 98765 22001',
      country: 'India',
      city: 'Bangalore',
      highest_qualification: 'Bachelor of Commerce',
      statement_of_faith: 'I accepted Christ in 2020 and desire to serve in church discipleship with sound biblical grounding.',
      status: 'Reviewing',
      applied_at: '2026-09-21T11:00:00Z'
    }
  ],

  contacts: [
    {
      id: 'cnt-1',
      name: 'Alexander V.',
      email: 'alexander.v@samplemail.com',
      phone: '+91 98450 12345',
      subject: 'Inquiry regarding Sunday service timings & visitor parking',
      message: 'Greetings in Christ! My family recently moved to the area and we are looking forward to joining this Sunday\'s 9:30 AM worship. Are there visitor parking facilities available?',
      status: 'read',
      created_at: '2026-09-22T09:15:00Z'
    },
    {
      id: 'cnt-2',
      name: 'Priya Sharma',
      email: 'priya.s@samplemail.com',
      phone: '+91 98123 45678',
      subject: 'Prayer request for healing and peace',
      message: 'Kindly remember my mother Mrs. Sarojini in your Friday fasting prayer meeting for healing from chronic arthritis. Thank you.',
      status: 'unread',
      created_at: '2026-09-24T16:20:00Z'
    }
  ],

  whatsapp_groups: [
    {
      id: 'wag-1',
      name: 'Church Congregation (Opted-in)',
      description: 'Official announcements, Sunday bulletins, and major church updates for subscribed members.',
      color_code: '#25D366',
      created_at: '2026-01-01T00:00:00Z'
    },
    {
      id: 'wag-2',
      name: 'Prayer Warriors 24/7 Intercession',
      description: 'Urgent prayer requests, daily prayer points, and fasting meeting alerts.',
      color_code: '#3B82F6',
      created_at: '2026-01-05T00:00:00Z'
    },
    {
      id: 'wag-3',
      name: 'Ignite Youth Fellowship',
      description: 'Camp announcements, weekly youth fellowship reminders, and college discipleship updates.',
      color_code: '#F59E0B',
      created_at: '2026-01-10T00:00:00Z'
    },
    {
      id: 'wag-4',
      name: 'Bible Open Universes Students',
      description: 'Academic alerts, course assignment deadlines, lecture links, and convocation updates.',
      color_code: '#8B5CF6',
      created_at: '2026-01-15T00:00:00Z'
    }
  ],

  whatsapp_contacts: [
    {
      id: 'wac-1',
      name: 'Jonathan Paul',
      phone: '+919876511001',
      group_ids: ['wag-1', 'wag-2'],
      consent_given: true,
      consent_timestamp: '2026-01-15T10:00:00Z',
      consent_source: 'Church Registration',
      notes: 'Active choir member and verified opt-in.',
      status: 'Active',
      created_at: '2026-01-15T10:00:00Z'
    },
    {
      id: 'wac-2',
      name: 'Esther Rani',
      phone: '+919876511002',
      group_ids: ['wag-1', 'wag-2'],
      consent_given: true,
      consent_timestamp: '2026-01-18T10:00:00Z',
      consent_source: 'Church Registration',
      notes: 'Hospitality coordinator, opted-in.',
      status: 'Active',
      created_at: '2026-01-18T10:00:00Z'
    },
    {
      id: 'wac-3',
      name: 'Timothy George',
      phone: '+919876511003',
      group_ids: ['wag-1'],
      consent_given: true,
      consent_timestamp: '2026-02-01T10:00:00Z',
      consent_source: 'Visitor Card',
      notes: 'Opted in via Sunday visitor card.',
      status: 'Active',
      created_at: '2026-02-01T10:00:00Z'
    },
    {
      id: 'wac-4',
      name: 'Mathew George',
      phone: '+919876522001',
      group_ids: ['wag-4'],
      consent_given: true,
      consent_timestamp: '2026-09-21T11:00:00Z',
      consent_source: 'Bible University Form',
      notes: 'BOU applicant requesting WhatsApp admissions updates.',
      status: 'Active',
      created_at: '2026-09-21T11:00:00Z'
    },
    {
      id: 'wac-5',
      name: 'Joshua Caleb',
      phone: '+919876500004',
      group_ids: ['wag-1', 'wag-3'],
      consent_given: true,
      consent_timestamp: '2026-01-10T10:00:00Z',
      consent_source: 'Direct Admin Opt-In',
      notes: 'Youth coordinator.',
      status: 'Active',
      created_at: '2026-01-10T10:00:00Z'
    }
  ],

  whatsapp_messages: [
    {
      id: 'wam-1',
      campaign_title: 'Sunday Worship Service & Communion Reminder',
      target_group_id: 'wag-1',
      message_template: 'Greetings in Christ {{name}}! Reminder: CHRIST WORLD worship service begins this Sunday at 09:30 AM followed by holy communion. Theme: "Growing in Christ". Bring your family and friends. Location: Faith Enclave. God bless you!',
      sent_at: '2026-09-19T18:00:00Z',
      total_recipients: 3,
      status: 'Sent',
      created_at: '2026-09-19T17:45:00Z'
    },
    {
      id: 'wam-2',
      campaign_title: 'Bible Open Universes Admissions Alert',
      target_group_id: 'wag-4',
      message_template: 'Dear {{name}}, greetings from Bible Open Universes! Admissions are currently active for Certificate & Diploma courses in Biblical Studies. Download your prospectus or check your portal. Contact: +91 98765 43211.',
      sent_at: '2026-09-22T10:00:00Z',
      total_recipients: 1,
      status: 'Sent',
      created_at: '2026-09-22T09:30:00Z'
    }
  ],

  message_history: [
    {
      id: 'mh-1',
      whatsapp_message_id: 'wam-1',
      contact_id: 'wac-1',
      contact_name: 'Jonathan Paul',
      phone: '+919876511001',
      personalized_content: 'Greetings in Christ Jonathan Paul! Reminder: CHRIST WORLD worship service begins this Sunday at 09:30 AM followed by holy communion. Theme: "Growing in Christ". Bring your family and friends. Location: Faith Enclave. God bless you!',
      status: 'Read',
      provider_message_id: 'wamid.HBgLOTE5ODc2NTExMDAxFQIAERgSQjBFMDNDNzk1MUYwMUQxODAzAA==',
      timestamp: '2026-09-19T18:00:02Z'
    },
    {
      id: 'mh-2',
      whatsapp_message_id: 'wam-1',
      contact_id: 'wac-2',
      contact_name: 'Esther Rani',
      phone: '+919876511002',
      personalized_content: 'Greetings in Christ Esther Rani! Reminder: CHRIST WORLD worship service begins this Sunday at 09:30 AM followed by holy communion. Theme: "Growing in Christ". Bring your family and friends. Location: Faith Enclave. God bless you!',
      status: 'Delivered',
      provider_message_id: 'wamid.HBgLOTE5ODc2NTExMDAyFQIAERgSQjBFMDNDNzk1MUYwMUQxODAzAA==',
      timestamp: '2026-09-19T18:00:03Z'
    },
    {
      id: 'mh-3',
      whatsapp_message_id: 'wam-1',
      contact_id: 'wac-3',
      contact_name: 'Timothy George',
      phone: '+919876511003',
      personalized_content: 'Greetings in Christ Timothy George! Reminder: CHRIST WORLD worship service begins this Sunday at 09:30 AM followed by holy communion. Theme: "Growing in Christ". Bring your family and friends. Location: Faith Enclave. God bless you!',
      status: 'Delivered',
      provider_message_id: 'wamid.HBgLOTE5ODc2NTExMDAzFQIAERgSQjBFMDNDNzk1MUYwMUQxODAzAA==',
      timestamp: '2026-09-19T18:00:04Z'
    }
  ]
};

// Database Service Class with full relational CRUD, event listeners, and SQL parser
class DatabaseService {
  private db: AppDatabase;
  private listeners: (() => void)[] = [];

  constructor() {
    this.db = this.loadDatabase();
  }

  private loadDatabase(): AppDatabase {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with initial database schema to ensure all tables exist even if added later
        return {
          ...INITIAL_DATABASE,
          ...parsed,
          church_info: { ...INITIAL_DATABASE.church_info, ...(parsed.church_info || {}) },
          bible_university: { ...INITIAL_DATABASE.bible_university, ...(parsed.bible_university || {}) }
        };
      }
    } catch (e) {
      console.error('Error loading database from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATABASE));
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
      this.notify();
    } catch (e) {
      console.error('Error persisting database:', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(cb => {
      try {
        cb();
      } catch (e) {
        console.error('Error in database listener:', e);
      }
    });
  }

  public getSnapshot(): AppDatabase {
    return this.db;
  }

  public resetToSeed(): void {
    this.db = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    this.persist();
  }

  // --- Church Info ---
  public updateChurchInfo(info: Partial<ChurchInfo>): ChurchInfo {
    this.db.church_info = {
      ...this.db.church_info,
      ...info,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.church_info;
  }

  // --- Generic Content Helpers ---
  public togglePublishStatus(
    table: 'leaders' | 'bible_messages' | 'youtube_videos' | 'events' | 'announcements' | 'courses',
    id: string
  ): void {
    const list = this.db[table] as any[];
    const item = list.find(i => i.id === id);
    if (item) {
      item.status = item.status === 'published' ? 'draft' : 'published';
      item.updated_at = new Date().toISOString();
      this.persist();
    }
  }

  // --- Leaders CRUD ---
  public addLeader(leader: Omit<Leader, 'id' | 'created_at' | 'updated_at'>): Leader {
    const newLeader: Leader = {
      ...leader,
      id: `ldr-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.leaders.push(newLeader);
    this.persist();
    return newLeader;
  }

  public updateLeader(id: string, updates: Partial<Leader>): Leader | null {
    const index = this.db.leaders.findIndex(l => l.id === id);
    if (index === -1) return null;
    this.db.leaders[index] = {
      ...this.db.leaders[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.leaders[index];
  }

  public deleteLeader(id: string): boolean {
    const prevLen = this.db.leaders.length;
    this.db.leaders = this.db.leaders.filter(l => l.id !== id);
    if (this.db.leaders.length !== prevLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Members CRUD (With Security Safeguard for Public/Private) ---
  public addMember(member: Omit<Member, 'id' | 'created_at' | 'updated_at'>): Member {
    const newMember: Member = {
      ...member,
      id: `mbr-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.members.push(newMember);
    this.persist();
    return newMember;
  }

  public updateMember(id: string, updates: Partial<Member>): Member | null {
    const index = this.db.members.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.db.members[index] = {
      ...this.db.members[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.members[index];
  }

  public deleteMember(id: string): boolean {
    const prevLen = this.db.members.length;
    this.db.members = this.db.members.filter(m => m.id !== id);
    if (this.db.members.length !== prevLen) {
      this.persist();
      return true;
    }
    return false;
  }

  /**
   * Returns publicly safe member cards. Private phone, email, and address are stripped
   * and items with is_public === false are filtered out according to privacy requirements.
   */
  public getPublicMembers(): Omit<Member, 'private_email' | 'private_phone' | 'private_address'>[] {
    return this.db.members
      .filter(m => m.is_public && m.consent_given)
      .map(({ private_email, private_phone, private_address, ...safe }) => safe);
  }

  // --- Bible Messages CRUD ---
  public addBibleMessage(msg: Omit<BibleMessage, 'id' | 'views_count' | 'created_at' | 'updated_at'>): BibleMessage {
    const newMsg: BibleMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.bible_messages.unshift(newMsg);
    this.persist();
    return newMsg;
  }

  public updateBibleMessage(id: string, updates: Partial<BibleMessage>): BibleMessage | null {
    const index = this.db.bible_messages.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.db.bible_messages[index] = {
      ...this.db.bible_messages[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.bible_messages[index];
  }

  public deleteBibleMessage(id: string): boolean {
    const prev = this.db.bible_messages.length;
    this.db.bible_messages = this.db.bible_messages.filter(m => m.id !== id);
    if (this.db.bible_messages.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  public incrementMessageViews(id: string): void {
    const msg = this.db.bible_messages.find(m => m.id === id);
    if (msg) {
      msg.views_count += 1;
      this.persist();
    }
  }

  // --- YouTube Videos CRUD ---
  public addYouTubeVideo(video: Omit<YouTubeVideo, 'id' | 'created_at' | 'updated_at'>): YouTubeVideo {
    const newVideo: YouTubeVideo = {
      ...video,
      id: `yt-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.youtube_videos.unshift(newVideo);
    this.persist();
    return newVideo;
  }

  public updateYouTubeVideo(id: string, updates: Partial<YouTubeVideo>): YouTubeVideo | null {
    const index = this.db.youtube_videos.findIndex(v => v.id === id);
    if (index === -1) return null;
    this.db.youtube_videos[index] = {
      ...this.db.youtube_videos[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.youtube_videos[index];
  }

  public deleteYouTubeVideo(id: string): boolean {
    const prev = this.db.youtube_videos.length;
    this.db.youtube_videos = this.db.youtube_videos.filter(v => v.id !== id);
    if (this.db.youtube_videos.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Events CRUD & RSVP ---
  public addEvent(evt: Omit<ChurchEvent, 'id' | 'created_at' | 'updated_at'>): ChurchEvent {
    const newEvent: ChurchEvent = {
      ...evt,
      id: `evt-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.events.unshift(newEvent);
    this.persist();
    return newEvent;
  }

  public updateEvent(id: string, updates: Partial<ChurchEvent>): ChurchEvent | null {
    const index = this.db.events.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.db.events[index] = {
      ...this.db.events[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.events[index];
  }

  public deleteEvent(id: string): boolean {
    const prev = this.db.events.length;
    this.db.events = this.db.events.filter(e => e.id !== id);
    if (this.db.events.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  public registerForEvent(reg: Omit<EventRegistration, 'id' | 'registered_at'>): EventRegistration {
    const newReg: EventRegistration = {
      ...reg,
      id: `reg-${Date.now()}`,
      registered_at: new Date().toISOString()
    };
    this.db.event_registrations.unshift(newReg);
    this.persist();
    return newReg;
  }

  // --- Gallery & Photos CRUD ---
  public addAlbum(album: Omit<GalleryAlbum, 'id' | 'created_at'>): GalleryAlbum {
    const newAlbum: GalleryAlbum = {
      ...album,
      id: `alb-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.db.gallery_albums.push(newAlbum);
    this.persist();
    return newAlbum;
  }

  public deleteAlbum(id: string): boolean {
    this.db.gallery_albums = this.db.gallery_albums.filter(a => a.id !== id);
    this.db.gallery_photos = this.db.gallery_photos.filter(p => p.album_id !== id);
    this.persist();
    return true;
  }

  public addPhoto(photo: Omit<GalleryPhoto, 'id' | 'created_at'>): GalleryPhoto {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `pho-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.db.gallery_photos.unshift(newPhoto);
    this.persist();
    return newPhoto;
  }

  public deletePhoto(id: string): boolean {
    const prev = this.db.gallery_photos.length;
    this.db.gallery_photos = this.db.gallery_photos.filter(p => p.id !== id);
    if (this.db.gallery_photos.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Announcements CRUD ---
  public addAnnouncement(ann: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>): Announcement {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.announcements.unshift(newAnn);
    this.persist();
    return newAnn;
  }

  public updateAnnouncement(id: string, updates: Partial<Announcement>): Announcement | null {
    const idx = this.db.announcements.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.db.announcements[idx] = {
      ...this.db.announcements[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.announcements[idx];
  }

  public deleteAnnouncement(id: string): boolean {
    const prev = this.db.announcements.length;
    this.db.announcements = this.db.announcements.filter(a => a.id !== id);
    if (this.db.announcements.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Bible Open Universes CRUD ---
  public updateBibleUniversity(info: Partial<BibleUniversity>): BibleUniversity {
    this.db.bible_university = {
      ...this.db.bible_university,
      ...info,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.bible_university;
  }

  public addCourse(course: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Course {
    const newCourse: Course = {
      ...course,
      id: `crs-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.courses.push(newCourse);
    this.persist();
    return newCourse;
  }

  public updateCourse(id: string, updates: Partial<Course>): Course | null {
    const idx = this.db.courses.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.db.courses[idx] = {
      ...this.db.courses[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.persist();
    return this.db.courses[idx];
  }

  public deleteCourse(id: string): boolean {
    const prev = this.db.courses.length;
    this.db.courses = this.db.courses.filter(c => c.id !== id);
    if (this.db.courses.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  public addFaculty(fac: Omit<Faculty, 'id' | 'created_at'>): Faculty {
    const newFaculty: Faculty = {
      ...fac,
      id: `fac-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.db.faculty.push(newFaculty);
    this.persist();
    return newFaculty;
  }

  public deleteFaculty(id: string): boolean {
    this.db.faculty = this.db.faculty.filter(f => f.id !== id);
    this.persist();
    return true;
  }

  public submitUniversityApplication(app: Omit<UniversityApplication, 'id' | 'status' | 'applied_at'>): UniversityApplication {
    const newApp: UniversityApplication = {
      ...app,
      id: `app-${Date.now()}`,
      status: 'Pending',
      applied_at: new Date().toISOString()
    };
    this.db.university_applications.unshift(newApp);
    this.persist();
    return newApp;
  }

  // --- Contact Enquiries ---
  public submitContactEnquiry(enquiry: Omit<ContactEnquiry, 'id' | 'status' | 'created_at'>): ContactEnquiry {
    const newEnquiry: ContactEnquiry = {
      ...enquiry,
      id: `cnt-${Date.now()}`,
      status: 'unread',
      created_at: new Date().toISOString()
    };
    this.db.contacts.unshift(newEnquiry);
    this.persist();
    return newEnquiry;
  }

  public updateEnquiryStatus(id: string, status: 'unread' | 'read' | 'replied'): void {
    const enq = this.db.contacts.find(c => c.id === id);
    if (enq) {
      enq.status = status;
      this.persist();
    }
  }

  // --- Authorized WhatsApp Module ---
  public addWhatsAppContact(contact: Omit<WhatsAppContact, 'id' | 'created_at'>): WhatsAppContact {
    const newContact: WhatsAppContact = {
      ...contact,
      id: `wac-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.db.whatsapp_contacts.push(newContact);
    this.persist();
    return newContact;
  }

  public updateWhatsAppContact(id: string, updates: Partial<WhatsAppContact>): WhatsAppContact | null {
    const idx = this.db.whatsapp_contacts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.db.whatsapp_contacts[idx] = {
      ...this.db.whatsapp_contacts[idx],
      ...updates
    };
    this.persist();
    return this.db.whatsapp_contacts[idx];
  }

  public deleteWhatsAppContact(id: string): boolean {
    const prev = this.db.whatsapp_contacts.length;
    this.db.whatsapp_contacts = this.db.whatsapp_contacts.filter(c => c.id !== id);
    if (this.db.whatsapp_contacts.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  public addWhatsAppGroup(group: Omit<WhatsAppGroup, 'id' | 'created_at'>): WhatsAppGroup {
    const newGroup: WhatsAppGroup = {
      ...group,
      id: `wag-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.db.whatsapp_groups.push(newGroup);
    this.persist();
    return newGroup;
  }

  public sendWhatsAppBroadcast(campaignTitle: string, groupId: string, template: string): { message: WhatsAppMessage; historyCount: number } {
    // Only send to contacts with verified opt-in consent
    const eligibleContacts = this.db.whatsapp_contacts.filter(c => {
      if (!c.consent_given || c.status !== 'Active') return false;
      if (groupId === 'all') return true;
      return c.group_ids.includes(groupId);
    });

    const newMsg: WhatsAppMessage = {
      id: `wam-${Date.now()}`,
      campaign_title: campaignTitle,
      target_group_id: groupId,
      message_template: template,
      sent_at: new Date().toISOString(),
      total_recipients: eligibleContacts.length,
      status: 'Sent',
      created_at: new Date().toISOString()
    };
    this.db.whatsapp_messages.unshift(newMsg);

    // Create history log for each recipient with personalized variable replacement
    eligibleContacts.forEach((contact, index) => {
      const personalized = template
        .replace(/{{name}}/g, contact.name)
        .replace(/{{church}}/g, this.db.church_info.name);

      const historyEntry: MessageHistory = {
        id: `mh-${Date.now()}-${index}`,
        whatsapp_message_id: newMsg.id,
        contact_id: contact.id,
        contact_name: contact.name,
        phone: contact.phone,
        personalized_content: personalized,
        status: index % 3 === 0 ? 'Read' : 'Delivered',
        provider_message_id: `wamid.HBgL${contact.phone.replace('+', '')}FQIAERgSQjBFMDNDNzk1MUYwMUQxODAzAA==`,
        timestamp: new Date().toISOString()
      };
      this.db.message_history.unshift(historyEntry);
    });

    this.persist();
    return { message: newMsg, historyCount: eligibleContacts.length };
  }

  // --- College Engineering Project Feature: Relational SQL Query Runner ---
  public executeSQLQuery(sql: string): { columns: string[]; rows: any[]; message?: string; error?: string } {
    const trimmed = sql.trim();
    if (!trimmed) {
      return { columns: [], rows: [], message: 'Empty query.' };
    }

    try {
      const lower = trimmed.toLowerCase();

      // Simple SELECT parser: SELECT * FROM [table] [WHERE col = 'val'] [ORDER BY col [ASC|DESC]] [LIMIT n]
      if (lower.startsWith('select')) {
        const fromMatch = lower.match(/from\s+([a-z_]+)/i);
        if (!fromMatch) {
          return { columns: [], rows: [], error: 'Syntax Error: Missing FROM table clause' };
        }
        const tableName = fromMatch[1].trim() as keyof AppDatabase;

        if (!(tableName in this.db)) {
          return {
            columns: [],
            rows: [],
            error: `Table '${tableName}' does not exist. Available tables: ${Object.keys(this.db).join(', ')}`
          };
        }

        let data = Array.isArray(this.db[tableName]) ? [...(this.db[tableName] as any[])] : [this.db[tableName]];

        // Basic WHERE support
        const whereMatch = trimmed.match(/where\s+([a-zA-Z0-9_]+)\s*(=|!=|LIKE)\s*['"]?([^'"]+)['"]?/i);
        if (whereMatch) {
          const col = whereMatch[1];
          const op = whereMatch[2].toUpperCase();
          const val = whereMatch[3];

          data = data.filter(item => {
            const itemVal = String(item[col] ?? '');
            if (op === '=') return itemVal.toLowerCase() === val.toLowerCase();
            if (op === '!=') return itemVal.toLowerCase() !== val.toLowerCase();
            if (op === 'LIKE') return itemVal.toLowerCase().includes(val.toLowerCase().replace(/%/g, ''));
            return true;
          });
        }

        // Basic ORDER BY support
        const orderMatch = trimmed.match(/order\s+by\s+([a-zA-Z0-9_]+)\s*(asc|desc)?/i);
        if (orderMatch) {
          const col = orderMatch[1];
          const isDesc = (orderMatch[2] || 'ASC').toUpperCase() === 'DESC';
          data.sort((a, b) => {
            const va = a[col];
            const vb = b[col];
            if (va < vb) return isDesc ? 1 : -1;
            if (va > vb) return isDesc ? -1 : 1;
            return 0;
          });
        }

        // Basic LIMIT support
        const limitMatch = trimmed.match(/limit\s+(\d+)/i);
        if (limitMatch) {
          const lim = parseInt(limitMatch[1], 10);
          data = data.slice(0, lim);
        }

        if (data.length === 0) {
          return { columns: ['result'], rows: [], message: '0 rows returned.' };
        }

        const columns = Object.keys(data[0]);
        return { columns, rows: data, message: `Query successful: ${data.length} row(s) returned.` };
      }

      return {
        columns: ['status'],
        rows: [{ status: 'Query parsed in read-only sandbox mode' }],
        message: 'Non-SELECT operations in the demo SQL query console are safeguarded.'
      };
    } catch (err: any) {
      return { columns: [], rows: [], error: err.message || 'Execution error.' };
    }
  }

  // --- Export Database as SQL Dump or JSON ---
  public exportSQLDump(): string {
    const timestamp = new Date().toISOString();
    let sql = `-- ==========================================================\n`;
    sql += `-- CHRIST WORLD Church Information & Communication Management System\n`;
    sql += `-- Relational SQL Database Dump\n`;
    sql += `-- Generated: ${timestamp}\n`;
    sql += `-- ==========================================================\n\n`;

    const tables = Object.keys(this.db) as (keyof AppDatabase)[];
    for (const t of tables) {
      sql += `-- Table structure and data for \`${t}\`\n`;
      const val = this.db[t];
      const records = Array.isArray(val) ? val : [val];
      if (records.length === 0) continue;

      const sample = records[0];
      const cols = Object.keys(sample);
      sql += `CREATE TABLE IF NOT EXISTS \`${t}\` (\n`;
      sql += cols.map(c => `  \`${c}\` TEXT`).join(',\n');
      sql += `\n);\n\n`;

      for (const r of records) {
        const rAny = r as Record<string, any>;
        const escapedVals = cols.map(c => {
          const v = rAny[c];
          if (v === null || v === undefined) return 'NULL';
          if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
          return `'${String(v).replace(/'/g, "''")}'`;
        });
        sql += `INSERT INTO \`${t}\` (${cols.map(c => `\`${c}\``).join(', ')}) VALUES (${escapedVals.join(', ')});\n`;
      }
      sql += `\n`;
    }

    return sql;
  }
}

export const dbService = new DatabaseService();
