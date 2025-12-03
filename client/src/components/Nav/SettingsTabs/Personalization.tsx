import MemoryViewer from '~/components/SidePanel/Memories/MemoryViewer';
import { useLocalize } from '~/hooks';

interface PersonalizationProps {
  hasAnyPersonalizationFeature: boolean;
  hasMemoryOptOut: boolean;
}

export default function Personalization({
  hasAnyPersonalizationFeature,
  hasMemoryOptOut, // 保留以兼容调用方，未来可用于扩展显示控制
}: PersonalizationProps) {
  const localize = useLocalize();

  if (!hasAnyPersonalizationFeature) {
    return (
      <div className="flex flex-col gap-3 text-sm text-text-primary">
        <div className="text-text-secondary">{localize('com_ui_no_personalization_available')}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-sm text-text-primary">
      {/* Memory Settings Section - 将完整记忆模块搬入个人中心设置 */}
          <div className="border-b border-border-medium pb-3">
        <div className="text-base font-semibold">
          {localize('com_ui_memory')}
              </div>
            </div>
      <div className="mt-2">
        <MemoryViewer />
          </div>
    </div>
  );
}
