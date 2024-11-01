import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/_options';
import { getServerSession, type AuthOptions } from 'next-auth';

import { useSession } from 'next-auth/react';

export async function protect(pathname: string, url = "/login") {
  const session = await getServerSession(authOptions as unknown as AuthOptions)
  if (!session?.user && url && pathname) { 
    redirect(url + "?callbackUrl=" + encodeURIComponent(pathname))
  }
}

// export function protectClient(url = "/login") {
//   const session = useSession()
//   const pathname = usePathname()
//   if (!session?.data?.user && url && pathname) { 
//     redirect(url + "?callbackUrl=" + encodeURIComponent(pathname))
//   }
// }