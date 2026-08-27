"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X, Mail, Phone, Building2, Globe, Clock, Target, User, MessageSquare,
  TrendingUp, MapPin, Calendar, Tag, DollarSign, Zap, ArrowUpRight, ExternalLink,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  source: string;
  status: string;
  score: number;
  value: string;
  message?: string | null;
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LeadDetailProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}

const STATUS_OPTIONS = [
  { key: "new", label: "New", color: "#00D4FF", bg: "rgba(0,212,255,0.1)" },
  { key: "hot", label: "Hot", color: "#FF4D00", bg: "rgba(255,77,0,0.1)" },
  { key: "warm", label: "Warm", color: "#FFD93D", bg: "rgba(255,217,61,0.1)" },
  { key: "cold", label: "Cold", color: "#6B6B80", bg: "rgba(107,107,128,0.1)" },
  { key: "converted", label: "Converted", color: "#00FF88", bg: "rgba(0,255,136,0.1)" },
  { key: "lost", label: "Lost", color: "#FF4444", bg: "rgba(255,68,68,0.1)" },
];

export default function LeadDetailPanel({ lead, onClose, onStatusChange }: LeadDetailProps) {
  if (!lead) return null;

  const statusOpt = STATUS_OPTIONS.find(s => s.key === lead.status) || STATUS_OPTIONS[0];
  const createdDate = new Date(lead.createdAt);
  const updatedDate = new Date(lead.updatedAt);

  return (
    <AnimatePresence>
      {lead && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"/>
          {/* Panel */}
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0C0C12] border-l border-[#1E1E2A] z-[80] overflow-y-auto">
            
            {/* Header */}
            <div className="sticky top-0 bg-[#0C0C12] border-b border-[#1E1E2A] p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4D00] to-[#FF8C42] flex items-center justify-center text-black font-bold text-sm">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-bold">{lead.name}</h2>
                  <p className="text-[10px] text-[#555566]">Lead ID: {lead.id.slice(0, 8)}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#1A1A24] transition-colors text-[#555566] hover:text-[#E8E8EC]">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Status + Score row */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-[10px] text-[#555566] mb-1.5">Status</p>
                  <div className="flex gap-1.5">
                    {STATUS_OPTIONS.map(s => (
                      <button key={s.key} onClick={() => onStatusChange(lead.id, s.key)}
                        className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all border ${
                          lead.status === s.key ? `border-transparent` : "border-[#1E1E2A] text-[#555566] hover:text-[#888899]"
                        }`} style={lead.status === s.key ? { background: s.bg, color: s.color } : {}}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-[#555566] mb-1">Score</p>
                  <div className="text-2xl font-bold" style={{ color: lead.score >= 70 ? "#FF4D00" : lead.score >= 40 ? "#FFD93D" : "#6B6B80" }}>
                    {lead.score}
                  </div>
                </div>
              </div>

              {/* AI Score analysis */}
              <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#FF4D00]"/>
                  <span className="text-xs font-bold">AI Analysis</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1A1A24] mb-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${lead.score}%` }} transition={{ duration: 1 }}
                    className="h-full rounded-full" style={{ background: `linear-gradient(90deg, #6B6B80, ${lead.score >= 70 ? "#FF4D00" : lead.score >= 40 ? "#FFD93D" : "#6B6B80"})` }}/>
                </div>
                <p className="text-[11px] text-[#888899] leading-relaxed">
                  {lead.score >= 80 ? "High-intent lead. Immediate follow-up recommended. Strong conversion probability based on engagement signals and firmographic data." :
                   lead.score >= 60 ? "Qualified prospect with genuine interest. Nurturing sequence active. Consider personalized outreach within 24 hours." :
                   lead.score >= 40 ? "Moderate potential. Automated nurturing engaged. Monitor engagement for score upgrades." :
                   "Early-stage lead. Low initial engagement. Long-term nurture campaign active."}
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <p className="text-[10px] text-[#555566] uppercase tracking-wider font-mono">Contact Information</p>
                {[
                  { icon: Mail, label: "Email", value: lead.email },
                  { icon: Phone, label: "Phone", value: lead.phone },
                  { icon: Building2, label: "Company", value: lead.company },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-[#111118]">
                    <item.icon className="w-4 h-4 text-[#555566]"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#555566]">{item.label}</p>
                      <p className="text-xs text-[#E8E8EC] truncate">{item.value || "Not provided"}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lead details */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Globe, label: "Source", value: lead.source },
                  { icon: DollarSign, label: "Value", value: lead.value },
                  { icon: User, label: "Assigned To", value: lead.assignedTo || "Unassigned" },
                  { icon: Tag, label: "Status", value: statusOpt.label },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-lg bg-[#111118] border border-[#1E1E2A]">
                    <item.icon className="w-3.5 h-3.5 text-[#555566] mb-1"/>
                    <p className="text-[10px] text-[#555566]">{item.label}</p>
                    <p className="text-xs font-medium capitalize">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Timestamps */}
              <div className="space-y-2">
                <p className="text-[10px] text-[#555566] uppercase tracking-wider font-mono">Timeline</p>
                <div className="flex items-center gap-3 text-xs text-[#888899]">
                  <Calendar className="w-3.5 h-3.5"/>
                  <span>Created: {createdDate.toLocaleDateString()} at {createdDate.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#888899]">
                  <ArrowUpRight className="w-3.5 h-3.5"/>
                  <span>Updated: {updatedDate.toLocaleDateString()} at {updatedDate.toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Message */}
              {lead.message && (
                <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-[#00D4FF]"/>
                    <span className="text-xs font-bold">Message</span>
                  </div>
                  <p className="text-xs text-[#888899] leading-relaxed">{lead.message}</p>
                </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF4D00] text-black text-xs font-bold hover:bg-[#FF6A2A] transition-colors">
                  <TrendingUp className="w-3.5 h-3.5"/> Convert Lead
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1E1E2A] text-xs font-semibold text-[#E8E8EC] hover:border-[#FF4D00]/40 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5"/> View Full Profile
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}