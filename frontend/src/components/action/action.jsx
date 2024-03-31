import { useState } from "react";
import { motion } from "framer-motion";
import ChatLayout from "../ui/chatLayout";

function ActionButton() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="2xl ml-2 flex justify-between rounded-md w-[95%] h-[4rem] items-center p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
      <motion.button
        onClick={() => setShowChat(!showChat)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn"
      >
        start Chat
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn"
      >
        Show Relevant Questions
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn"
      >
        Scroll to Study Materials
      </motion.button>

      {/* Chat component */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-10 bg-transparent bg-opacity-50 flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-transparent p-4 rounded-md"
          >
            <ChatLayout />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ActionButton;
