/**
 * Relational Database Schema Types for CHRIST WORLD
 * Church Information & Communication Management System
 */

export type ContentStatus = 'draft' | 'published';

export interface Admin {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  name: string;
  role: 'Super Admin' | 'Pastor' | 'Content Editor';
  last_login?: string;
  created_at: string;
}

export interface ChurchInfo {
  id: string;
  name: string;
  affiliation: string; // e.g. "Affiliated to Bible Open Universes India & International"
  tagline: string;
  welcome_title: string;
  welcome_intro: string;
  vision: string;
  mission: string;
  history: string;
  service_timings: { day: string; time: string; name: string }[];
  address: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  google_maps_embed: string;
  social_facebook: string;
  social_youtube: string;
  social_instagram: string;
  banner_image_url: string;
  updated_at: string;
}

export interface Leader {
  id: string;
  name: string;
  position: string; // e.g. Senior Pastor, Pastor, Bible Teacher, Youth Leader, Women's Ministry Leader
  biography: string;
  ministry_department: string;
  photo_url: string;
  email?: string;
  phone?: string;
  social_links?: { platform: string; url: string }[];
  display_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  name: string;
  role_or_ministry: string; // e.g. Choir Member, Usher, Sunday School Volunteer, Deacon
  biography: string;
  photo_url: string;
  // Private fields (NEVER shown publicly on the public members page)
  private_email?: string;
  private_phone?: string;
  private_address?: string;
  consent_given: boolean; // Consent to display public profile
  is_public: boolean;     // Admin toggle to control public display
  joined_date?: string;
  created_at: string;
  updated_at: string;
}

export interface BibleMessage {
  id: string;
  title: string;
  bible_reference: string; // e.g. "2 Peter 3:18"
  speaker: string;
  date: string;
  category: 'Faith' | 'Prayer' | 'Spiritual Growth' | 'Christian Life' | 'Family' | 'Youth' | 'Old Testament' | 'New Testament';
  short_description: string;
  full_content: string;
  featured_image_url: string;
  scripture_verse_text?: string;
  audio_url?: string;
  pdf_notes_url?: string;
  status: ContentStatus;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  youtube_url: string;
  youtube_video_id: string;
  bible_reference: string;
  speaker: string;
  date: string;
  description: string;
  thumbnail_url: string;
  is_featured: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "06:30 PM - 08:30 PM"
  location: string;
  description: string;
  image_url: string;
  category: 'Worship Service' | 'Conference' | 'Youth Meet' | 'Prayer Night' | 'Seminar' | 'Community Outreach';
  registration_required: boolean;
  contact_info: string;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  event_title: string;
  full_name: string;
  email: string;
  phone: string;
  attendees_count: number;
  notes?: string;
  registered_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  category: 'Church Services' | 'Bible Studies' | 'Youth' | "Children's Ministry" | "Women's Ministry" | 'Special Events' | 'Bible Open Universes' | 'Bible Open University' | 'Community Activities';
  cover_image_url: string;
  event_date?: string;
  created_at: string;
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  title: string;
  caption?: string;
  photo_url: string;
  category: string;
  date: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
  is_important: boolean; // Flag for priority display on home & announcements page
  image_or_doc_url?: string;
  category: 'General' | 'Worship' | 'University' | 'Youth' | 'Urgent';
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface BibleUniversity {
  id: string;
  title: string;
  subtitle: string;
  about_text: string;
  india_training_info: string;
  international_training_info: string;
  training_programs_overview: string;
  admissions_guidelines: string;
  eligibility_requirements: string;
  important_dates: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  disclaimer: string;
  updated_at: string;
}

export interface Course {
  id: string;
  course_name: string;
  code: string;
  duration: string; // e.g. "1 Year", "6 Months", "2 Years"
  level: 'Certificate' | 'Diploma' | 'Bachelor in Biblical Studies' | 'Master of Ministry' | 'Leadership Track';
  description: string;
  eligibility: string;
  mode_of_study: 'Online / Distance Learning' | 'Campus / Residential' | 'Hybrid Weekend';
  certificate_information: string;
  modules_count: number;
  featured_image: string;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  subjects_taught: string;
  biography: string;
  photo_url: string;
  display_order: number;
  created_at: string;
}

export interface Student {
  id: string;
  name: string;
  enrolled_course_id: string;
  enrolled_course_name: string;
  country: string;
  testimonial: string;
  graduation_year: string;
  photo_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface UniversityApplication {
  id: string;
  course_id: string;
  course_name: string;
  applicant_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  highest_qualification: string;
  statement_of_faith: string;
  status: 'Pending' | 'Approved' | 'Reviewing' | 'Contacted';
  applied_at: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

// Authorized WhatsApp Communication Module Tables
export interface WhatsAppContact {
  id: string;
  name: string;
  phone: string; // E.164 format, e.g. +919876543210
  group_ids: string[];
  consent_given: boolean; // Explicit opt-in verification
  consent_timestamp: string;
  consent_source: 'Church Registration' | 'Bible University Form' | 'Visitor Card' | 'Direct Admin Opt-In';
  notes?: string;
  status: 'Active' | 'Unsubscribed' | 'Invalid';
  created_at: string;
}

export interface WhatsAppGroup {
  id: string;
  name: string;
  description: string;
  color_code: string;
  member_count?: number;
  created_at: string;
}

export interface WhatsAppMessage {
  id: string;
  campaign_title: string;
  target_group_id: string; // or 'all_opted_in'
  message_template: string; // can contain variables like {{name}}
  scheduled_at?: string;
  sent_at?: string;
  total_recipients: number;
  status: 'Draft' | 'Sending' | 'Sent' | 'Failed';
  created_at: string;
}

export interface MessageHistory {
  id: string;
  whatsapp_message_id: string;
  contact_id: string;
  contact_name: string;
  phone: string;
  personalized_content: string;
  status: 'Queued' | 'Sent' | 'Delivered' | 'Read' | 'Failed';
  provider_message_id: string; // Simulated WhatsApp Business API message ID
  error_details?: string;
  timestamp: string;
}

// Database schema container
export interface AppDatabase {
  admins: Admin[];
  church_info: ChurchInfo;
  leaders: Leader[];
  members: Member[];
  bible_messages: BibleMessage[];
  youtube_videos: YouTubeVideo[];
  events: ChurchEvent[];
  event_registrations: EventRegistration[];
  gallery_albums: GalleryAlbum[];
  gallery_photos: GalleryPhoto[];
  announcements: Announcement[];
  bible_university: BibleUniversity;
  courses: Course[];
  faculty: Faculty[];
  students: Student[];
  university_applications: UniversityApplication[];
  contacts: ContactEnquiry[];
  whatsapp_groups: WhatsAppGroup[];
  whatsapp_contacts: WhatsAppContact[];
  whatsapp_messages: WhatsAppMessage[];
  message_history: MessageHistory[];
}
