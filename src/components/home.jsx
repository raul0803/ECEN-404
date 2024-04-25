import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { firebase_auth } from './firebase.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Example() {
  let subtitle;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
    setSignInError(null);
  };

  useEffect(() => {
    openModal(); // Open the modal every time the component mounts
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(firebase_auth, email, password);
      console.log('User signed in successfully!');
      closeModal();
    } catch (error) {
      console.error('Error signing in:', error.message);
      setSignInError(error.message);
    }
  };

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white ">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex ">
            <div
              style={{
                position: 'relative',
                top: '150px',
              }}
            >
              <h1 className='text-3xl tracking-tight text-gray-900'>
                Search & Rescue
              </h1>
              <h1 className='text-7xl font-bold tracking-tight text-gray-900'>
                Drone
              </h1>
              <button
                type="button"
                onClick={openModal}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600dark:hover:bg-gray-700"
                style={{
                  position: 'relative',
                  top: '100px',
                  left: '-0px',
                }}
              >
                FAA Guidelines
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
              >
                <h2
                  ref={(_subtitle) => (subtitle = _subtitle)}
                >
                  These terms state that this drone can't be flown by a person without appropriate certification. Abide by all regulations and rules set by the FAA. To find a list of all regulations, go to{' '}
                  <a href="https://www.faa.gov/uas/getting_started" target="_blank" rel="noopener noreferrer">
                    https://www.faa.gov/uas/getting_started
                  </a>
                  .
                </h2>
                <button onClick={closeModal}>close</button>
                <div></div>
                <form onSubmit={handleSignIn}>
                  <input
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600dark:hover:bg-gray-700"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="text-black" />
                  <button
                    type="submit"
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600dark:hover:bg-gray-700"
                    style={{ marginTop: '10px', backgroundColor: 'black', color: 'white' }}
                  >
                    Sign In
                  </button>
                </form>
                {signInError && <p style={{ color: 'red' }}>{signInError}</p>}
              </Modal>
            </div>
            <img src="/drone.jpeg" alt="Search & Rescue Drone" width="700" height="500" />.
            <div class="bg-white overflow-hidden rounded-lg" style={{
              position: 'relative',
              top: '100px',
              left: '-0px',
            }}>
              <div class="px-4 py-5 sm:px-6">
                <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
                  Drone Information
                </h1>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the drone.
                </p>
              </div>
              <div class="px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                      Drone Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Holybro x500-V2
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                      Lidar Model
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      LiDAR multiScan 100
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                      Battery
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      400 mA LiPO Battery
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                      Authorized User
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Michael Xu
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
    </>
  );
}