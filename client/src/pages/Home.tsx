import { PostsBento } from '@/components/home/PostsBento';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import groovy from '../assets/groovy.webp';
import laying from '../assets/laying.webp';
import petting from '../assets/petting.webp';
import reading from '../assets/reading-side.webp';

const CTA = () => {
  return (
    <div className="h-[calc(100dvh-60px)] flex flex-col justify-center items-center relative overflow-hidden">
      <div>
        <div className="flex flex-col gap-4 justify-center items-center flex-1">
          <h1 className="text-2xl md:text-4xl font-bold italic font-rammetto">Magmuni-muni!</h1>
          <p>Reflect. Ponder. Share your thoughts.</p>
          <Button asChild>
            <Link to="/profile/write">Start writing today!</Link>
          </Button>
        </div>
      </div>
      <img
        src={groovy}
        alt="groovy-avatar"
        className="absolute top-5 -left-10 lg:left-10 -rotate-12 h-[40vw] max-h-[300px] -z-1 dark:hue-rotate-190 dark:invert-70"
      />
      <img
        src={petting}
        alt="petting-avatar"
        className="absolute -top-5 -right-6 -rotate-12  h-[40vw] max-h-[300px] -z-1 dark:hue-rotate-190 dark:invert-70"
      />
      <img
        src={reading}
        alt="reading-avatar"
        className="absolute bottom-6 -left-10 h-[40vw] max-h-[300px] -z-1 dark:hue-rotate-190 dark:invert-70"
      />
      <img
        src={laying}
        alt="laying-avatar"
        className="absolute rotate-12 bottom-0 -right-10 h-[40vw] max-h-[300px] -z-1 dark:hue-rotate-190 dark:invert-70"
      />
    </div>
  );
};

export const Home = () => {
  return (
    <div>
      <CTA />
      <PostsBento />
      {/* radial-gradient background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    </div>
  );
};
