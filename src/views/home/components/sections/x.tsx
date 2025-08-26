import React from "react";
import CustomSection from "@/views/home/components/customSection";
import Button from "@/components/ui/button";
import Title from '@/views/home/components/title';
import Subtitle from '@/views/home/components/subtitle';
import CardTitle from '@/views/home/components/cardTitle';
import CardSubtitle from "@/views/home/components/cardSubtitle";

import graph from '@/assets/home/x/graph.png';
import followers from '@/assets/home/x/followers.png';
import progress from '@/assets/home/x/progress.png';
import x1 from '@/assets/home/x/x-1x.png';
import x2 from '@/assets/home/x/x-2x.png';
import x3 from '@/assets/home/x/x-3x.png';

import { s3 } from "@/utils"; // assuming you have this helper

interface XProps {}

export const X: React.FC<XProps> = () => {
  return (
    <CustomSection>
      <div className="flex flex-col items-center justify-center md:mb-14">
        <Button className="mb-6">x.com</Button>
        <Title className="mb-[8px]">Research X Wisely</Title>
        <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
          Get Insights Based on Twitter Followers
        </Subtitle>
      </div>
      <div className="flex flex-col-reverse md:grid grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-y-12 gap-x-10">
        <div>
          <div className="mb-10">
            <CardTitle className="mb-2">See Twitter Score</CardTitle>
            <CardSubtitle>
              Score is generated based on the popularity of this account in crypto
              space
            </CardSubtitle>
          </div>
          <div className="mb-10">
            <CardTitle className="mb-2">See Account Activity</CardTitle>
            <CardSubtitle>
              Analyze assets using price, volume, TVL, sentiment, and on-chain
              activity
            </CardSubtitle>
          </div>
          <div>
            <CardTitle className="mb-2">Review Followers</CardTitle>
            <CardSubtitle>
              Compare multiple tokens, blockchains, or DeFi projects side by side
            </CardSubtitle>
          </div>
        </div>
        <div>
          <div className="relative flex justify-center md:justify-end w-full md:mt-12">
            {/* Desktop */}
            <div className="hidden md:flex">
              <img
                loading="lazy"
                src={progress}
                alt=""
                className="max-h-[180px] lg:max-h-[227px] -mr-[20%] -mt-[10%] z-[2]"
              />
              <picture>
                <source srcSet={s3("jw4svo7bhaz4crrajogzytmkd3lq/athenax/x/followers.webp")} type="image/webp" />
                <source srcSet={s3("jvjf4wr2gbuog2vsupvi3e23osoq/athenax/x/followers.png")} type="image/png" />
                <img
                  src={s3("jvjf4wr2gbuog2vsupvi3e23osoq/athenax/x/followers.png")}
                  srcSet={s3("jvjf4wr2gbuog2vsupvi3e23osoq/athenax/x/followers.png")}
                  alt="Dashboard"
                  className="max-h-[190px] lg:max-h-[233px] absolute bottom-2 lg:bottom-0 left-10"
                />
              </picture>
              <img
                loading="lazy"
                src={graph}
                alt=""
                className="max-h-[400px] top-16 right-0 w-[80%] z-[1]"
              />
            </div>
            {/* Mobile */}
            <picture className="flex justify-center md:hidden w-full">
              <source
                srcSet={`${s3("jxbx2bk3mb6crq4ooucdthvis7tq/athenax/x/x-2x.webp")} 2x, ${s3(
                  "jx7n4jtbuaga7q7hc5zfxrz36v5q/athenax/x/x-3x.webp"
                )} 3x`}
                type="image/webp"
              />
              <source
                srcSet={`${s3("jx34skqr5fbvr46f3t2gcx6slgea/athenax/x/x-2x.png")} 2x, ${s3(
                  "juduffrluxgs5urc6q2ds3fzupgq/athenax/x/x-3x.png"
                )} 3x`}
                type="image/png"
              />
              <img
                src={s3("juduffrluxgs5urc6q2ds3fzupgq/athenax/x/x-3x.png")}
                srcSet={`${s3("jx34skqr5fbvr46f3t2gcx6slgea/athenax/x/x-2x.png")} 2x, ${s3(
                  "juduffrluxgs5urc6q2ds3fzupgq/athenax/x/x-3x.png"
                )} 3x`}
                alt="News"
              />
            </picture>
          </div>
        </div>
      </div>
    </CustomSection>
  );
};
