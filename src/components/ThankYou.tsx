import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Facebook, Globe } from 'lucide-react';
import DoctorLogo from '../assets/Doctor.png';

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61584036074074';
const WEBSITE_URL = 'https://home-bp-guide.vercel.app/';

// Simple confetti particle
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
    <motion.div
        initial={{ y: -20, x: x, opacity: 1, scale: 1, rotate: 0 }}
        animate={{
            y: [0, 400],
            x: [x, x + (Math.random() - 0.5) * 100],
            opacity: [1, 0],
            rotate: [0, 360],
        }}
        transition={{ duration: 3, delay: delay, ease: 'easeOut' }}
        className="absolute top-0 pointer-events-none"
    >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    </motion.div>
);

export default function ThankYou() {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 font-kanit flex items-center justify-center p-4 overflow-hidden relative">

            {/* Confetti */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <ConfettiParticle
                            key={i}
                            delay={Math.random() * 0.5}
                            x={Math.random() * 100} // percentage
                            color={['#F97316', '#FBBF24', '#34D399', '#60A5FA'][i % 4]}
                        />
                    ))}
                </div>
            )}

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100 p-8 text-center"
            >
                {/* Initial Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center mb-6"
                >
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                </motion.div>

                {/* Doctor Mascot */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                    <div className="absolute inset-0 bg-orange-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <img
                        src={DoctorLogo}
                        alt="Doctor Logo"
                        className="w-full h-full object-contain relative z-10 drop-shadow-md"
                    />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">ขอบคุณจากใจเลยฮะ</h2>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    พี่ปลาท๊องงได้รับข้อมูลแล้ว<br />
                    จะรีบนำไปปรับปรุงให้ดีที่สุดเลยครับ!
                </p>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <a
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors group"
                    >
                        <Facebook className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">Facebook</span>
                    </a>
                    <a
                        href={WEBSITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-600 transition-colors group"
                    >
                        <Globe className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">Website</span>
                    </a>
                </div>

            </motion.div>

            {/* Footer */}
            <div className="fixed bottom-2 text-orange-800/20 text-xs font-kanit">
                Platong Review
            </div>
        </div>
    );
}
