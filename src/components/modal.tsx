import { Component, JSX, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { Close } from ".";

type Props = {
  open: boolean;
  children: JSX.Element;
  onClose?: () => void;
}
export const Modal: Component<Props> = (props) => {
  
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClose?.();
    }
  }

  onMount(() => window.addEventListener('keydown', handleKeydown))
  onCleanup(() => window.removeEventListener('keydown', handleKeydown))
    
  return (
    <>
      {props.open && (
        <Portal>
          <div class="absolute top-0 w-screen h-screen bg-black bg-opacity-50 select-none text-primary">
            <div>
              <div>
                {/* TODO layout */}
                <Close onClick={props.onClose}/>
                <span>ESC</span>
              </div>
              {props.children}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
};