import { formatDistanceToNow, format } from 'date-fns';
export const imageToBase64 = async (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    const result = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
    })

    return result
}



export const formatFacebookTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return `Yesterday at ${format(date, 'h:mm a')}`;
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return format(date, 'MMMM d, yyyy h:mm a'); // e.g., April 27, 2025 3:45 PM
};
