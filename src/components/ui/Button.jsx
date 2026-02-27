const Button = ({ children, variant = 'primary', ...props }) => {
      const base = 'px-4 py-2 rounded font-medium transition'
      const variants = {
        primary: 'bg-primary text-white hover:bg-emerald-700',
        secondary: 'bg-amber-500 text-white hover:bg-amber-600',
        outline: 'border border-primary text-primary hover:bg-primary/10',
      }
      return (
        <button className={`${base} ${variants[variant]}`} {...props}>
          {children}
        </button>
      )
    }
    
    export default Button