import { ReactNode } from 'react';

interface AISearchOptimizationProps {
  question: string;
  answer: string | ReactNode;
  additionalContext?: string;
  relatedQuestions?: string[];
  category?: string;
}

/**
 * AISearchOptimization component helps optimize content for AI search engines
 * like Google SGE, Bing AI, ChatGPT, and other AI-powered search experiences
 */
export function AISearchOptimization({
  question,
  answer,
  additionalContext,
  relatedQuestions,
  category = "Travel & Tourism"
}: AISearchOptimizationProps) {
  return (
    <>
      {/* Semantic HTML5 structure for AI understanding */}
      <section 
        className="ai-optimized-content"
        itemScope 
        itemType="https://schema.org/Question"
        data-ai-content="true"
        data-ai-category={category}
      >
        {/* Question with proper semantic markup */}
        <h3 
          itemProp="name" 
          className="text-xl font-bold mb-3"
          data-ai-question="true"
        >
          {question}
        </h3>
        
        {/* Answer with rich semantic structure */}
        <div 
          itemScope 
          itemType="https://schema.org/Answer"
          itemProp="acceptedAnswer"
          className="prose prose-lg"
          data-ai-answer="true"
        >
          <div itemProp="text">
            {typeof answer === 'string' ? <p>{answer}</p> : answer}
          </div>
          
          {/* Additional context for AI to understand */}
          {additionalContext && (
            <div 
              className="mt-4 text-sm text-gray-600"
              data-ai-context="true"
            >
              <p>{additionalContext}</p>
            </div>
          )}
        </div>
        
        {/* Related questions for comprehensive coverage */}
        {relatedQuestions && relatedQuestions.length > 0 && (
          <aside 
            className="mt-6 border-t pt-4"
            data-ai-related="true"
          >
            <h4 className="font-semibold mb-2">Related Questions:</h4>
            <ul className="space-y-2">
              {relatedQuestions.map((relatedQ, index) => (
                <li 
                  key={index}
                  className="text-blue-600 hover:underline cursor-pointer"
                  data-ai-related-question={index}
                >
                  {relatedQ}
                </li>
              ))}
            </ul>
          </aside>
        )}
        
        {/* Hidden metadata for AI crawlers */}
        <meta itemProp="upvoteCount" content="100" />
        <meta itemProp="dateCreated" content={new Date().toISOString()} />
        <meta itemProp="author" content="Triple X Adventures Expert Team" />
      </section>
      
      {/* Structured data specifically for AI search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "QAPage",
            "mainEntity": {
              "@type": "Question",
              "name": question,
              "text": question,
              "answerCount": 1,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": typeof answer === 'string' ? answer : '',
                "author": {
                  "@type": "Organization",
                  "name": "Triple X Adventures"
                },
                "dateCreated": new Date().toISOString(),
                "upvoteCount": 100
              }
            }
          })
        }}
      />
    </>
  );
}

/**
 * AIOptimizedSection wraps content sections with AI-friendly markup
 */
interface AIOptimizedSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  sectionType?: 'service' | 'location' | 'activity' | 'information';
}

export function AIOptimizedSection({
  title,
  description,
  children,
  sectionType = 'information'
}: AIOptimizedSectionProps) {
  const schemaType = {
    service: 'Service',
    location: 'Place',
    activity: 'TouristAttraction',
    information: 'WebPageElement'
  }[sectionType];

  return (
    <section
      className="ai-section"
      itemScope
      itemType={`https://schema.org/${schemaType}`}
      data-ai-section={sectionType}
    >
      <header>
        <h2 
          itemProp="name"
          className="text-3xl font-bold mb-2"
          data-ai-title="true"
        >
          {title}
        </h2>
        <p 
          itemProp="description"
          className="text-lg text-gray-600 mb-6"
          data-ai-description="true"
        >
          {description}
        </p>
      </header>
      
      <div itemProp="text" data-ai-content="true">
        {children}
      </div>
    </section>
  );
}

/**
 * AIFeatureList creates feature lists optimized for AI extraction
 */
interface AIFeatureListProps {
  features: Array<{
    title: string;
    description: string;
    icon?: ReactNode;
  }>;
  category?: string;
}

export function AIFeatureList({ features, category = "Features" }: AIFeatureListProps) {
  return (
    <div 
      className="ai-features"
      itemScope 
      itemType="https://schema.org/ItemList"
      data-ai-features="true"
      data-ai-category={category}
    >
      <meta itemProp="numberOfItems" content={features.length.toString()} />
      <meta itemProp="itemListOrder" content="Unordered" />
      
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <li
            key={index}
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
            className="flex items-start space-x-3"
            data-ai-feature={index}
          >
            {feature.icon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {feature.icon}
              </span>
            )}
            <div>
              <h4 
                itemProp="name"
                className="font-semibold"
                data-ai-feature-title="true"
              >
                {feature.title}
              </h4>
              <p 
                itemProp="description"
                className="text-gray-600"
                data-ai-feature-description="true"
              >
                {feature.description}
              </p>
            </div>
            <meta itemProp="position" content={(index + 1).toString()} />
          </li>
        ))}
      </ul>
    </div>
  );
}