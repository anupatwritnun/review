import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DoctorLogo from '../assets/Doctor.png'

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61584036074074'
const WEBSITE_URL = 'https://home-bp-guide.vercel.app/'

// Confetti particle component
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
    <motion.div
        initial={{ y: -20, x: x, opacity: 1, scale: 1, rotate: 0 }}
        animate={{
            y: [0, 400, 600],
            x: [x, x + (Math.random() - 0.5) * 100, x + (Math.random() - 0.5) * 150],
            opacity: [1, 1, 0],
            rotate: [0, 360, 720],
            scale: [1, 1.2, 0.8],
        }}
        transition={{
            duration: 3,
            delay: delay,
            ease: 'easeOut',
        }}
        className="absolute top-0 pointer-events-none"
        style={{ left: `${x}%` }}
    >
        <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: color }}
        />
    </motion.div>
)

// Celebration burst animation
const CelebrationBurst = () => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.5,
        x: Math.random() * 100,
        color: ['#F97316', '#FBBF24', '#34D399', '#60A5FA', '#F472B6', '#A78BFA'][Math.floor(Math.random() * 6)],
    }))

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {particles.map((p) => (
                <ConfettiParticle key={p.id} delay={p.delay} x={p.x} color={p.color} />
            ))}
        </div>
    )
}

export default function ThankYou() {
    const [showCelebration, setShowCelebration] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setShowCelebration(false), 3500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex items-center justify-center p-4 py-12 min-h-dvh relative overflow-hidden font-prompt">

            {/* Celebration Animation */}
            {showCelebration && <CelebrationBurst />}

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

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="glass p-12 md:p-20 w-full max-w-2xl z-10 text-center"
            >
                {/* Doctor Logo - Centered */}
                <div className="flex justify-center mb-20">
                    <div className="relative w-56 h-56">
                        <div className="absolute inset-0 bg-white/40 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center z-10 animate-heartbeat">
                            <img src={DoctorLogo} alt="Doctor Logo" className="w-full h-full object-contain drop-shadow-xl" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-4xl font-bold mb-6 text-gray-800 drop-shadow-sm">ขอบคุณจากใจเลยฮะ</h2>

                {/* Message - Removed first line, single spacing */}
                <p className="text-gray-600 text-xl leading-relaxed font-light mb-28">
                    พี่ปลาท๊องงสัญญาว่าจะตั้งใจว่ายน้ำ<br />
                    เพื่อดูแลความดันของคุณตลอดไปเลย
                </p>

                {/* Social Links - Blue for Facebook, Orange for Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <a
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 p-6 bg-blue-500 hover:bg-blue-600 rounded-2xl text-white border border-blue-400 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <span className="font-semibold text-lg">Facebook</span>
                    </a>
                    <a
                        href={WEBSITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 p-6 bg-orange-500 hover:bg-orange-600 rounded-2xl text-white border border-orange-400 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <span className="font-semibold text-lg">Website</span>
                    </a>
                </div>
            </motion.div>
        </div>
    )
}
