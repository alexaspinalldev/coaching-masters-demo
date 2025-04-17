export default function Footer() {
    return (
        <footer className="mt-auto flex items-center justify-between w-full px-4 py-2 bg-background">
            <div className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} The Coaching Masters. All rights reserved.
            </div>
        </footer>
    );
}
