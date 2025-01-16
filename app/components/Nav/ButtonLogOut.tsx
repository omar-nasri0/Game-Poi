import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function ButtonLogOut() {
    const [loading, setLoading] = useState(false); 
    const route = useRouter()
    async function deleteToken () {
        setLoading(true); 
        try {
            const res = await axios.post("/api/LogOut");
            if (res.status === 201) { 
                toast.success("Logged out successfully!");
                setTimeout(() => {
                    route.push('/Login') 
                }, 1500);
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            toast.error("Failed to log out. Please try again.");
            console.error("Error logging out:", error);
        } finally {
            setLoading(false); // إعادة تعيين حالة التحميل إلى false
        }
    }

    return (
        <div>
            <Button
                className='w-full'
                onClick={deleteToken}
                disabled={loading}  // تعطيل الزر أثناء التحميل
            >
                {loading ? 'Logging out...' : 'Log out'}
            </Button>
        </div>
    )
}

export default ButtonLogOut
