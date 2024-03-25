import { logout } from '@/libs/session';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

const LogoutBtn = async () => {
  return (
    <div className="absolute top-14 right-4 z-10">
      <form action={logout}>
        <button>
          <ArrowRightStartOnRectangleIcon className="size-6 hover:text-orange-600" />
        </button>
      </form>
    </div>
  );
};

export default LogoutBtn;
