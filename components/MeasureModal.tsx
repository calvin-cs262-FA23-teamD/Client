import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import RNModal from "react-native-modal";
type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};
export const Modal = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f2e2e",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  header: {
    flux:1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  body: {
    flux:4,
    justifyContent: "center",
    paddingHorizontal: 15,
  },

});

Modal.Container = ModalContainer;
Modal.Body = ModalBody;