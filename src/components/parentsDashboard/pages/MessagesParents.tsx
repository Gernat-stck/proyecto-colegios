import React from 'react';
import { SocketProvider } from '@/context/SocketContext';
import ChatPage from '@/components/common/chat/page/ChatPage';
import { toast } from 'sonner';
import useGenerateToken from '@/hooks/useGenerateToken';
import PacmanLoader from 'react-spinners/PacmanLoader';

const MessagesParents: React.FC = () => {
  const { token, loading, error } = useGenerateToken();

  if (loading) {
    return (<div className="flex justify-center items-center min-h-[90vh] p-7">
      <PacmanLoader color="#0f172a" loading={loading} size={30} />
    </div>);
  }

  if (error) {
    toast.error(error);
    return <div>Error al cargar el chat</div>;
  }

  if (!token) {
    toast.error("Necesitas iniciar sesión para acceder al chat");
    return <div>Necesitas iniciar sesión</div>;
  }

  return (
    <SocketProvider token={token}>
      <main className='overflow-hidden mt-10'>
        <ChatPage />
      </main>
    </SocketProvider>
  );
};

export default MessagesParents;
