// app/store/[subdomain]/page.tsx
interface PageProps {
    params: { subdomain: string };
  }
  
  export default function StorePage({ params }: PageProps) {
    const { subdomain } = params;
  
    return (
      <div>
        <h1>Store for: {subdomain}</h1>
        <p>This is the store page for the "{subdomain}" subdomain.</p>
      </div>
    );
  }
  