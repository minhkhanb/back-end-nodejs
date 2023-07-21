import React from 'react';
import useSiteMetadata from '@src/hooks/useSiteMetadata';

interface Props extends React.PropsWithChildren {
  title?: string;
  description?: string;
  pathname?: string;
}

const Seo = ({ title, description, pathname, children }: Props) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ''}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      {children}
    </>
  );
};

export default Seo;
