import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import NurseLogo from '../assets/Nurse.png'

const WEBHOOK_URL = 'https://n8n.srv1159869.hstgr.cloud/webhook/review-submit'

interface FeatureOption {
    code: string
    label: string
}

const FEATURES: FeatureOption[] = [
    { code: 'bp_log', label: 'บันทึกความดัน' },
    { code: 'appointment_log', label: 'บันทึกวันนัดหมอ' },
    { code: 'bp_history', label: 'ดูประวัติความดันย้อนหลัง' },
    { code: 'bp_dashboard', label: 'ดูแดชบอร์ดความดัน' },
    { code: 'bp_dashboard_share', label: 'แชร์แดชบอร์ดความดัน' },
    { code: 'appointment_list', label: 'ดูรายการนัดหมาย' },
    { code: 'interested_not_active', label: 'ยังไม่ได้ใช้บ่อย แต่สนใจ' },
]

export default function ReviewForm() {
    const navigate = useNavigate()

    const [rating, setRating] = useState<number | null>(null)
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [featureRequest, setFeatureRequest] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const toggleFeature = (code: string) => {
        setSelectedFeatures((prev) =>
            prev.includes(code) ? prev.filter((f) => f !== code) : [...prev, code]
        )
        setError(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!rating) {
            alert("กรุณาให้คะแนนความรู้สึกโดยรวมก่อนนะครับ")
            return
        }

        setIsSubmitting(true)

        const payload = {
            user_id: new URLSearchParams(window.location.search).get('userId') || 'anonymous',
            rating,
            most_used_features: selectedFeatures,
            feature_request: featureRequest.trim() || null,
            message: message.trim() || null,
            source: 'web_form'
        }

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error('Submission failed')
            }

            navigate('/thank-you')
        } catch {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งนะครับ')
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex items-center justify-center p-6 py-16 min-h-dvh relative overflow-x-hidden font-prompt">

            {/* Background Animation Layer */}
            <div className="ocean fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[15%] left-[-10%] w-28 animate-swim opacity-40">
                    <svg viewBox="0 0 512 512" fill="#FDBA74" className="w-full h-full">
                        <path d="M485.4 189.6c-27.4-23.7-65.7-22.1-79-20.7-5.5-29.6-18.7-56.7-39.7-77.9-20.6-20.8-47.5-35.8-77.1-43-30.8-7.5-62.7-4.1-92.6 9.8-19.9 9.3-37.5 22.8-51.5 39.5-13.7-6.8-28.7-10.8-44.5-10.8-49.3 0-90.9 36.3-98.3 83.6-1.5 9.6-2.3 19.5-2.3 29.5 0 29.5 6.9 57.3 19.1 82.2-20.1 27.6-17.7 66.8 6.7 91.5 22.1 22.3 57.4 24.6 82.4 6.7 15.6 19.9 36.2 35.8 59.9 45.4 31 12.6 64.9 14.7 97.4 6.1 32.2-8.5 61.2-26.7 82.9-52 4.1-4.8 7.8-9.9 11-15.2 24.1 6.6 68.7 13.7 97.1-13.5 33.6-32.2 38.6-86.8 45-128.7 1.1-7.4-8.8-12-15.5-7.9-10.7 6.5-24.1 12.8-39.6 17.1 2.3-17 5.2-31.9 8.2-44.4 3.7-15.5 4.3-31.2 1.3-46.6-2.2-11.4-15.9-15.5-23.3-9.1z" />
                    </svg>
                </div>
                <div className="absolute w-4 h-4 left-[10%] bottom-0 animate-bubble bg-orange-200/50 rounded-full" style={{ animationDelay: '0s' }}></div>
                <div className="absolute w-6 h-6 left-[50%] bottom-0 animate-bubble bg-orange-100/50 rounded-full" style={{ animationDelay: '2s' }}></div>
                <div className="absolute w-3 h-3 left-[90%] bottom-0 animate-bubble bg-orange-300/30 rounded-full" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Main Form Container */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-2xl z-10"
            >
                <div className="glass p-10 md:p-16 w-full">

                    {/* ==================== HEADER SECTION ==================== */}

                    {/* Fish Logo */}
                    <div className="flex justify-center mb-12">
                        <div className="w-36 h-36 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden p-4 animate-wiggle">
                            <img src={NurseLogo} alt="Nurse Logo" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* Header Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl font-bold text-gray-800 leading-relaxed drop-shadow-sm">
                            ปลาท๊องงอยากฟัง<br />ความรู้สึกของคุณฮะ
                        </h1>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent mb-20"></div>

                    {/* ==================== FORM SECTIONS ==================== */}
                    <form onSubmit={handleSubmit}>

                        {/* ========== Section 1: Overall Rating ========== */}
                        <div className="mb-32">
                            <div className="bg-white/50 rounded-3xl p-12 border border-white/50 shadow-sm">

                                <label className="block text-xl font-bold text-gray-800 mb-10">
                                    ความรู้สึกโดยรวม
                                </label>

                                <div className="flex justify-center py-6">
                                    <div className="flex gap-6 md:gap-8 text-5xl md:text-6xl">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`transition-all duration-300 hover:scale-125 focus:outline-none p-3 ${rating && rating >= star
                                                        ? 'text-orange-500 drop-shadow-lg scale-110'
                                                        : 'text-gray-300 hover:text-orange-200'
                                                    }`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* ========== Section 2: Most Used Features ========== */}
                        <div className="mb-32">

                            <label className="block text-xl font-bold text-gray-800 mb-10">
                                ฟีเจอร์ที่ใช้บ่อยที่สุด <span className="text-base font-normal text-gray-500">(เลือกได้หลายข้อ)</span>
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {FEATURES.map((feature) => (
                                    <label
                                        key={feature.code}
                                        className={`cursor-pointer relative group ${feature.code === 'interested_not_active' ? 'col-span-1 md:col-span-2' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedFeatures.includes(feature.code)}
                                            onChange={() => toggleFeature(feature.code)}
                                            className="absolute opacity-0 w-0 h-0"
                                        />
                                        <div className="glass-card p-5 rounded-2xl text-center text-base min-h-[64px] flex items-center justify-center text-gray-700 transition-all hover:shadow-md">
                                            {feature.label}
                                        </div>
                                    </label>
                                ))}
                            </div>

                        </div>

                        {/* ========== Section 3: Feature Request ========== */}
                        <div className="mb-32">

                            <label htmlFor="feature_request" className="block text-xl font-bold text-gray-800 mb-8">
                                อยากให้เพิ่มอะไรไหมครับ?
                            </label>

                            <textarea
                                id="feature_request"
                                value={featureRequest}
                                onChange={(e) => setFeatureRequest(e.target.value)}
                                rows={4}
                                className="glass-input w-full rounded-2xl p-6 text-gray-700 resize-none text-base leading-relaxed"
                                placeholder="มีฟีเจอร์อะไรที่อยากให้เพิ่มบอกได้เลย..."
                            />

                        </div>

                        {/* ========== Section 4: Improvement Suggestions ========== */}
                        <div className="mb-32">

                            <label htmlFor="message" className="block text-xl font-bold text-gray-800 mb-8">
                                สิ่งที่อยากให้ปรับปรุง
                            </label>

                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={5}
                                className="glass-input w-full rounded-2xl p-6 text-gray-700 resize-none text-base leading-relaxed"
                                placeholder="ตรงไหนที่ใช้งานยาก หรืออยากให้ปรับปรุงบอกได้เลยครับ..."
                            />

                        </div>

                        {/* ========== Error Message ========== */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-50 text-red-600 px-8 py-5 rounded-2xl text-center text-base font-medium border border-red-100 shadow-sm mb-12"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ========== Submit Button ========== */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-6 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transform transition-all duration-200 flex items-center justify-center gap-3 text-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <span>กำลังส่งข้อมูล...</span>
                                ) : (
                                    <span>ส่งข้อมูลให้น้องปลา</span>
                                )}
                            </button>

                            <p className="text-center text-gray-400 text-sm mt-10">
                                ปลาท๊องงจะว่ายไปอ่านทุกข้อความเลยฮะ
                            </p>
                        </div>

                    </form>
                </div>
            </motion.div>
        </div>
    )
}
