
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ProfileStatsProps {
  followersCount: number;
  followingCount: number;
  nftCount: number;
  level: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  followersCount,
  followingCount,
  nftCount,
  level
}) => {
  return (
    <div className="glass-morphism mx-4 rounded-xl p-4 grid grid-cols-4 gap-2">
      <div className="text-center">
        <div className="text-lg font-bold">{followersCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Followers</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">{followingCount.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Following</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">{nftCount}</div>
        <div className="text-xs text-gray-400">NFTs</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center">
          <div className="bg-solana-purple/20 text-solana-purple w-8 h-8 rounded-full flex items-center justify-center mr-1">
            <TrendingUp size={16} />
          </div>
          <span className="text-lg font-bold">{level}</span>
        </div>
        <div className="text-xs text-gray-400">Level</div>
      </div>
    </div>
  );
};

export default ProfileStats;
