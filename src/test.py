import rospy
from sensor_msgs.msg import PointCloud2
from sensor_msgs import point_cloud2
import numpy as np
import open3d as o3d

def callback(data):
    # Convert ROS point cloud to numpy array, ignoring additional fields
    pc = np.array([[x, y, z] for x, y, z, _ in point_cloud2.read_points(data)])

    # Create an Open3D point cloud
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(pc)

    # Visualize the point cloud
    o3d.visualization.draw_geometries([pcd])

def listener():
    rospy.init_node('point_cloud_listener', anonymous=True)
    rospy.Subscriber('/cloud_all_fields_fullframe', PointCloud2, callback)
    rospy.spin()

if __name__ == '__main__':
    listener()