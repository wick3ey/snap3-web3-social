
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface FriendProfileStatsProps {
  followersCount: number;
  followingCount: number;
  nftCount: number;
  level: number;
}

const FriendProfileStats: React.FC<FriendProfileStatsProps> = ({
  followersCount,
  followingCount,
  nftCount,
  level
}) => {
  const statItems = [
    { title: "Followers", value: followersCount.toLocaleString() },
    { title: "Following", value: followingCount.toLocaleString() },
    { title: "NFTs", value: nftCount },
    { 
      title: "Level", 
      value: level, 
      icon: (
        <div className="bg-solana-purple/20 text-solana-purple w-8 h-8 rounded-full flex items-center justify-center mr-1">
          <TrendingUp size={16} />
        </div>
      )
    }
  ];

  return (
    <div className="glass-morphism rounded-xl p-4 mt-6 grid grid-cols-4 gap-2">
      {statItems.map((stat, index) => (
        <motion.div 
          key={stat.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.2 }}
          className="text-center"
        >
          <div className="text-lg font-bold flex items-center justify-center">
            {stat.icon && stat.icon}
            <span>{stat.value}</span>
          </div>
          <div className="text-xs text-gray-400">{stat.title}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default FriendProfileStats;
