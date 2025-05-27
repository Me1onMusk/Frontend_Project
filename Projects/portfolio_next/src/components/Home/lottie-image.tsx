'use client';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../public/lottie.json';

// 홈 - 로티 애니메이션 //
export default function LottieImage() {
  return <Lottie loop animationData={lottieJson} play />;
}
