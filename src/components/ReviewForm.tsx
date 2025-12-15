import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Activity, Calendar, History, BarChart2, Share2, ClipboardList, Send } from 'lucide-react';
import liff from '@line/liff';
import NurseLogo from '../assets/Nurse.png';

const WEBHOOK_URL = 'https://n8n.srv1159869.hstgr.cloud/webhook/review-submit';
const LIFF_ID = '2008692184-BtsHKjM8';

export default function ReviewForm() {
    const navigate = useNavigate();

    // Logic State
    const [userId, setUserId] = useState<string>('anonymous');
    const [isLiffReady, setIsLiffReady] = useState(false);

    // UI State
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [feedback, setFeedback] = useState(''); // Request Feature
    const [improvement, setImprovement] = useState(''); // Improvement
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Feature list based on the image provided
    const features = [
        { id: 'bp_record', label: 'บันทึกความดัน', icon: <Activity className="w-5 h-5" /> },
        { id: 'app_record', label: 'บันทึกวันนัดหมอ', icon: <Calendar className="w-5 h-5" /> },
        { id: 'bp_history', label: 'ดูประวัติความดันย้อนหลัง', icon: <History className="w-5 h-5" /> },
        { id: 'bp_dashboard', label: 'ดูแดชบอร์ดความดัน', icon: <BarChart2 className="w-5 h-5" /> },
        { id: 'share_dashboard', label: 'แชร์แดชบอร์ดความดัน', icon: <Share2 className="w-5 h-5" /> },
        { id: 'app_list', label: 'ดูรายการนัดหมาย', icon: <ClipboardList className="w-5 h-5" /> },
    ];

    // Initialize LIFF
    useEffect(() => {
        const initLiff = async () => {
            try {
                if (liff.isInClient()) {
                    await liff.init({ liffId: LIFF_ID });
                    setIsLiffReady(true);
                    if (liff.isLoggedIn()) {
                        const profile = await liff.getProfile();
                        setUserId(profile.userId);
                    } else {
                        liff.login();
                    }
                } else {
                    // Fallback for browser
                    await liff.init({ liffId: LIFF_ID });
                    setIsLiffReady(true);
                    if (liff.isLoggedIn()) {
                        const profile = await liff.getProfile();
                        setUserId(profile.userId);
                    }
                }
            } catch (err) {
                console.error('LIFF Error:', err);
                const urlUserId = new URLSearchParams(window.location.search).get('userId');
                if (urlUserId) setUserId(urlUserId);
                setIsLiffReady(true);
            }
        };
        initLiff();
    }, []);

    const toggleFeature = (id: string) => {
        setSelectedFeatures((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("กรุณาให้คะแนนความรู้สึกโดยรวมก่อนนะครับ");
            return;
        }

        setIsSubmitting(true);

        const payload = {
            user_id: userId,
            rating,
            most_used_features: selectedFeatures,
            feature_request: feedback.trim() || null,
            message: improvement.trim() || null,
            source: 'web_form'
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Submission failed');

            navigate('/thank-you');
        } catch (error) {
            alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
            setIsSubmitting(false);
        }
    };

    if (!isLiffReady) {
        return (
            <div className="flex items-center justify-center min-h-screen font-kanit">
                <div className="animate-spin text-4xl text-orange-400">⌛</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 font-kanit flex items-center justify-center p-4">
            {/* Import Thai Font */}
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap');
          .font-kanit { font-family: 'Kanit', sans-serif; }
        `}
            </style>

            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100 relative mb-10">
                {/* Decorative Top Background */}
                <div className="h-32 bg-orange-400 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300 rounded-full opacity-50 blur-xl"></div>
                    <div className="absolute top-10 -left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-40 blur-xl"></div>
                </div>

                {/* Mascot Avatar Container - Floating over header */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-28 h-28 bg-white rounded-full p-2 shadow-lg flex items-center justify-center relative z-10 transition-transform hover:scale-105 duration-300">
                        <div className="w-full h-full bg-orange-50 rounded-full flex items-center justify-center overflow-hidden p-3">
                            {/* Replaced SVG with NurseLogo */}
                            <img src={NurseLogo} alt="Nurse Logo" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="pt-16 pb-8 px-6 text-center">

                    {/* Header Text */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                        ปลาท๊องงอยากฟัง
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        ความรู้สึกของคุณฮะ
                    </p>

                    {/* Rating Section */}
                    <div className="mb-8 p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
                        <h2 className="text-gray-700 font-medium mb-3">ความรู้สึกโดยรวม</h2>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform transform hover:scale-110 focus:outline-none"
                                >
                                    <Star
                                        className={`w-10 h-10 ${star <= (hoverRating || rating)
                                            ? 'fill-orange-400 text-orange-400 drop-shadow-sm'
                                            : 'text-gray-300'
                                            } transition-colors duration-200`}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-orange-400 mt-2 font-medium h-5">
                            {rating === 5 ? 'ยอดเยี่ยมเลย! 🎉' : rating === 4 ? 'ดีมากครับ 😊' : rating > 0 ? 'ขอบคุณครับ 🙏' : ''}
                        </p>
                    </div>

                    {/* Features Selection */}
                    <div className="mb-8">
                        <h3 className="text-left text-gray-800 font-semibold mb-1">ฟีเจอร์ที่ใช้บ่อยที่สุด</h3>
                        <p className="text-left text-gray-400 text-sm mb-4">(เลือกได้หลายข้อ)</p>

                        <div className="grid grid-cols-1 gap-3">
                            {features.map((feature) => (
                                <button
                                    key={feature.id}
                                    type="button"
                                    onClick={() => toggleFeature(feature.id)}
                                    className={`flex items-center p-3 rounded-xl border transition-all duration-200 group ${selectedFeatures.includes(feature.id)
                                        ? 'bg-orange-50 border-orange-400 shadow-sm'
                                        : 'bg-white border-gray-100 hover:border-orange-200 hover:bg-orange-50/30'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg mr-3 transition-colors ${selectedFeatures.includes(feature.id) ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-400'
                                        }`}>
                                        {feature.icon}
                                    </div>
                                    <span className={`text-md font-medium ${selectedFeatures.includes(feature.id) ? 'text-orange-800' : 'text-gray-600'
                                        }`}>
                                        {feature.label}
                                    </span>
                                    {selectedFeatures.includes(feature.id) && (
                                        <div className="ml-auto w-4 h-4 rounded-full bg-orange-400"></div>
                                    )}
                                </button>
                            ))}

                            {/* "Interested but haven't used" Option */}
                            <button
                                type="button"
                                onClick={() => toggleFeature('interested_not_active')}
                                className={`mt-2 w-full py-3 px-4 rounded-xl border border-dashed transition-all ${selectedFeatures.includes('interested_not_active')
                                    ? 'border-orange-400 bg-orange-50 text-orange-700'
                                    : 'border-gray-300 text-gray-500 hover:border-orange-300 hover:text-orange-500'
                                    }`}
                            >
                                ยังไม่ได้ใช้บ่อย แต่สนใจ
                            </button>
                        </div>
                    </div>

                    {/* Improvement Section */}
                    <div className="mb-6 text-left">
                        <label className="block text-gray-800 font-semibold mb-3">
                            สิ่งที่อยากให้ปรับปรุง
                        </label>
                        <div className="relative">
                            <textarea
                                value={improvement}
                                onChange={(e) => setImprovement(e.target.value)}
                                placeholder="มีส่วนไหนที่ใช้งานยาก หรือเจอ Bug บอกเราได้เลย..."
                                className="w-full p-4 h-24 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all resize-none text-gray-700 placeholder-gray-400 shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Feedback Text Area */}
                    <div className="mb-8 text-left">
                        <label className="block text-gray-800 font-semibold mb-3">
                            อยากให้เพิ่มอะไรไหมครับ?
                        </label>
                        <div className="relative">
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="มีฟีเจอร์อะไรที่อยากให้เพิ่มบอกได้เลย..."
                                className="w-full p-4 h-24 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all resize-none text-gray-700 placeholder-gray-400 shadow-inner"
                            />
                            <div className="absolute bottom-3 right-3 text-gray-400 text-xs">
                                {feedback.length}/500
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95 ${isSubmitting
                            ? 'bg-orange-300 text-white cursor-wait'
                            : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:shadow-orange-200'
                            }`}
                    >
                        {isSubmitting ? (
                            <span>กำลังส่งข้อมูล...</span>
                        ) : (
                            <>
                                <span>ส่งความคิดเห็น</span>
                                <Send className="w-5 h-5" />
                            </>
                        )}
                    </button>

                </div>
            </div>

            {/* Footer Credit */}
            <div className="fixed bottom-2 text-orange-800/20 text-xs font-kanit">
                Platong Review
            </div>
        </div>
    );
}
