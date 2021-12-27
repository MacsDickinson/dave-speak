import { useEffect, useState } from 'react';
import { loadPhraseByParent } from './phrasesRepository';

interface PhraseProps {
  id: number;
  phrase: string;
  parent: number | null;
  onClick: (parent: number) => void;
}

const Phrase = ({ id, phrase, parent, onClick }: PhraseProps) => {
  const [hasCildren, setHasChildren] = useState(false);

  const handleClick = () => {
    speak(phrase);
  };

  const speak = (phrase: string) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = phrase;
    window.speechSynthesis.speak(msg);

    if (hasCildren) {
      onClick(id);
    }
  };

  useEffect(() => {
    const children = loadPhraseByParent(id);

    if (children.length > 0) {
      setHasChildren(true);
    }
  }, []);

  const colour = hasCildren ? 'emerald' : 'indigo';

  return (
    <div
      key={id}
      className={`text-center bg-${colour}-600 aspect-square flex rounded-lg hover:bg-${colour}-900 hover:cursor-pointer`}
      onClick={handleClick}
    >
      <span className="text-6xl text-white font-extrabold m-auto">
        {phrase}
      </span>
    </div>
  );
};

export default Phrase;
