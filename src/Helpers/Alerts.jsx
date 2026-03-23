// hooks/useAlert.js
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const useAlert = () => {
  const theme = useSelector((state) => state.theme);
  const themeState = theme?.state || 'light'; // Add fallback
  const isDark = themeState === 'dark';

  // Base alert configuration
  const getBaseConfig = () => ({
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#f1f5f9' : '#1e293b',
    confirmButtonColor: '#3b82f6',
    customClass: {
      popup: 'rounded-xl shadow-2xl',
      confirmButton: 'px-5 py-2 rounded-lg font-medium transition-all hover:scale-105',
      timerProgressBar: 'bg-gradient-to-r from-blue-500 to-purple-500',
    }
  });

  // Success Alert
  const showSuccess = (message, title = 'Success!', options = {}) => {
    Swal.fire({
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'success',
      iconColor: '#10b981',
      confirmButtonText: options.confirmText || 'OK',
      timer: options.timer || 3000,
      timerProgressBar: true,
      ...options
    });
  };

  // Error Alert
  const showError = (message, title = 'Oops!', options = {}) => {
    Swal.fire({
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'error',
      iconColor: '#ef4444',
      confirmButtonColor: '#ef4444',
      confirmButtonText: options.confirmText || 'Try Again',
      ...options
    });
  };

  // Warning Alert
  const showWarning = (message, title = 'Warning!', options = {}) => {
    Swal.fire({
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'warning',
      iconColor: '#f59e0b',
      confirmButtonColor: '#f59e0b',
      confirmButtonText: options.confirmText || 'OK',
      ...options
    });
  };

  // Info Alert
  const showInfo = (message, title = 'Did you know?', options = {}) => {
    Swal.fire({
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'info',
      iconColor: '#3b82f6',
      confirmButtonText: options.confirmText || 'Got it',
      ...options
    });
  };

  // Confirmation Dialog
  const showConfirm = async (message, title = 'Are you sure?', options = {}) => {
    const result = await Swal.fire({
      ...getBaseConfig(),
      title,
      text: message,
      icon: 'question',
      iconColor: '#f59e0b',
      showCancelButton: true,
      confirmButtonText: options.confirmText || 'Yes, proceed',
      cancelButtonText: options.cancelText || 'Cancel',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      ...options
    });
    return result.isConfirmed;
  };

  // Custom HTML Alert
  const showCustom = (html, title = '', options = {}) => {
    Swal.fire({
      ...getBaseConfig(),
      title,
      html,
      icon: options.icon || undefined,
      confirmButtonText: options.confirmText || 'OK',
      showConfirmButton: options.showConfirmButton !== false,
      showCancelButton: options.showCancelButton || false,
      ...options
    });
  };

  // Cart Alert (specialized)
  const showAddedToCart = (productName) => {
    Swal.fire({
      ...getBaseConfig(),
      title: 'Added to Cart!',
      html: `
        <div class="text-center">
          <div class="flex items-center justify-center gap-2 mb-3">
            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <span class="text-lg font-semibold">${productName}</span>
          </div>
          <p class="text-sm">has been added to your cart</p>
        </div>
      `,
      icon: 'success',
      iconColor: '#3b82f6',
      confirmButtonText: 'Continue Shopping',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-5 py-2 rounded-lg font-medium',
      }
    });
  };

  // Welcome Alert (specialized)
  const showWelcome = (userName) => {
    Swal.fire({
      title: '',
      html: `
        <div class="text-center">
          <div class="mb-4">
            <div class="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h2 class="text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2">
            Welcome ${userName}!
          </h2>
          <p class="${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1">
            Logged in successfully
          </p>
          <p class="${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm">
            Enjoy shopping and have a great day! ✨
          </p>
        </div>
      `,
      background: isDark ? '#0f172a' : '#ffffff',
      showConfirmButton: true,
      confirmButtonText: 'Start Shopping',
      confirmButtonColor: '#3b82f6',
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
      timer: 4000,
      timerProgressBar: true,
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105',
        timerProgressBar: 'bg-gradient-to-r from-blue-500 to-purple-500',
      },
      didOpen: (popup) => {
        popup.style.animation = 'slideIn 0.3s ease-out';
      }
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showCustom,
    showAddedToCart,
    showWelcome
  };
};