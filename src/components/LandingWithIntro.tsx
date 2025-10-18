import React from 'react';

interface LandingWithIntroProps {
    onFinish: () => void;
}

const LandingWithIntro: React.FC<LandingWithIntroProps> = ({ onFinish }) => {
    return (
        <div className='landing-intro'>
            <button onClick={onFinish}>Skip Intro</button>
        </div>
    );
};

export default LandingWithIntro;
