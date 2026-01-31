import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import type { FeedbackMessage } from '../../lib/feedback/feedback-messages';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  message: FeedbackMessage;
  correctActionLabel: string;
}

export function FeedbackModal({ visible, onClose, message, correctActionLabel }: FeedbackModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.headerText}>正解は「{correctActionLabel}」</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.explanation}>{message.explanation}</Text>
            {message.tip && <Text style={styles.tip}>{message.tip}</Text>}
          </View>

          <Pressable style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]} onPress={onClose}>
            <Text style={styles.closeButtonText}>閉じる</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ff00ff',
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 0, 255, 0.3)',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ff00ff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  content: {
    marginBottom: 16,
  },
  explanation: {
    fontSize: 16,
    lineHeight: 26,
    color: '#ffffff',
    textAlign: 'left',
  },
  tip: {
    fontSize: 14,
    lineHeight: 22,
    color: '#00f5ff',
    marginTop: 16,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00f5ff',
  },
  closeButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  closeButtonPressed: {
    opacity: 0.6,
  },
  closeButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
});
