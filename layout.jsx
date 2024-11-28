import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./src/components/ui/app-sidebar"
 
export default function Layout({  children, 
    user, 
    userId, 
    onOpen, 
    onClose, 
    userChats, 
    refreshUserChats, 
    handleIsInChat  }) {
  return (
    <SidebarProvider  className="pointer-events-none">
      <AppSidebar 
      user={user}
                  userId={userId}
                  onOpen={onOpen}
                  onClose ={onClose}
                  userChats={userChats}
                  refreshUserChats={refreshUserChats}
                  handleIsInChat ={handleIsInChat}  />
      
      <main className="h-full flex flex-col justify-end   ">
        
        {children}
      </main>
    </SidebarProvider>
  )
}