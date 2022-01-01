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
  }, [id]);

  const className = hasCildren
    ? 'text-center bg-emerald-600 h-64 flex rounded-lg hover:bg-emerald-900 hover:cursor-pointer'
    : 'text-center bg-indigo-600  h-64 flex rounded-lg hover:bg-indigo-900 hover:cursor-pointer';

  return (
    <div key={id} className={className} onClick={handleClick}>
      <span className="text-6xl text-white font-extrabold m-auto">
        {phrase}
      </span>
    </div>
  );
};

export default Phrase;
