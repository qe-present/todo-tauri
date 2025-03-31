import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, TrayIconEvent } from "@tauri-apps/api/tray";
import {
  LogicalPosition,
  LogicalSize,
  getCurrentWindow,
} from "@tauri-apps/api/window";

export const setupTray = async ({ tooltip }: { tooltip?: string }) => {
  const action = async (event: TrayIconEvent) => {
    const type= event.type;
    console.log(type)
    const window = getCurrentWindow();

    // The mini-pop-up window should automatically
    //  hide once you stop giving it focus
    // await getCurrentWindow().onFocusChanged(({ payload: focused }) => {
    //   if (!focused) window.hide();
    // });

    if (type === "Leave") {
      await window.hide();
    } else {
      await window.show();
      const size = new LogicalSize(300, 400);
      await window.setSize(size);
      const iconOffset = 30;
      const position = new LogicalPosition(
        event.position.x - size.width,
        event.position.y - size.height - iconOffset
      );
      await window.setPosition(position);
      await window.setFocus();
    }
  };
  const tray = await TrayIcon.new({ id: "js_tray_icon", action });
  if (tooltip) await tray.setTooltip(tooltip);
  await tray.setIcon("icons/icon.png");
  const menu = await Menu.new();
  await tray.setMenu(menu);
  return menu;
};
