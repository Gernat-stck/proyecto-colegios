import { useState, useEffect } from "react";
import { makeRequest } from "@/hooks/api";
import ChatApp from "@/components/common/chat/ChatApp";

export default function MessagesParents() {
  const userId = localStorage.getItem("userId") || "";
  const [groups, setGroups] = useState<string[]>([]);
//TODO: REVISAR POR QUE PUTAS NO FUNCIONA EL CHAT Y POR QUE SE DEFORMA EL DISEÑO DE LA PAGINA
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await makeRequest({
          url: `user/${userId}/courses`,
          method: "GET",
        });
        const courseNames = data.map((course: { course_name: string }) => course.course_name);
        setGroups(courseNames);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [userId]);

  return <ChatApp userId={userId} groups={groups} />;
}
