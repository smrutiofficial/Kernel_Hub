import { useState } from 'react';
import {backend_link} from '@/app/constants/constant';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';


const reactionsList : Array<{ type: Reaction['type']; label: string; icon: string }> = [
  { type: 'smile', label: 'ACE!', icon: '👍' },
  { type: 'heart', label: 'LOVE!', icon: '❤️' },
  { type: 'angry', label: 'URGH!', icon: '😡' },
  { type: 'surprise', label: 'OMG!', icon: '😮' },
  { type: 'laugh', label: 'LOL!', icon: '😂' },
];
interface Reaction {
  userId: string;
  type: 'smile' | 'heart' | 'angry' | 'surprise' | 'laugh';
}
interface ReactionBarProps {
  postId: string;
  userId: string;
  reaction:Reaction[];
  setReaction: Dispatch<SetStateAction<Reaction[]>>;
}
const ReactionBar = ({ postId, userId,reaction,setReaction}:ReactionBarProps) => {
  const [selectedReaction, setSelectedReaction] = useState<Reaction['type'] | null>(null); 
  // const [responses, setResponses] = useState(0);


  const handleReaction = async (reactionType: Reaction['type']) => {
    setSelectedReaction(reactionType);
    
    try {
      // Send the reaction to your backend API
      await axios.post(`${backend_link}/api/posts/${postId}/reaction`, {
        userId,
        reactionType
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { data } = await axios.get(`${backend_link}/api/posts/${postId}`);
      setReaction(data.reactions);
    } catch (error) {
      console.error('Error adding/updating reaction:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-10 rounded-md text-center mt-20">
      <p className="text-gray-200 mb-4 text-2xl font-bold">Join the conversation!</p>
      <p className="text-[#AAFFA9] text-lg">{reaction.length} Responses</p>
      <div className="flex justify-center gap-6 mt-14">
        {reactionsList.map((reaction) => (
          <button
            key={reaction.type}
            onClick={() => handleReaction(reaction.type)}
            className={`flex flex-col items-center space-y-1 transition transform hover:scale-110 px-4 py-2 rounded-md ${
              selectedReaction === reaction.type ? 'text-[#AAFFA9] bg-gray-900' : 'text-gray-300'
            }`}
          >
            <span className="text-4xl">{reaction.icon}</span>
            <span className="text-xs">{reaction.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReactionBar;
