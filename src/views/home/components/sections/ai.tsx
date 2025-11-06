import React from "react";
import CustomSection from "@/views/home/components/customSection";
import Button from "@/components/ui/button";
import Title from '@/views/home/components/title';
import Subtitle from '@/views/home/components/subtitle';
import CardTitle from '@/views/home/components/cardTitle';
import CardSubtitle from "@/views/home/components/cardSubtitle";
import Card from "@/views/home/components/card";
import { s3 } from "@/utils";

interface AIProps {}

export const AI: React.FC<AIProps> = () => {
  return (
    <div className="relative">
      <CustomSection className="relative">
        <div className="flex flex-col items-center justify-center">
          <Button className="mb-6">AI</Button>
          <Title className="mb-[8px]">AI Recaps on Any Asset</Title>
          <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
            Quick, AI-generated insights on any cryptocurrency
          </Subtitle>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 md:p-10">
            <div className="flex justify-center">
              <picture>
                <source
                  srcSet={s3('home/ai/summ.webp')}
                  type="image/webp"
                />
                <source
                  srcSet={s3('home/ai/summ.png')}
                  type="image/png"
                />
                <img
                  src={s3('home/ai/summ.png')}
                  srcSet={s3('home/ai/summ.png')}
                  alt="AI Summary"
                />
              </picture>
            </div>
            <div className="pt-6">
              <CardTitle className="mb-2">Instant AI Summaries</CardTitle>
              <CardSubtitle>
                Get concise updates on news, price movements,
                <br />
                and key project developments for any asset
              </CardSubtitle>
            </div>
          </Card>

          <Card className="p-6 md:p-10">
            <div className="flex justify-center">
              <picture>
                <source
                  srcSet={s3('home/ai/analysis.webp')}
                  type="image/webp"
                />
                <source
                  srcSet={s3('home/ai/analysis.png')}
                  type="image/png"
                />
                <img
                  src={s3('home/ai/analysis.png')}
                  srcSet={s3('home/ai/analysis.png')}
                  alt="Market Sentiment Analysis"
                />
              </picture>
            </div>
            <div className="pt-6">
              <CardTitle className="mb-2">Market Sentiment Analysis</CardTitle>
              <CardSubtitle>
                Track real-time shifts in investor sentiment
                <br className="hidden md:block" /> and emerging trends across the
                crypto space
              </CardSubtitle>
            </div>
          </Card>
        </div>
      </CustomSection>

      <div className="overflow-hidden">
        <picture className="-z-10 absolute bottom-0 right-0 translate-y-1/2 w-36">
          <source
            srcSet={s3('home/ai/half-circle.webp')}
            type="image/webp"
          />
          <source
            srcSet={s3('home/ai/half-circle.png')}
            type="image/png"
          />
          <img
            src={s3('home/ai/half-circle.png')}
            srcSet={s3('home/ai/half-circle.png')}
            alt="Background Half Circle"
          />
        </picture>
      </div>
    </div>
  );
};
