import { useRouter } from 'next/navigation';

export default async function verifyUser() {
  const router = useRouter();
  const res = await fetch("/api/verify", {
    method: 'GET',
  });
  if (!res.ok) {
    router.push('/login');
    return false;
  }
  return true;
}

export async function verify() {
  // sends a request to ensure cookie login
  const res = await fetch('/api/verify', {
    method: 'GET',
  });
  if (!res.ok) {
    return false;
  }
  return true;
}
